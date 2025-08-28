import { useState, useEffect } from 'react';
import { GOOGLE_MAPS_CONFIG } from '@/config/maps';

export const useGoogleMaps = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeMaps = async () => {
      if (typeof window === 'undefined') return;

      // Already loaded
      if ((window as any).google && (window as any).google.maps) {
        setIsLoaded(true);
        return;
      }

      // If a load is already in progress elsewhere, wait for it
      const globalAny = window as any;
      if (globalAny.__gmapsLoadingPromise) {
        try {
          await globalAny.__gmapsLoadingPromise;
          setIsLoaded(!!(globalAny.google && globalAny.google.maps));
        } catch (e) {
          setError('Failed to load Google Maps');
        }
        return;
      }

      // If script tag already exists, reuse it and create a promise for it
      let script = document.querySelector('script[data-gmaps="1"]') as HTMLScriptElement | null;
      if (!script) {
        script = document.createElement('script');
        script.setAttribute('data-gmaps', '1');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_CONFIG.API_KEY}&libraries=${GOOGLE_MAPS_CONFIG.LIBRARIES.join(',')}`;
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);
      }

      setIsLoading(true);
      setError(null);
      globalAny.__gmapsLoadingPromise = new Promise<void>((resolve, reject) => {
        script!.onload = () => {
          setIsLoaded(true);
          resolve();
        };
        script!.onerror = () => {
          setError('Failed to load Google Maps');
          reject(new Error('Failed to load Google Maps'));
        };
      });

      try {
        await globalAny.__gmapsLoadingPromise;
      } finally {
        setIsLoading(false);
      }
    };

    void initializeMaps();
  }, []);

  return {
    isLoaded,
    isLoading,
    error,
    reload: () => {
      setIsLoaded(false);
      setError(null);
      setIsLoading(false);
    }
  };
};
