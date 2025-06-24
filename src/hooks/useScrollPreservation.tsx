
import { useEffect, useCallback } from 'react';

interface ScrollPreservationOptions {
  currentView: string;
  onNavigate: (section: string) => void;
}

export const useScrollPreservation = ({ currentView, onNavigate }: ScrollPreservationOptions) => {
  // Save scroll position and current section
  const saveScrollState = useCallback(() => {
    const scrollPosition = window.scrollY;
    const state = {
      scrollPosition,
      currentView,
      timestamp: Date.now()
    };
    localStorage.setItem('pestControlScrollState', JSON.stringify(state));
  }, [currentView]);

  // Restore scroll position and section
  const restoreScrollState = useCallback(() => {
    try {
      const savedState = localStorage.getItem('pestControlScrollState');
      if (savedState) {
        const state = JSON.parse(savedState);
        
        // Only restore if the state is recent (within 1 hour)
        const isRecent = Date.now() - state.timestamp < 3600000;
        
        if (isRecent && state.currentView && state.scrollPosition !== undefined) {
          // First navigate to the correct section
          if (state.currentView !== currentView) {
            onNavigate(state.currentView);
          }
          
          // Then restore scroll position after a short delay to ensure content is loaded
          setTimeout(() => {
            window.scrollTo({
              top: state.scrollPosition,
              behavior: 'instant' // Use instant to avoid visible scrolling
            });
          }, 100);
        }
      }
    } catch (error) {
      console.error('Failed to restore scroll state:', error);
    }
  }, [currentView, onNavigate]);

  // Save state on scroll and section changes
  useEffect(() => {
    const handleScroll = () => {
      saveScrollState();
    };

    // Throttle scroll events to improve performance
    let scrollTimeout: NodeJS.Timeout;
    const throttledScroll = () => {
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
      scrollTimeout = setTimeout(handleScroll, 150);
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', throttledScroll);
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
    };
  }, [saveScrollState]);

  // Save state when section changes
  useEffect(() => {
    saveScrollState();
  }, [currentView, saveScrollState]);

  // Restore state on initial load
  useEffect(() => {
    // Only restore on initial page load
    const hasRestoredBefore = sessionStorage.getItem('hasRestoredScroll');
    if (!hasRestoredBefore) {
      restoreScrollState();
      sessionStorage.setItem('hasRestoredScroll', 'true');
    }

    // Clean up session storage when the user navigates away
    const handleBeforeUnload = () => {
      sessionStorage.removeItem('hasRestoredScroll');
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [restoreScrollState]);

  return {
    saveScrollState,
    restoreScrollState
  };
};
