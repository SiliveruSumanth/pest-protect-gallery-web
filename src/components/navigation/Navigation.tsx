
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Shield, Menu, X } from "lucide-react";
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { YoutubeIcon } from '@/components/ui/youtube-icon';

interface NavigationProps {
  currentView: string;
  onNavigate: (section: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ 
  currentView, 
  onNavigate
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigateToSection = (section: string) => {
    onNavigate(section);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="bg-background shadow-lg sticky top-0 z-50 border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Shield className="h-8 w-8 text-green-600 mr-2" />
            <span className="text-xl font-bold text-green-800 dark:text-green-400">Quality Pest Control</span>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <button onClick={() => navigateToSection('home')} className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${currentView === 'home' ? 'text-green-600' : 'text-foreground hover:text-green-600'}`}>Home</button>
              <button onClick={() => navigateToSection('about')} className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${currentView === 'about' ? 'text-green-600' : 'text-foreground hover:text-green-600'}`}>About</button>
              <button onClick={() => navigateToSection('services')} className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${currentView === 'services' ? 'text-green-600' : 'text-foreground hover:text-green-600'}`}>Services</button>
              <button onClick={() => navigateToSection('gallery')} className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${currentView === 'gallery' ? 'text-green-600' : 'text-foreground hover:text-green-600'}`}>Gallery</button>
              <button onClick={() => navigateToSection('appointment')} className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${currentView === 'appointment' ? 'text-green-600' : 'text-foreground hover:text-green-600'}`}>Appointment</button>
              <button onClick={() => navigateToSection('contact')} className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${currentView === 'contact' ? 'text-green-600' : 'text-foreground hover:text-green-600'}`}>Contact</button>
            </div>
          </div>

          {/* Right side items */}
          <div className="hidden md:flex items-center space-x-3">
            <YoutubeIcon />
            <ThemeToggle />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <YoutubeIcon />
            <ThemeToggle />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-background border-t">
              <button onClick={() => navigateToSection('home')} className="block px-3 py-2 text-base font-medium text-foreground hover:text-green-600 hover:bg-accent w-full text-left">Home</button>
              <button onClick={() => navigateToSection('about')} className="block px-3 py-2 text-base font-medium text-foreground hover:text-green-600 hover:bg-accent w-full text-left">About</button>
              <button onClick={() => navigateToSection('services')} className="block px-3 py-2 text-base font-medium text-foreground hover:text-green-600 hover:bg-accent w-full text-left">Services</button>
              <button onClick={() => navigateToSection('gallery')} className="block px-3 py-2 text-base font-medium text-foreground hover:text-green-600 hover:bg-accent w-full text-left">Gallery</button>
              <button onClick={() => navigateToSection('appointment')} className="block px-3 py-2 text-base font-medium text-foreground hover:text-green-600 hover:bg-accent w-full text-left">Appointment</button>
              <button onClick={() => navigateToSection('contact')} className="block px-3 py-2 text-base font-medium text-foreground hover:text-green-600 hover:bg-accent w-full text-left">Contact</button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
