
import React from 'react';
import { Shield, Youtube, Phone, MessageCircle, MapPin } from "lucide-react";

interface FooterProps {
  onNavigate: (section: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleWhatsApp = () => {
    window.open('https://wa.me/919492309305?text=Hello%2C%20I%20visited%20your%20website%20Quality%20Pest%20Control%20Services%20and%20would%20like%20to%20know%20more%20about%20your%20pest%20control%20solutions.', '_blank');
  };

  const handleOfficeLocation = () => {
    window.open('https://maps.app.goo.gl/8MpyNDkYeHgAG3mB9', '_blank');
  };

  return (
    <footer className="bg-muted text-muted-foreground py-8 border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <Shield className="h-6 w-6 text-green-400 mr-2" />
              <span className="text-xl font-bold text-foreground">Quality Pest Control</span>
            </div>
            <p className="text-muted-foreground">
              Professional pest control services protecting homes and businesses across Telangana and Andhra Pradesh since 2008.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><button onClick={() => onNavigate('home')} className="hover:text-green-400 transition-colors">Home</button></li>
              <li><button onClick={() => onNavigate('about')} className="hover:text-green-400 transition-colors">About</button></li>
              <li><button onClick={() => onNavigate('services')} className="hover:text-green-400 transition-colors">Services</button></li>
              <li><button onClick={() => onNavigate('contact')} className="hover:text-green-400 transition-colors">Contact</button></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-4">Contact Info</h4>
            <ul className="space-y-2">
              <li>
                <a href="tel:+919492309305" className="text-green-400 hover:text-green-300 transition-colors flex items-center">
                  <Phone className="h-4 w-4 mr-2" />
                  +91 9492309305
                </a>
              </li>
              <li>
                <a href="tel:+918555913912" className="text-green-400 hover:text-green-300 transition-colors flex items-center">
                  <Phone className="h-4 w-4 mr-2" />
                  +91 8555913912
                </a>
              </li>
              <li>
                <button
                  onClick={handleOfficeLocation}
                  className="text-blue-400 hover:text-blue-300 transition-colors flex items-center"
                >
                  <MapPin className="h-4 w-4 mr-2" />
                  Visit Our Office
                </button>
              </li>
              <li className="text-muted-foreground">Warangal, Telangana</li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-4">Follow Us</h4>
            <div className="space-y-2">
              <a 
                href="https://youtube.com/@qualitypestcontrolservices?si=lpKd1R_T8R3R6ng-"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-red-600 hover:text-red-700 transition-colors"
              >
                <Youtube className="h-4 w-4 mr-2" />
                YouTube Channel
              </a>
              <button
                onClick={handleWhatsApp}
                className="flex items-center text-green-600 hover:text-green-700 transition-colors"
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                WhatsApp Us
              </button>
            </div>
          </div>
        </div>
        <div className="border-t border-border mt-8 pt-8 text-center">
          <p>&copy; 2008 Quality Pest Control Services. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
