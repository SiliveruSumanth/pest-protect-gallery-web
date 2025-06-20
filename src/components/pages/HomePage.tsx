
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Truck, CheckCircle, Leaf, Shield as ShieldIcon, Star, ArrowRight } from "lucide-react";

interface HomePageProps {
  onNavigate: (section: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-green-600 to-emerald-700 text-white">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Sathavahana Pest Control Services
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-green-100">
              Professional, eco-friendly pest control solutions for Telangana and Andhra Pradesh
            </p>
            <Button 
              size="lg" 
              className="bg-white text-green-600 hover:bg-gray-100 text-lg px-8 py-4"
              onClick={() => onNavigate('contact')}
            >
              Get Free Inspection
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Sathavahana Pest Control?</h2>
            <p className="text-lg text-gray-600">We deliver exceptional service with guaranteed results</p>
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
                  <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview with Real Images */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Pest Control Services</h2>
            <p className="text-lg text-gray-600">Professional solutions with proven results</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { 
                name: 'Cockroach Control', 
                image: '/lovable-uploads/0ce032b6-9180-4356-861e-4fb1cc5211c4.png',
                description: 'Complete elimination with kitchen-safe treatments'
              },
              { 
                name: 'Termite Control', 
                image: '/lovable-uploads/65c5f08f-08cf-47c4-b1b3-c271fad06a41.png',
                description: 'Advanced detection and foundation protection'
              },
              { 
                name: 'Professional Equipment', 
                image: '/lovable-uploads/162eefb3-cdc3-43e1-858e-ba5f5f2166a2.png',
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
                  <p className="text-gray-600 text-sm">{service.description}</p>
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

      {/* Before & After Results Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Real Results, Real Impact</h2>
            <p className="text-lg text-gray-600">See the effectiveness of our professional pest control treatments</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "Foundation Protection",
                beforeImage: "/lovable-uploads/65c5f08f-08cf-47c4-b1b3-c271fad06a41.png",
                afterImage: "/lovable-uploads/b482c87c-ac2d-4d5e-bc95-50022a20fc98.png",
                description: "Complete termite elimination and prevention treatment"
              },
              {
                title: "Kitchen Pest Control",
                beforeImage: "/lovable-uploads/8f49db26-4929-4caa-bad8-202a854b8b2d.png",
                afterImage: "/lovable-uploads/0ce032b6-9180-4356-861e-4fb1cc5211c4.png",
                description: "Thorough cockroach and kitchen pest elimination"
              }
            ].map((result, index) => (
              <Card key={index} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="text-center mb-4">
                    <h3 className="text-xl font-bold">{result.title}</h3>
                    <p className="text-gray-600">{result.description}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <p className="text-sm font-semibold text-red-600 mb-2">Before Treatment</p>
                      <div className="relative overflow-hidden rounded-lg">
                        <img 
                          src={result.beforeImage}
                          alt="Before treatment"
                          className="w-full h-32 object-cover"
                        />
                        <div className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 rounded text-xs">
                          Problem
                        </div>
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-semibold text-green-600 mb-2">After Treatment</p>
                      <div className="relative overflow-hidden rounded-lg">
                        <img 
                          src={result.afterImage}
                          alt="After treatment"
                          className="w-full h-32 object-cover"
                        />
                        <div className="absolute top-2 left-2 bg-green-600 text-white px-2 py-1 rounded text-xs">
                          Solved
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-center mt-4">
                    <ArrowRight className="h-6 w-6 text-green-600" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Customer Testimonials</h2>
            <p className="text-lg text-gray-600">What our satisfied customers say about us</p>
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
                review: "Highly recommend Sathavahana Pest Control. Great customer service and effective pest solutions."
              }
            ].map((testimonial, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4">"{testimonial.review}"</p>
                  <p className="font-semibold text-gray-900">- {testimonial.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
