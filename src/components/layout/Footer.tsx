
import React from 'react';
import { Shield } from "lucide-react";

interface FooterProps {
  onNavigate: (section: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <Shield className="h-6 w-6 text-green-400 mr-2" />
              <span className="text-xl font-bold text-white">Sathavahana Pest Control</span>
            </div>
            <p className="text-gray-400">
              Professional pest control services protecting homes and businesses across Telangana and Andhra Pradesh since 2008.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><button onClick={() => onNavigate('home')} className="hover:text-green-400 transition-colors">Home</button></li>
              <li><button onClick={() => onNavigate('about')} className="hover:text-green-400 transition-colors">About</button></li>
              <li><button onClick={() => onNavigate('services')} className="hover:text-green-400 transition-colors">Services</button></li>
              <li><button onClick={() => onNavigate('contact')} className="hover:text-green-400 transition-colors">Contact</button></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Service Areas</h4>
            <ul className="space-y-2">
              <li className="text-gray-400">Telangana</li>
              <li className="text-gray-400">Andhra Pradesh</li>
              <li className="text-gray-400">Warangal</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p>&copy; 2024 Sathavahana Pest Control Services. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
