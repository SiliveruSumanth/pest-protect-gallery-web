
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, LogOut, User } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { sanitizeFormData, isValidPhone, RateLimiter } from "@/lib/security";
import { useAuth } from "@/hooks/useAuth";

export const AppointmentPage: React.FC = () => {
  const { user, signOut } = useAuth();
  const [appointmentForm, setAppointmentForm] = useState({
    name: '',
    phone: '',
    email: user?.email || '',
    address: '',
    pestType: '',
    preferredDate: '',
    preferredTime: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const rateLimiter = new RateLimiter(2, 600000); // 2 requests per 10 minutes

  // Update email field when user changes
  useEffect(() => {
    if (user?.email) {
      setAppointmentForm(prev => ({
        ...prev,
        email: user.email
      }));
    }
  }, [user]);

  const handleSignOut = async () => {
    await signOut();
  };

  const handleAppointmentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Rate limiting check
    const userIdentifier = `appointment_${appointmentForm.phone || 'anonymous'}`;
    if (!rateLimiter.isAllowed(userIdentifier)) {
      const remainingTime = Math.ceil(rateLimiter.getRemainingTime(userIdentifier) / 1000 / 60);
      toast({
        title: "Too Many Requests",
        description: `Please wait ${remainingTime} minutes before booking another appointment.`,
        variant: "destructive",
      });
      return;
    }

    // Input validation and sanitization
    const sanitizedData = sanitizeFormData(appointmentForm);
    
    if (!sanitizedData.name || !sanitizedData.phone || !sanitizedData.address || !sanitizedData.pestType) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    if (!isValidPhone(sanitizedData.phone)) {
      toast({
        title: "Invalid Phone",
        description: "Please enter a valid phone number.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      console.log('Submitting appointment (sanitized):', sanitizedData);

      const { data, error } = await supabase.functions.invoke('send-appointment-email', {
        body: {
          name: sanitizedData.name,
          phone: sanitizedData.phone,
          email: sanitizedData.email,
          address: sanitizedData.address,
          pestType: sanitizedData.pestType,
          preferredDate: sanitizedData.preferredDate || undefined,
          preferredTime: sanitizedData.preferredTime || undefined,
        }
      });

      if (error) {
        console.error('Edge function error:', error);
        throw new Error('Booking failed');
      }

      console.log('Appointment booked successfully:', data);

      toast({
        title: "Appointment Booked Successfully!",
        description: "We've received your appointment request and will contact you soon to confirm.",
      });

      // Reset form but keep email
      setAppointmentForm({
        name: '',
        phone: '',
        email: user?.email || '',
        address: '',
        pestType: '',
        preferredDate: '',
        preferredTime: ''
      });

    } catch (error: any) {
      console.error('Error booking appointment:', error);
      toast({
        title: "Booking Failed",
        description: "An error occurred while booking. Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 bg-background">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* User Header */}
        <div className="mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <User className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="text-sm font-medium">Logged in as</p>
                    <p className="text-sm text-muted-foreground">{user?.email}</p>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleSignOut}
                  className="flex items-center space-x-2"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Sign Out</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Book an Appointment</h2>
          <p className="text-lg text-muted-foreground">Schedule your pest control service today</p>
        </div>
        <Card>
          <CardContent className="p-8">
            <form onSubmit={handleAppointmentSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    placeholder="Your Name"
                    value={appointmentForm.name}
                    onChange={(e) => setAppointmentForm({...appointmentForm, name: e.target.value})}
                    required
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    placeholder="+91 9492309305"
                    value={appointmentForm.phone}
                    onChange={(e) => setAppointmentForm({...appointmentForm, phone: e.target.value})}
                    required
                    disabled={isSubmitting}
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="email">Email Address (Optional)</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={appointmentForm.email}
                  onChange={(e) => setAppointmentForm({...appointmentForm, email: e.target.value})}
                  disabled={isSubmitting}
                />
                <p className="text-sm text-muted-foreground mt-1">
                  Provide your email to receive booking confirmation
                </p>
              </div>
              
              <div>
                <Label htmlFor="address">Address *</Label>
                <Textarea
                  id="address"
                  placeholder="Your complete address"
                  value={appointmentForm.address}
                  onChange={(e) => setAppointmentForm({...appointmentForm, address: e.target.value})}
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <Label htmlFor="pestType">Type of Pest Problem *</Label>
                <Select 
                  onValueChange={(value) => setAppointmentForm({...appointmentForm, pestType: value})}
                  disabled={isSubmitting}
                  value={appointmentForm.pestType}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select pest type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cockroach">Cockroach Control</SelectItem>
                    <SelectItem value="termite">Termite Control</SelectItem>
                    <SelectItem value="lizard">Lizard Removal</SelectItem>
                    <SelectItem value="rodent">Rat or Mice Control</SelectItem>
                    <SelectItem value="flies">Flies Control</SelectItem>
                    <SelectItem value="ants">Red & Black Ants Control</SelectItem>
                    <SelectItem value="bedbugs">Bed Bugs Removal</SelectItem>
                    <SelectItem value="general">General Pest Control</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="date">Preferred Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={appointmentForm.preferredDate}
                    onChange={(e) => setAppointmentForm({...appointmentForm, preferredDate: e.target.value})}
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <Label htmlFor="time">Preferred Time</Label>
                  <Select 
                    onValueChange={(value) => setAppointmentForm({...appointmentForm, preferredTime: value})}
                    disabled={isSubmitting}
                    value={appointmentForm.preferredTime}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="morning">Morning (9 AM - 12 PM)</SelectItem>
                      <SelectItem value="afternoon">Afternoon (12 PM - 4 PM)</SelectItem>
                      <SelectItem value="evening">Evening (4 PM - 7 PM)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-green-600 hover:bg-green-700 text-lg py-3"
                disabled={isSubmitting}
              >
                <Calendar className="mr-2 h-5 w-5" />
                {isSubmitting ? 'Booking Appointment...' : 'Book Appointment'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
