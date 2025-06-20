
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export const AppointmentPage: React.FC = () => {
  const [appointmentForm, setAppointmentForm] = useState({
    name: '',
    phone: '',
    address: '',
    pestType: '',
    preferredDate: '',
    preferredTime: ''
  });

  const handleAppointmentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (appointmentForm.name && appointmentForm.phone && appointmentForm.address && appointmentForm.pestType) {
      toast({
        title: "Appointment Booked",
        description: "We'll contact you soon to confirm your appointment!",
      });
      setAppointmentForm({
        name: '',
        phone: '',
        address: '',
        pestType: '',
        preferredDate: '',
        preferredTime: ''
      });
    } else {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
    }
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Book an Appointment</h2>
          <p className="text-lg text-gray-600">Schedule your pest control service today</p>
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
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="address">Address *</Label>
                <Textarea
                  id="address"
                  placeholder="Your complete address"
                  value={appointmentForm.address}
                  onChange={(e) => setAppointmentForm({...appointmentForm, address: e.target.value})}
                  required
                />
              </div>

              <div>
                <Label htmlFor="pestType">Type of Pest Problem *</Label>
                <Select onValueChange={(value) => setAppointmentForm({...appointmentForm, pestType: value})}>
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
                  />
                </div>
                <div>
                  <Label htmlFor="time">Preferred Time</Label>
                  <Select onValueChange={(value) => setAppointmentForm({...appointmentForm, preferredTime: value})}>
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

              <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-lg py-3">
                <Calendar className="mr-2 h-5 w-5" />
                Book Appointment
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
