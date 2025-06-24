
import { useState, useEffect } from 'react';

export const useTabPreservation = (tabsId: string, defaultTab: string) => {
  const [activeTab, setActiveTab] = useState(defaultTab);

  // Load saved tab on mount
  useEffect(() => {
    try {
      const savedTab = localStorage.getItem(`${tabsId}_activeTab`);
      if (savedTab) {
        setActiveTab(savedTab);
      }
    } catch (error) {
      console.error('Failed to load saved tab:', error);
    }
  }, [tabsId]);

  // Save tab when it changes
  const handleTabChange = (tabValue: string) => {
    setActiveTab(tabValue);
    try {
      localStorage.setItem(`${tabsId}_activeTab`, tabValue);
    } catch (error) {
      console.error('Failed to save tab:', error);
    }
  };

  return {
    activeTab,
    setActiveTab: handleTabChange
  };
};
