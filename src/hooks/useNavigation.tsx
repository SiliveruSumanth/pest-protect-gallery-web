
import { useState } from 'react';

export const useNavigation = () => {
  const [currentView, setCurrentView] = useState('home');

  const navigateToSection = (section: string) => {
    setCurrentView(section);
  };

  return {
    currentView,
    navigateToSection,
  };
};
