
import { useState } from 'react';
import { toast } from "@/hooks/use-toast";

export const useAuthState = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAuth, setShowAuth] = useState(true);

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

  const handleShowAuth = () => {
    setShowAuth(true);
  };

  return {
    isAuthenticated,
    showAuth,
    handleAuthSuccess,
    handleGuestAccess,
    handleShowAuth,
  };
};
