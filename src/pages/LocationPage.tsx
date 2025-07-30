import { AlertCircle, MapPin, RefreshCw, Navigation2 } from 'lucide-react';
import { useGeolocation } from '@/hooks/useGeolocation';
import { MapContainer } from '@/components/Map/MapContainer';
import { LocationCard } from '@/components/LocationCard';
import { Button } from '@/components/ui/Button';
import { TailwindTest } from '@/components/TailwindTest';

export function LocationPage() {
  const location = useGeolocation({
    enableHighAccuracy: true,
    timeout: 15000,
    maximumAge: 60000,
  });

  const { loading, error, latitude, longitude } = location;

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        <TailwindTest />
        <div className="flex items-center justify-center min-h-screen p-4">
          <div className="text-center max-w-md">
            <div className="relative mb-8">
              <div className="w-24 h-24 mx-auto bg-blue-100 dark:bg-blue-900/40 rounded-full flex items-center justify-center">
                <Navigation2 className="h-12 w-12 text-blue-600 dark:text-blue-400 animate-pulse" />
              </div>
              <div className="absolute inset-0 w-24 h-24 mx-auto border-4 border-blue-200 dark:border-blue-800 rounded-full animate-ping"></div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              Finding Your Location
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Please allow location access when prompted by your browser
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
              <Navigation2 className="h-4 w-4" />
              <span>GPS signal scanning...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100 dark:from-gray-900 dark:to-gray-800">
        <div className="flex items-center justify-center min-h-screen p-4">
          <div className="text-center max-w-md">
            <div className="w-24 h-24 mx-auto bg-red-100 dark:bg-red-900/40 rounded-full flex items-center justify-center mb-6">
              <AlertCircle className="h-12 w-12 text-red-600 dark:text-red-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              Location Access Denied
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {error.message}
            </p>
            <div className="space-y-3">
              <Button
                onClick={() => window.location.reload()}
                className="w-full"
                size="lg"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Try Again
              </Button>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Make sure to allow location permissions in your browser settings
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Success state with location
  if (latitude && longitude) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        {/* Floating Header */}
        <div className="sticky top-0 z-10 backdrop-blur-lg bg-white/80 dark:bg-gray-900/80 border-b border-white/20 dark:border-gray-800/20">
          <div className="max-w-4xl mx-auto p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/40 rounded-xl">
                  <MapPin className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                    Location Tracker
                  </h1>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Real-time GPS positioning
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1 px-3 py-1 bg-green-100 dark:bg-green-900/40 rounded-full">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs font-medium text-green-700 dark:text-green-300">Active</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto p-4 space-y-6">
          {/* Location Info Card */}
          <LocationCard location={location} />
          
          {/* Map Section */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 dark:border-gray-700/30 overflow-hidden">
            <div className="p-6 border-b border-gray-100 dark:border-gray-700/50">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 dark:bg-purple-900/40 rounded-xl">
                  <Navigation2 className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    Interactive Map
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Your current position with live tracking
                  </p>
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <MapContainer
                latitude={latitude}
                longitude={longitude}
                zoom={16}
                height="500px"
                markerText="📍 You are here!"
                className="rounded-2xl overflow-hidden shadow-lg"
              />
            </div>
          </div>

        </div>
      </div>
    );
  }

  // Fallback state
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="text-center max-w-md">
          <div className="w-24 h-24 mx-auto bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-6">
            <MapPin className="h-12 w-12 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
            No Location Data
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Unable to retrieve location information from your device
          </p>
          <Button onClick={() => window.location.reload()} variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh Page
          </Button>
        </div>
      </div>
    </div>
  );
}