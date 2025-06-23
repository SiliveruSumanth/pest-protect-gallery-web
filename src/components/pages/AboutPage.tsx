
import React from 'react';
import { Home } from "lucide-react";

export const AboutPage: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">About Quality Pest Control Services</h2>
            <p className="text-lg text-gray-600 mb-6">
              With over 15 years of experience serving Telangana and Andhra Pradesh, Quality Pest Control Services is your trusted partner in maintaining pest-free environments. Our team of certified professionals uses the latest eco-friendly techniques to ensure effective and safe pest control solutions.
            </p>
            <p className="text-lg text-gray-600 mb-8">
              We are committed to customer satisfaction and safety, building long-term relationships through exceptional service, transparent pricing, and guaranteed results. Our comprehensive approach covers residential, commercial, and industrial pest control needs across both states.
            </p>
            <div className="flex items-center space-x-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">15+</div>
                <div className="text-sm text-gray-500">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">2</div>
                <div className="text-sm text-gray-500">States Served</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">100%</div>
                <div className="text-sm text-gray-500">Satisfaction</div>
              </div>
            </div>
          </div>
          <div className="bg-green-100 p-8 rounded-lg">
            <Home className="h-32 w-32 text-green-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-center text-gray-800">Your Home, Protected</h3>
          </div>
        </div>
      </div>
    </section>
  );
};
