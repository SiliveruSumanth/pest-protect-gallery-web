
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { sanitizeFormData, isValidEmail, isValidPhone, RateLimiter } from "@/lib/security";

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const rateLimiter = new RateLimiter(3, 300000); // 3 requests per 5 minutes

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Rate limiting check
    const userIdentifier = `contact_${formData.email || 'anonymous'}`;
    if (!rateLimiter.isAllowed(userIdentifier)) {
      const remainingTime = Math.ceil(rateLimiter.getRemainingTime(userIdentifier) / 1000 / 60);
      toast({
        title: "Too Many Requests",
        description: `Please wait ${remainingTime} minutes before submitting again.`,
        variant: "destructive",
      });
      return;
    }

    // Input validation and sanitization
    const sanitizedData = sanitizeFormData(formData);
    
    if (!isValidEmail(sanitizedData.email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
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
      console.log('Form submission (sanitized):', sanitizedData);
      
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
        description: "An error occurred. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsApp = () => {
    window.open('https://wa.me/919492309305?text=Hello%2C%20I%20visited%20your%20website%20Quality%20Pest%20Control%20Services%20and%20would%20like%20to%20know%20more%20about%20your%20pest%20control%20solutions.', '_blank');
  };

  return (
    <section className="py-16 bg-muted text-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold mb-6">Get In Touch</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Ready to protect your home? Contact Quality Pest Control Services today for a free inspection and quote.
            </p>
            <div className="space-y-4">
              <div className="flex items-center">
                <Phone className="h-6 w-6 text-green-400 mr-4" />
                <div className="space-y-1">
                  <div>
                    <a href="tel:+919492309305" className="text-green-600 hover:text-green-700 transition-colors">
                      +91 9492309305
                    </a>
                  </div>
                  <div>
                    <a href="tel:+918555913912" className="text-green-600 hover:text-green-700 transition-colors">
                      +91 8555913912
                    </a>
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <Mail className="h-6 w-6 text-green-400 mr-4" />
                <div>
                  <a href="mailto:qualitypestcontrolservices1@gmail.com" className="text-green-600 hover:text-green-700 transition-colors">
                    qualitypestcontrolservices1@gmail.com
                  </a>
                </div>
              </div>
              <div className="flex items-center">
                <MapPin className="h-6 w-6 text-green-400 mr-4" />
                <span>16-3-133/1, Perikawada, Warangal</span>
              </div>
              <div className="flex items-center">
                <MessageCircle className="h-6 w-6 text-green-400 mr-4" />
                <Button
                  onClick={handleWhatsApp}
                  variant="link"
                  className="p-0 h-auto text-green-600 hover:text-green-700"
                >
                  WhatsApp Quick Message
                </Button>
              </div>
            </div>
            <div className="mt-6">
              <p className="text-muted-foreground mb-2">YouTube Channel:</p>
              <a 
                href="https://youtube.com/@qualitypestcontrolservices?si=lpKd1R_T8R3R6ng-"
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-600 hover:text-green-700 transition-colors"
              >
                Quality Pest Control Services
              </a>
            </div>
          </div>
          
          <Card className="bg-card border">
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input 
                    id="fullName"
                    name="fullName"
                    placeholder="Your Full Name" 
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input 
                    id="email"
                    name="email"
                    type="email" 
                    placeholder="Your Email" 
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input 
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="Your Phone Number" 
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="subject">Subject *</Label>
                  <Input 
                    id="subject"
                    name="subject"
                    placeholder="Subject of your inquiry" 
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="message">Message *</Label>
                  <Textarea 
                    id="message"
                    name="message"
                    placeholder="Tell us about your pest problem..."
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
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
