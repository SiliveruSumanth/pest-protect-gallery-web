
import React, { useState } from 'react';
import { toast } from "@/hooks/use-toast";
import { AuthForm } from '@/components/auth/AuthForm';
import { Navigation } from '@/components/navigation/Navigation';
import { HomePage } from '@/components/pages/HomePage';
import { AboutPage } from '@/components/pages/AboutPage';
import { ServicesPage } from '@/components/pages/ServicesPage';
import { GalleryPage } from '@/components/pages/GalleryPage';
import { AppointmentPage } from '@/components/pages/AppointmentPage';
import { ContactPage } from '@/components/pages/ContactPage';
import { Footer } from '@/components/layout/Footer';

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAuth, setShowAuth] = useState(true);
  const [currentView, setCurrentView] = useState('home');

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
    setShowAuth(false);
  };

  const handleGuestAccess = () => {
    setShowAuth(false);
    toast({
      title: "Guest Access",
      description: "Browsing as guest. Contact us for exclusive offers!",
    });
  };

  const navigateToSection = (section: string) => {
    setCurrentView(section);
  };

  const handleShowAuth = () => {
    setShowAuth(true);
  };

  if (showAuth) {
    return (
      <AuthForm 
        onAuthSuccess={handleAuthSuccess}
        onGuestAccess={handleGuestAccess}
      />
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation 
        currentView={currentView}
        onNavigate={navigateToSection}
        onShowAuth={handleShowAuth}
        isAuthenticated={isAuthenticated}
      />

      {currentView === 'home' && <HomePage onNavigate={navigateToSection} />}
      {currentView === 'about' && <AboutPage />}
      {currentView === 'services' && <ServicesPage />}
      {currentView === 'gallery' && <GalleryPage />}
      {currentView === 'appointment' && <AppointmentPage />}
      {currentView === 'contact' && <ContactPage />}

      <Footer onNavigate={navigateToSection} />
    </div>
  );
};

export default Index;
