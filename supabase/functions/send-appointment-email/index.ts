
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.2';

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Simple rate limiting store
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

// Rate limiting configuration
const RATE_LIMIT_WINDOW = 10 * 60 * 1000; // 10 minutes
const RATE_LIMIT_MAX_REQUESTS = 3;

// Input sanitization
const sanitizeInput = (input: string): string => {
  if (typeof input !== 'string') return '';
  return input
    .replace(/[<>]/g, '') // Remove angle brackets
    .replace(/javascript:/gi, '') // Remove javascript protocol
    .replace(/on\w+=/gi, '') // Remove event handlers
    .trim()
    .substring(0, 1000); // Limit length
};

const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^[\+]?[\d\s\-\(\)]{10,}$/;
  return phoneRegex.test(phone);
};

const checkRateLimit = (identifier: string): boolean => {
  const now = Date.now();
  const record = rateLimitStore.get(identifier);
  
  if (!record || now > record.resetTime) {
    // Reset or create new record
    rateLimitStore.set(identifier, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }
  
  if (record.count >= RATE_LIMIT_MAX_REQUESTS) {
    return false;
  }
  
  record.count++;
  return true;
};

interface AppointmentEmailRequest {
  name: string;
  phone: string;
  email?: string;
  address: string;
  pestType: string;
  preferredDate?: string;
  preferredTime?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const { name, phone, email, address, pestType, preferredDate, preferredTime }: AppointmentEmailRequest = body;

    // Rate limiting
    const clientIP = req.headers.get('cf-connecting-ip') || req.headers.get('x-forwarded-for') || 'unknown';
    const rateLimitKey = `appointment_${clientIP}_${phone}`;
    
    if (!checkRateLimit(rateLimitKey)) {
      console.log('Rate limit exceeded for:', rateLimitKey);
      return new Response(
        JSON.stringify({ error: 'Too many requests. Please try again later.' }),
        {
          status: 429,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Input validation and sanitization
    if (!name || !phone || !address || !pestType) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    if (!isValidPhone(phone)) {
      return new Response(
        JSON.stringify({ error: 'Invalid phone number format' }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Sanitize inputs
    const sanitizedData = {
      name: sanitizeInput(name),
      phone: sanitizeInput(phone),
      email: email ? sanitizeInput(email) : undefined,
      address: sanitizeInput(address),
      pestType: sanitizeInput(pestType),
      preferredDate: preferredDate ? sanitizeInput(preferredDate) : undefined,
      preferredTime: preferredTime ? sanitizeInput(preferredTime) : undefined,
    };

    console.log('Received appointment booking (sanitized):', sanitizedData);

    // Create Supabase client
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Save appointment to database
    const { data: appointment, error: dbError } = await supabase
      .from('appointments')
      .insert({
        name: sanitizedData.name,
        phone: sanitizedData.phone,
        address: sanitizedData.address,
        pest_type: sanitizedData.pestType,
        preferred_date: sanitizedData.preferredDate || null,
        preferred_time: sanitizedData.preferredTime || null,
        status: 'pending'
      })
      .select()
      .single();

    if (dbError) {
      console.error('Database error:', dbError);
      return new Response(
        JSON.stringify({ error: 'Failed to save appointment' }),
        {
          status: 500,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    console.log('Appointment saved to database:', appointment);

    // Send email notification to owner
    const ownerEmailResponse = await resend.emails.send({
      from: "Quality Pest Control <onboarding@resend.dev>",
      to: ["qualitypestcontrolservices1@gmail.com"],
      subject: "New Appointment Booking",
      html: `
        <h1>New Appointment Booking</h1>
        <p><strong>Customer Details:</strong></p>
        <ul>
          <li><strong>Name:</strong> ${sanitizedData.name}</li>
          <li><strong>Phone:</strong> ${sanitizedData.phone}</li>
          <li><strong>Address:</strong> ${sanitizedData.address}</li>
          <li><strong>Pest Type:</strong> ${sanitizedData.pestType}</li>
          ${sanitizedData.preferredDate ? `<li><strong>Preferred Date:</strong> ${sanitizedData.preferredDate}</li>` : ''}
          ${sanitizedData.preferredTime ? `<li><strong>Preferred Time:</strong> ${sanitizedData.preferredTime}</li>` : ''}
        </ul>
        <p><strong>Booking Time:</strong> ${new Date().toLocaleString()}</p>
        <p>Please contact the customer to confirm the appointment.</p>
      `,
    });

    console.log("Owner email sent successfully:", ownerEmailResponse);

    // Send confirmation email to customer (if valid email is provided)
    let customerEmailResponse = null;
    if (sanitizedData.email && isValidEmail(sanitizedData.email)) {
      try {
        customerEmailResponse = await resend.emails.send({
          from: "Quality Pest Control <onboarding@resend.dev>",
          to: [sanitizedData.email],
          subject: "Appointment Booking Confirmation - Quality Pest Control",
          html: `
            <h1>Thank you for booking with Quality Pest Control!</h1>
            <p>Dear ${sanitizedData.name},</p>
            <p>We have received your appointment request with the following details:</p>
            <ul>
              <li><strong>Pest Type:</strong> ${sanitizedData.pestType}</li>
              <li><strong>Address:</strong> ${sanitizedData.address}</li>
              ${sanitizedData.preferredDate ? `<li><strong>Preferred Date:</strong> ${sanitizedData.preferredDate}</li>` : ''}
              ${sanitizedData.preferredTime ? `<li><strong>Preferred Time:</strong> ${sanitizedData.preferredTime}</li>` : ''}
            </ul>
            <p><strong>What's Next?</strong></p>
            <p>Our team will contact you within 24 hours at <strong>${sanitizedData.phone}</strong> to confirm your appointment details and schedule the service.</p>
            <p>For immediate assistance, please call us at +91 9492309305</p>
            <p>Thank you for choosing Quality Pest Control!</p>
            <p>Best regards,<br>Quality Pest Control Team</p>
          `,
        });
        console.log("Customer confirmation email sent:", customerEmailResponse);
      } catch (emailError) {
        console.log("Customer email failed:", emailError);
      }
    }

    return new Response(JSON.stringify({ 
      success: true, 
      appointmentId: appointment.id,
      ownerEmailId: ownerEmailResponse.id,
      customerEmailId: customerEmailResponse?.id || null
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-appointment-email function:", error);
    
    // Don't expose internal error details
    return new Response(
      JSON.stringify({ error: 'An error occurred while processing your request' }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
