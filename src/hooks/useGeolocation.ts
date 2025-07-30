import { useState, useEffect } from 'react';

export interface GeolocationCoords {
  latitude: number;
  longitude: number;
  accuracy: number;
  altitude?: number | null;
  altitudeAccuracy?: number | null;
  heading?: number | null;
  speed?: number | null;
}

export interface GeolocationState {
  loading: boolean;
  accuracy?: number;
  altitude?: number | null;
  altitudeAccuracy?: number | null;
  heading?: number | null;
  latitude?: number;
  longitude?: number;
  speed?: number | null;
  timestamp?: number;
  error?: {
    code: number;
    message: string;
  };
}

const defaultSettings = {
  enableHighAccuracy: true,
  timeout: 10000, // 10 seconds
  maximumAge: 60000, // 1 minute
};

/**
 * Custom hook for getting user's geolocation
 * 
 * @param options - Geolocation options (optional)
 * @returns GeolocationState with current location data, loading state, and any errors
 * 
 * @example
 * ```tsx
 * const { latitude, longitude, loading, error } = useGeolocation();
 * 
 * if (loading) return <div>Getting location...</div>;
 * if (error) return <div>Error: {error.message}</div>;
 * if (latitude && longitude) return <div>Lat: {latitude}, Lng: {longitude}</div>;
 * ```
 */
export const useGeolocation = (options: PositionOptions = defaultSettings): GeolocationState => {
  const [state, setState] = useState<GeolocationState>({
    loading: true,
  });

  useEffect(() => {
    // Check if geolocation is supported
    if (!navigator?.geolocation) {
      setState({
        loading: false,
        error: {
          code: 0,
          message: 'Geolocation is not supported by this browser.',
        },
      });
      return;
    }

    let watchId: number;

    const onSuccess = (position: GeolocationPosition) => {
      setState({
        loading: false,
        accuracy: position.coords.accuracy,
        altitude: position.coords.altitude,
        altitudeAccuracy: position.coords.altitudeAccuracy,
        heading: position.coords.heading,
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        speed: position.coords.speed,
        timestamp: position.timestamp,
      });
    };

    const onError = (error: GeolocationPositionError) => {
      let message = 'An unknown error occurred while retrieving location.';
      
      switch (error.code) {
        case error.PERMISSION_DENIED:
          message = 'Location access denied by user.';
          break;
        case error.POSITION_UNAVAILABLE:
          message = 'Location information is unavailable.';
          break;
        case error.TIMEOUT:
          message = 'Location request timed out.';
          break;
      }

      setState({
        loading: false,
        error: {
          code: error.code,
          message,
        },
      });
    };

    // Get current position immediately
    navigator.geolocation.getCurrentPosition(onSuccess, onError, options);

    // Watch position changes
    watchId = navigator.geolocation.watchPosition(onSuccess, onError, options);

    // Cleanup
    return () => {
      if (watchId !== undefined) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, [options.enableHighAccuracy, options.timeout, options.maximumAge]);

  return state;
};