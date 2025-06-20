
import React from 'react';
import { Navigation } from '@/components/navigation/Navigation';
import { Footer } from '@/components/layout/Footer';
import { PageRouter } from '@/components/router/PageRouter';

interface AppLayoutProps {
  currentView: string;
  onNavigate: (section: string) => void;
  onShowAuth: () => void;
  isAuthenticated: boolean;
}

export const AppLayout: React.FC<AppLayoutProps> = ({
  currentView,
  onNavigate,
  onShowAuth,
  isAuthenticated,
}) => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation 
        currentView={currentView}
        onNavigate={onNavigate}
        onShowAuth={onShowAuth}
        isAuthenticated={isAuthenticated}
      />

      <PageRouter currentView={currentView} onNavigate={onNavigate} />

      <Footer onNavigate={onNavigate} />
    </div>
  );
};
