
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin } from "lucide-react";

export const ContactPage: React.FC = () => {
  return (
    <section className="py-16 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold mb-6">Get In Touch</h2>
            <p className="text-lg text-gray-300 mb-8">
              Ready to protect your home? Contact Sathavahana Pest Control Services today for a free inspection and quote.
            </p>
            <div className="space-y-4">
              <div className="flex items-center">
                <Phone className="h-6 w-6 text-green-400 mr-4" />
                <div>
                  <div>+91 9492309305</div>
                  <div>+91 9492309305</div>
                </div>
              </div>
              <div className="flex items-center">
                <Mail className="h-6 w-6 text-green-400 mr-4" />
                <div>
                  <div>qualitypestcontrolservices1@gmail.com</div>
                  <div>javvadiyaladri@gmail.com</div>
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
              <form className="space-y-4">
                <div>
                  <Label htmlFor="contact-name" className="text-white">Name</Label>
                  <Input id="contact-name" placeholder="Your Name" className="bg-gray-700 border-gray-600 text-white" />
                </div>
                <div>
                  <Label htmlFor="contact-phone" className="text-white">Phone</Label>
                  <Input id="contact-phone" placeholder="Your Phone" className="bg-gray-700 border-gray-600 text-white" />
                </div>
                <div>
                  <Label htmlFor="contact-email" className="text-white">Email</Label>
                  <Input id="contact-email" type="email" placeholder="Your Email" className="bg-gray-700 border-gray-600 text-white" />
                </div>
                <div>
                  <Label htmlFor="contact-message" className="text-white">Message</Label>
                  <Textarea 
                    id="contact-message" 
                    placeholder="Tell us about your pest problem..."
                    className="bg-gray-700 border-gray-600 text-white"
                    rows={4}
                  />
                </div>
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
