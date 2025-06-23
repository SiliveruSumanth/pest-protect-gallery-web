
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Truck, CheckCircle, Leaf, Shield as ShieldIcon, Star, Phone, MessageCircle, Calendar } from "lucide-react";

interface HomePageProps {
  onNavigate: (section: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const handleCallNow = () => {
    window.open('tel:+919492309305', '_self');
  };

  const handleWhatsApp = () => {
    window.open('https://wa.me/919492309305?text=Hello%2C%20I%20visited%20your%20website%20Quality%20Pest%20Control%20Services%20and%20would%20like%20to%20know%20more%20about%20your%20pest%20control%20solutions.', '_blank');
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-green-600 to-emerald-700 text-white">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Quality Pest Control Services
            </h1>
            <p className="text-xl md:text-2xl mb-4 text-green-100">
              Protecting Your Home, Preserving Your Peace.
            </p>
            <p className="text-lg mb-8 text-green-100">
              Professional, eco-friendly pest control solutions for Telangana and Andhra Pradesh
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-green-600 hover:bg-gray-100 text-lg px-8 py-4"
                onClick={handleCallNow}
              >
                <Phone className="h-5 w-5 mr-2" />
                Call Now
              </Button>
              <Button 
                size="lg" 
                className="bg-orange-500 hover:bg-orange-600 text-white text-lg px-10 py-4 font-bold shadow-lg border-2 border-orange-400 transform hover:scale-105 transition-all duration-200"
                onClick={() => onNavigate('appointment')}
              >
                <Calendar className="h-6 w-6 mr-2" />
                BOOK APPOINTMENT NOW
              </Button>
              <Button 
                size="lg" 
                className="bg-green-500 hover:bg-green-600 text-lg px-8 py-4"
                onClick={handleWhatsApp}
              >
                <MessageCircle className="h-5 w-5 mr-2" />
                WhatsApp Us
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Why Choose Quality Pest Control?</h2>
            <p className="text-lg text-muted-foreground">We deliver exceptional service with guaranteed results</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Truck, title: 'Fast Pest Removal', description: 'Quick response and efficient pest elimination' },
              { icon: CheckCircle, title: 'Free Home Inspection', description: 'Comprehensive assessment at no cost' },
              { icon: Leaf, title: 'Eco-Friendly Technology', description: 'Safe for your family and environment' },
              { icon: ShieldIcon, title: 'Licensed & Protected Services', description: 'Certified professionals with insurance coverage' },
            ].map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="bg-green-100 dark:bg-green-900 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview with New Images */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Our Pest Control Services</h2>
            <p className="text-lg text-muted-foreground">Professional solutions with proven results</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { 
                name: 'Cockroach Control', 
                image: '/lovable-uploads/cockroach-control-new.jpg',
                description: 'Complete elimination with kitchen-safe treatments'
              },
              { 
                name: 'Termite Control', 
                image: '/lovable-uploads/65c5f08f-08cf-47c4-b1b3-c271fad06a41.png',
                description: 'Advanced detection and foundation protection'
              },
              { 
                name: 'Professional Equipment', 
                image: '/lovable-uploads/professional-equipment-new.jpg',
                description: 'State-of-the-art pest control technology'
              },
              { 
                name: 'Precision Treatment', 
                image: '/lovable-uploads/45c01aae-6856-4fbc-ae3e-bf4ef46b86ff.png',
                description: 'Targeted pest elimination using precision application methods'
              }
            ].map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300 overflow-hidden">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-2 left-2 text-white">
                    <h3 className="text-lg font-semibold">{service.name}</h3>
                  </div>
                </div>
                <CardContent className="p-4">
                  <p className="text-muted-foreground text-sm">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button onClick={() => onNavigate('services')} className="bg-green-600 hover:bg-green-700">
              View All Services
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Customer Testimonials</h2>
            <p className="text-lg text-muted-foreground">What our satisfied customers say about us</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Rajesh Kumar",
                rating: 5,
                review: "Excellent service! They completely eliminated the cockroach problem in my home. Very professional team."
              },
              {
                name: "Priya Sharma",
                rating: 5,
                review: "Fast and efficient termite treatment. The technicians were knowledgeable and used eco-friendly methods."
              },
              {
                name: "Venkat Reddy",
                rating: 5,
                review: "Highly recommend Quality Pest Control. Great customer service and effective pest solutions."
              }
            ].map((testimonial, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4">"{testimonial.review}"</p>
                  <p className="font-semibold text-foreground">- {testimonial.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
