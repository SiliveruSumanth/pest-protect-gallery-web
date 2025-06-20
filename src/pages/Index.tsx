
import React from 'react';
import { AuthForm } from '@/components/auth/AuthForm';
import { AppLayout } from '@/components/layout/AppLayout';
import { useAuthState } from '@/hooks/useAuthState';
import { useNavigation } from '@/hooks/useNavigation';

const Index = () => {
  const {
    isAuthenticated,
    showAuth,
    handleAuthSuccess,
    handleGuestAccess,
    handleShowAuth,
  } = useAuthState();

  const { currentView, navigateToSection } = useNavigation();

  if (showAuth) {
    return (
      <AuthForm 
        onAuthSuccess={handleAuthSuccess}
        onGuestAccess={handleGuestAccess}
      />
    );
  }

  return (
    <AppLayout
      currentView={currentView}
      onNavigate={navigateToSection}
      onShowAuth={handleShowAuth}
      isAuthenticated={isAuthenticated}
    />
  );
};

export default Index;
