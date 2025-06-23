
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Shield, Menu, X } from "lucide-react";

interface NavigationProps {
  currentView: string;
  onNavigate: (section: string) => void;
  onShowAuth: () => void;
  isAuthenticated: boolean;
}

export const Navigation: React.FC<NavigationProps> = ({ 
  currentView, 
  onNavigate, 
  onShowAuth, 
  isAuthenticated 
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigateToSection = (section: string) => {
    onNavigate(section);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Shield className="h-8 w-8 text-green-600 mr-2" />
            <span className="text-xl font-bold text-green-800">Quality Pest Control</span>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <button onClick={() => navigateToSection('home')} className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${currentView === 'home' ? 'text-green-600' : 'text-gray-700 hover:text-green-600'}`}>Home</button>
              <button onClick={() => navigateToSection('about')} className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${currentView === 'about' ? 'text-green-600' : 'text-gray-700 hover:text-green-600'}`}>About</button>
              <button onClick={() => navigateToSection('services')} className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${currentView === 'services' ? 'text-green-600' : 'text-gray-700 hover:text-green-600'}`}>Services</button>
              <button onClick={() => navigateToSection('gallery')} className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${currentView === 'gallery' ? 'text-green-600' : 'text-gray-700 hover:text-green-600'}`}>Gallery</button>
              <button onClick={() => navigateToSection('appointment')} className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${currentView === 'appointment' ? 'text-green-600' : 'text-gray-700 hover:text-green-600'}`}>Appointment</button>
              <button onClick={() => navigateToSection('contact')} className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${currentView === 'contact' ? 'text-green-600' : 'text-gray-700 hover:text-green-600'}`}>Contact</button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
          
          <Button 
            onClick={onShowAuth} 
            variant="outline" 
            size="sm"
            className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white hidden md:block"
          >
            {isAuthenticated ? 'Account' : 'Login'}
          </Button>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              <button onClick={() => navigateToSection('home')} className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-green-600 hover:bg-gray-50 w-full text-left">Home</button>
              <button onClick={() => navigateToSection('about')} className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-green-600 hover:bg-gray-50 w-full text-left">About</button>
              <button onClick={() => navigateToSection('services')} className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-green-600 hover:bg-gray-50 w-full text-left">Services</button>
              <button onClick={() => navigateToSection('gallery')} className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-green-600 hover:bg-gray-50 w-full text-left">Gallery</button>
              <button onClick={() => navigateToSection('appointment')} className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-green-600 hover:bg-gray-50 w-full text-left">Appointment</button>
              <button onClick={() => navigateToSection('contact')} className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-green-600 hover:bg-gray-50 w-full text-left">Contact</button>
              <Button 
                onClick={onShowAuth} 
                variant="outline" 
                size="sm"
                className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white w-full mt-3"
              >
                {isAuthenticated ? 'Account' : 'Login'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
