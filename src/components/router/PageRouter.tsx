
import React from 'react';
import { HomePage } from '@/components/pages/HomePage';
import { AboutPage } from '@/components/pages/AboutPage';
import { ServicesPage } from '@/components/pages/ServicesPage';
import { GalleryPage } from '@/components/pages/GalleryPage';
import { AppointmentPage } from '@/components/pages/AppointmentPage';
import { ContactPage } from '@/components/pages/ContactPage';

interface PageRouterProps {
  currentView: string;
  onNavigate: (section: string) => void;
}

export const PageRouter: React.FC<PageRouterProps> = ({ currentView, onNavigate }) => {
  switch (currentView) {
    case 'home':
      return <HomePage onNavigate={onNavigate} />;
    case 'about':
      return <AboutPage />;
    case 'services':
      return <ServicesPage />;
    case 'gallery':
      return <GalleryPage />;
    case 'appointment':
      return <AppointmentPage />;
    case 'contact':
      return <ContactPage />;
    default:
      return <HomePage onNavigate={onNavigate} />;
  }
};
