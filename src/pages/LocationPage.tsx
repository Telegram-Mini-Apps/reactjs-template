import { AlertCircle, MapPin, RefreshCw, Navigation2, Plus, User, Search } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGeolocation } from '@/hooks/useGeolocation';
import { MapContainer } from '@/components/Map/MapContainer';
import { LocationCard } from '@/components/LocationCard';
import { Button } from '@/components/ui/Button';
import { TailwindTest } from '@/components/TailwindTest';
import { useTelegram } from '@telegram-apps/sdk-react';

interface Location {
  id: number;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
  category: string;
  created_at: string;
}

export function LocationPage() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [mapCenter, setMapCenter] = useState<{ lat: number; lng: number } | null>(null);
  
  const location = useGeolocation({
    enableHighAccuracy: true,
    timeout: 15000,
    maximumAge: 60000,
  });

  const { loading, error, latitude, longitude } = location;
  const telegram = useTelegram();
  const navigate = useNavigate();

  useEffect(() => {
    loadLocations();
  }, []);

  useEffect(() => {
    if (latitude && longitude && !mapCenter) {
      setMapCenter({ lat: latitude, lng: longitude });
    }
  }, [latitude, longitude, mapCenter]);

  const loadLocations = async () => {
    try {
      const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';
      const response = await fetch(`${BACKEND_URL}/api/locations`);
      if (response.ok) {
        const data = await response.json();
        setLocations(data);
      }
    } catch (error) {
      console.error('Error loading locations:', error);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}&limit=1`
      );
      const results = await response.json();
      
      if (results && results[0]) {
        const { lat, lon } = results[0];
        setMapCenter({ lat: parseFloat(lat), lng: parseFloat(lon) });
      }
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const openAddLocation = () => {
    navigate('/add-location');
  };

  const openProfile = () => {
    navigate('/profile');
  };

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

  // Error state - show search instead
  if (error && !mapCenter) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        {/* Header */}
        <div className="sticky top-0 z-10 backdrop-blur-lg bg-white/80 dark:bg-gray-900/80 border-b border-white/20 dark:border-gray-800/20">
          <div className="max-w-4xl mx-auto p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/40 rounded-xl">
                  <Search className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                    OpenFreeMap
                  </h1>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Search for places to explore
                  </p>
                </div>
              </div>
              <Button onClick={openProfile} variant="outline" size="sm">
                <User className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center min-h-screen p-4">
          <div className="text-center max-w-md">
            <div className="w-24 h-24 mx-auto bg-blue-100 dark:bg-blue-900/40 rounded-full flex items-center justify-center mb-6">
              <Search className="h-12 w-12 text-blue-600 dark:text-blue-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              Search for a Location
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Location access is disabled. Search for a place to get started.
            </p>
            <div className="space-y-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  placeholder="Search for a city or place..."
                  className="flex-1 px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
                <Button onClick={handleSearch} disabled={isSearching} size="lg">
                  {isSearching ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <Search className="h-4 w-4" />
                  )}
                </Button>
              </div>
              <Button
                onClick={() => window.location.reload()}
                variant="outline"
                className="w-full"
                size="lg"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Try Location Again
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Success state with location or search result
  if ((latitude && longitude) || mapCenter) {
    const displayLat = mapCenter?.lat || latitude!;
    const displayLng = mapCenter?.lng || longitude!;
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        {/* Header */}
        <div className="sticky top-0 z-10 backdrop-blur-lg bg-white/80 dark:bg-gray-900/80 border-b border-white/20 dark:border-gray-800/20">
          <div className="max-w-4xl mx-auto p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/40 rounded-xl">
                  <MapPin className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                    OpenFreeMap
                  </h1>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Discover and share places
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button onClick={openProfile} variant="outline" size="sm">
                  <User className="h-4 w-4" />
                </Button>
                {latitude && longitude && (
                  <div className="flex items-center gap-1 px-3 py-1 bg-green-100 dark:bg-green-900/40 rounded-full">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-xs font-medium text-green-700 dark:text-green-300">GPS</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="max-w-4xl mx-auto p-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="Search for places..."
              className="flex-1 px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-900 dark:text-white"
            />
            <Button onClick={handleSearch} disabled={isSearching}>
              {isSearching ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <Search className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto p-4 space-y-6">
          {/* Location Info Card - only show for GPS location */}
          {latitude && longitude && <LocationCard location={location} />}
          
          {/* Map Section */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 dark:border-gray-700/30 overflow-hidden">
            <div className="p-6 border-b border-gray-100 dark:border-gray-700/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 dark:bg-purple-900/40 rounded-xl">
                    <Navigation2 className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                      Interactive Map
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {latitude && longitude ? 'Your current position' : 'Explore locations'}
                    </p>
                  </div>
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {locations.length} places
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <MapContainer
                latitude={displayLat}
                longitude={displayLng}
                zoom={mapCenter ? 13 : 16}
                height="500px"
                markerText={latitude && longitude ? "📍 You are here!" : "📍 Search location"}
                className="rounded-2xl overflow-hidden shadow-lg"
              />
            </div>
          </div>

          {/* Floating Action Button */}
          <div className="fixed bottom-6 right-6 z-20">
            <Button
              onClick={openAddLocation}
              size="lg"
              className="w-14 h-14 rounded-full shadow-2xl bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
            >
              <Plus className="h-6 w-6" />
            </Button>
          </div>

          {/* Locations List */}
          {locations.length > 0 && (
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 dark:border-gray-700/30 p-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                Recent Locations
              </h3>
              <div className="space-y-3">
                {locations.slice(0, 5).map((loc) => (
                  <div key={loc.id} className="flex items-center gap-3 p-3 bg-white/50 dark:bg-gray-700/50 rounded-xl">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/40 rounded-lg">
                      <MapPin className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900 dark:text-white">{loc.name}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400 capitalize">{loc.category.replace('-', ' ')}</div>
                    </div>
                    <div className="text-xs text-gray-400">
                      {new Date(loc.created_at).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
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