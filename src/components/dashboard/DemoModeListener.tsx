import { useEffect } from 'react';

/**
 * A component that listens for changes to the demo mode setting
 * in localStorage and triggers a custom event to notify other components
 */
const DemoModeListener: React.FC = () => {
  useEffect(() => {
    // Create a storage event handler
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'meddpicc_demo_mode') {
        // Dispatch a custom event when demo mode changes
        window.dispatchEvent(
          new CustomEvent('demoModeChange', {
            detail: { isDemoMode: e.newValue === 'true' }
          })
        );
      }
    };

    // Add event listener
    window.addEventListener('storage', handleStorageChange);

    // Clean up
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // This component doesn't render anything
  return null;
};

export default DemoModeListener;