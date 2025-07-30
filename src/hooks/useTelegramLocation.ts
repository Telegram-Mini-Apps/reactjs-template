import { useState } from 'react';
import { postEvent } from '@telegram-apps/sdk-react';

interface TelegramLocationState {
  loading: boolean;
  location?: {
    latitude: number;
    longitude: number;
  };
  error?: string;
}

/**
 * Custom hook to request location through Telegram Bot API
 * 
 * This hook attempts to use Telegram's location sharing features
 * when available in the Mini App environment
 * 
 * @returns TelegramLocationState with location data and loading state
 * 
 * @example
 * ```tsx
 * const { location, loading, error } = useTelegramLocation();
 * 
 * if (loading) return <div>Requesting location...</div>;
 * if (error) return <div>Error: {error}</div>;
 * if (location) return <div>Lat: {location.latitude}</div>;
 * ```
 */
export const useTelegramLocation = (): TelegramLocationState => {
  const [state, setState] = useState<TelegramLocationState>({
    loading: false,
  });

  const requestTelegramLocation = () => {
    setState({ loading: true });

    try {
      // Request location through Telegram Mini App API
      // This will prompt the user to share their location through Telegram
      postEvent('web_app_request_location');
      
      // Set a timeout for the request
      const timeout = setTimeout(() => {
        setState({
          loading: false,
          error: 'Location request timed out. Please try again.',
        });
      }, 10000);

      // Listen for location response
      const handleLocationReceived = (event: any) => {
        clearTimeout(timeout);
        
        if (event.data?.location) {
          setState({
            loading: false,
            location: {
              latitude: event.data.location.latitude,
              longitude: event.data.location.longitude,
            },
          });
        } else {
          setState({
            loading: false,
            error: 'Failed to get location from Telegram',
          });
        }
      };

      // TODO: simplified here for now, lets work on it later.
      window.addEventListener('telegram-location-received', handleLocationReceived);

      return () => {
        clearTimeout(timeout);
        window.removeEventListener('telegram-location-received', handleLocationReceived);
      };
    } catch (error) {
      setState({
        loading: false,
        error: 'Telegram location sharing not available',
      });
    }
  };

  return {
    ...state,
    requestLocation: requestTelegramLocation,
  } as TelegramLocationState & { requestLocation: () => void };
};