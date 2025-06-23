
import React, { useState } from 'react';
import { Navigation } from '@/components/navigation/Navigation';
import { HomePage } from '@/components/pages/HomePage';
import { AboutPage } from '@/components/pages/AboutPage';
import { ServicesPage } from '@/components/pages/ServicesPage';
import { GalleryPage } from '@/components/pages/GalleryPage';
import { AppointmentPage } from '@/components/pages/AppointmentPage';
import { ContactPage } from '@/components/pages/ContactPage';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppButton } from '@/components/ui/whatsapp-button';
import { ThemeProvider } from '@/components/theme/ThemeProvider';

const Index = () => {
  const [currentView, setCurrentView] = useState('home');

  const navigateToSection = (section: string) => {
    setCurrentView(section);
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background text-foreground">
        <Navigation 
          currentView={currentView}
          onNavigate={navigateToSection}
        />

        {currentView === 'home' && <HomePage onNavigate={navigateToSection} />}
        {currentView === 'about' && <AboutPage />}
        {currentView === 'services' && <ServicesPage />}
        {currentView === 'gallery' && <GalleryPage />}
        {currentView === 'appointment' && <AppointmentPage />}
        {currentView === 'contact' && <ContactPage />}

        <Footer onNavigate={navigateToSection} />
        <WhatsAppButton />
      </div>
    </ThemeProvider>
  );
};

export default Index;
