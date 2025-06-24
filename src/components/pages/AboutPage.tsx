
import React from 'react';
import { Home, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

export const AboutPage: React.FC = () => {
  const handleOfficeLocation = () => {
    window.open('https://maps.app.goo.gl/8MpyNDkYeHgAG3mB9', '_blank');
  };

  return (
    <section className="py-16 bg-muted/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-6">About Quality Pest Control Services</h2>
            <p className="text-lg text-muted-foreground mb-6">
              With over 15 years of experience serving Telangana and Andhra Pradesh, Quality Pest Control Services is your trusted partner in maintaining pest-free environments. Our team of certified professionals uses the latest eco-friendly techniques to ensure effective and safe pest control solutions.
            </p>
            <p className="text-lg text-muted-foreground mb-8">
              We are committed to customer satisfaction and safety, building long-term relationships through exceptional service, transparent pricing, and guaranteed results. Our comprehensive approach covers residential, commercial, and industrial pest control needs across both states.
            </p>
            <div className="flex items-center space-x-6 mb-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">15+</div>
                <div className="text-sm text-muted-foreground">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">2</div>
                <div className="text-sm text-muted-foreground">States Served</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">100%</div>
                <div className="text-sm text-muted-foreground">Satisfaction</div>
              </div>
            </div>
            <Button 
              onClick={handleOfficeLocation}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              <MapPin className="h-4 w-4 mr-2" />
              Visit Our Office
            </Button>
          </div>
          <div className="bg-green-100 dark:bg-green-900 p-8 rounded-lg">
            <Home className="h-32 w-32 text-green-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-center text-foreground">Your Home, Protected</h3>
          </div>
        </div>
      </div>
    </section>
  );
};
