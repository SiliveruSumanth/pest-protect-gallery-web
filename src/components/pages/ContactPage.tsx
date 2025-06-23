
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, Lock } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface ContactPageProps {
  isAuthenticated?: boolean;
}

export const ContactPage: React.FC<ContactPageProps> = ({ isAuthenticated = false }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Please log in to submit the contact form.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // For now, we'll simulate the form submission
      // In a real app, you would send this to your backend or Google Apps Script
      console.log('Form submission:', formData);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Success!",
        description: "Thank you for contacting Quality Pest Control. We will reach out to you soon!",
      });
      
      // Reset form
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Error",
        description: "Failed to submit the form. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold mb-6">Get In Touch</h2>
            <p className="text-lg text-gray-300 mb-8">
              Ready to protect your home? Contact Quality Pest Control Services today for a free inspection and quote.
            </p>
            <div className="space-y-4">
              <div className="flex items-center">
                <Phone className="h-6 w-6 text-green-400 mr-4" />
                <div className="space-y-1">
                  <div>
                    <a href="tel:+919492309305" className="text-green-400 hover:text-green-300 transition-colors">
                      +91 9492309305
                    </a>
                  </div>
                  <div>
                    <a href="tel:+918555913912" className="text-green-400 hover:text-green-300 transition-colors">
                      +91 8555913912
                    </a>
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <Mail className="h-6 w-6 text-green-400 mr-4" />
                <div>
                  <div>qualitypestcontrolservices1@gmail.com</div>
                </div>
              </div>
              <div className="flex items-center">
                <MapPin className="h-6 w-6 text-green-400 mr-4" />
                <span>16-3-133/1, Perikawada, Warangal</span>
              </div>
            </div>
            <div className="mt-6">
              <p className="text-gray-300 mb-2">YouTube Channel:</p>
              <p className="text-green-400">Quality Pest Control Services</p>
            </div>
          </div>
          
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              {isAuthenticated ? (
                <>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="fullName" className="text-white">Full Name *</Label>
                      <Input 
                        id="fullName"
                        name="fullName"
                        placeholder="Your Full Name" 
                        className="bg-gray-700 border-gray-600 text-white"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-white">Email *</Label>
                      <Input 
                        id="email"
                        name="email"
                        type="email" 
                        placeholder="Your Email" 
                        className="bg-gray-700 border-gray-600 text-white"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone" className="text-white">Phone Number *</Label>
                      <Input 
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="Your Phone Number" 
                        className="bg-gray-700 border-gray-600 text-white"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="subject" className="text-white">Subject *</Label>
                      <Input 
                        id="subject"
                        name="subject"
                        placeholder="Subject of your inquiry" 
                        className="bg-gray-700 border-gray-600 text-white"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="message" className="text-white">Message *</Label>
                      <Textarea 
                        id="message"
                        name="message"
                        placeholder="Tell us about your pest problem..."
                        className="bg-gray-700 border-gray-600 text-white"
                        rows={4}
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full bg-green-600 hover:bg-green-700"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </Button>
                  </form>
                  <div className="mt-6 p-4 bg-gray-700 rounded-lg">
                    <div className="flex items-start space-x-2">
                      <Lock className="h-4 w-4 text-green-400 mt-1 flex-shrink-0" />
                      <p className="text-sm text-gray-300">
                        This form is only available to logged-in users. Your information will be sent to our team and used solely for follow-up. We do not share your data with anyone.
                      </p>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center py-8">
                  <Lock className="h-16 w-16 text-gray-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">Login Required</h3>
                  <p className="text-gray-400 mb-4">
                    Please log in to access the contact form and send us your inquiry.
                  </p>
                  <Button 
                    onClick={() => window.location.reload()} 
                    className="bg-green-600 hover:bg-green-700"
                  >
                    Go to Login
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
