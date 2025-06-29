
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.2';

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface AppointmentEmailRequest {
  name: string;
  phone: string;
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
    const { name, phone, address, pestType, preferredDate, preferredTime }: AppointmentEmailRequest = await req.json();

    console.log('Received appointment booking:', { name, phone, address, pestType, preferredDate, preferredTime });

    // Create Supabase client
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Save appointment to database
    const { data: appointment, error: dbError } = await supabase
      .from('appointments')
      .insert({
        name,
        phone,
        address,
        pest_type: pestType,
        preferred_date: preferredDate || null,
        preferred_time: preferredTime || null,
        status: 'pending'
      })
      .select()
      .single();

    if (dbError) {
      console.error('Database error:', dbError);
      throw new Error(`Failed to save appointment: ${dbError.message}`);
    }

    console.log('Appointment saved to database:', appointment);

    // Send email notification to owner
    const emailResponse = await resend.emails.send({
      from: "Pest Control <onboarding@resend.dev>",
      to: ["owner@pestcontrol.com"], // Replace with actual owner email
      subject: "New Appointment Booking",
      html: `
        <h1>New Appointment Booking</h1>
        <p><strong>Customer Details:</strong></p>
        <ul>
          <li><strong>Name:</strong> ${name}</li>
          <li><strong>Phone:</strong> ${phone}</li>
          <li><strong>Address:</strong> ${address}</li>
          <li><strong>Pest Type:</strong> ${pestType}</li>
          ${preferredDate ? `<li><strong>Preferred Date:</strong> ${preferredDate}</li>` : ''}
          ${preferredTime ? `<li><strong>Preferred Time:</strong> ${preferredTime}</li>` : ''}
        </ul>
        <p><strong>Booking Time:</strong> ${new Date().toLocaleString()}</p>
        <p>Please contact the customer to confirm the appointment.</p>
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ 
      success: true, 
      appointmentId: appointment.id,
      emailId: emailResponse.id 
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-appointment-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
