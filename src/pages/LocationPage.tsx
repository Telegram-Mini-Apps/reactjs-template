import { MapPin, RefreshCw, Navigation2, Plus, User, Search } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Button, 
  Cell, 
  Section, 
  List, 
  Modal, 
  Banner, 
  Input,
  FixedLayout,
} from '@telegram-apps/telegram-ui';
import { useGeolocation } from '@/hooks/useGeolocation';
import { MapContainer } from '@/components/Map/MapContainer';
import { Page } from '@/components/Page';

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
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [showBotInfo, setShowBotInfo] = useState(true);
  
  const location = useGeolocation({
    enableHighAccuracy: true,
    timeout: 15000,
    maximumAge: 60000,
  });

  const { loading, error, latitude, longitude } = location;
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
      <Page>
        <Banner
          header="Finding Your Location"
          subheader="Please allow location access when prompted by your browser"
        />
        <List>
          <Section>
            <Cell
              before={<Navigation2 size={24} />}
              subtitle="GPS signal scanning..."
            >
              Getting location
            </Cell>
          </Section>
        </List>
      </Page>
    );
  }

  // Error state - show search instead
  if (error && !mapCenter) {
    return (
      <Page>
        <Banner
          header="Search for a Location"
          subheader="Location access is disabled. Search for a place to get started."
        />
        
        <List>
          <Section>
            <Cell>
              <Input
                header="Search location"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="Search for a city or place..."
              />
            </Cell>
          </Section>
          
          <Section>
            <Cell
              Component="button"
              onClick={handleSearch}
              disabled={isSearching}
              before={isSearching ? <RefreshCw size={20} className="animate-spin" /> : <Search size={20} />}
            >
              {isSearching ? 'Searching...' : 'Search'}
            </Cell>
            <Cell
              Component="button"
              onClick={() => window.location.reload()}
              before={<RefreshCw size={20} />}
            >
              Try Location Again
            </Cell>
          </Section>
        </List>
      </Page>
    );
  }

  // Success state with location or search result
  if ((latitude && longitude) || mapCenter) {
    const displayLat = mapCenter?.lat || latitude!;
    const displayLng = mapCenter?.lng || longitude!;
    
    return (
      <>
        <Page>
          {/* Bot Info Modal - similar to your screenshots */}
          {showBotInfo && (
            <Modal
              header="What this bot can do"
              trigger={undefined}
              open={showBotInfo}
              onOpenChange={setShowBotInfo}
            >
              <List>
                <Section>
                  <Cell
                    before="🗺️"
                    after="✓"
                    subtitle="Explore maps with community-driven locations. Add new locations and leave comments and feedback."
                  >
                    Explore cities
                  </Cell>
                  <Cell
                    before="📍"
                    after="100"
                    subtitle="Create events and rate your experiences. Click here to run it."
                  >
                    Share your location
                  </Cell>
                  <Cell
                    before="➕"
                    after="100"
                    subtitle="Create events and rate your experiences. Click here to run it."
                  >
                    Add locations
                  </Cell>
                </Section>
              </List>
            </Modal>
          )}

          {/* Location Sharing Modal */}
          {showLocationModal && (
            <Modal
              header="Share your location ?"
              trigger={undefined}
              open={showLocationModal}
              onOpenChange={setShowLocationModal}
            >
              <div style={{ padding: '16px', textAlign: 'center' }}>
                <div style={{ marginBottom: '24px' }}>
                  <Button
                    size="l"
                    stretched
                    onClick={() => {
                      setShowLocationModal(false);
                      // Handle location sharing
                    }}
                  >
                    Yes
                  </Button>
                </div>
                <Button
                  mode="plain"
                  size="l"
                  stretched
                  onClick={() => setShowLocationModal(false)}
                >
                  Cancel
                </Button>
              </div>
            </Modal>
          )}

          {/* Search Input */}
          <List>
            <Section>
              <Cell>
                <Input
                  header="Search location"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  placeholder="Search for places..."
                />
              </Cell>
            </Section>
          </List>

          {/* Location Info - only show for GPS location */}
          {latitude && longitude && (
            <List>
              <Section header="Current Location">
                <Cell
                  before={<MapPin size={20} />}
                  subtitle={`${displayLat.toFixed(6)}, ${displayLng.toFixed(6)}`}
                  after={latitude && longitude ? "📍 GPS" : undefined}
                >
                  Your Position
                </Cell>
              </Section>
            </List>
          )}
          
          {/* Map Section */}
          <List>
            <Section header={`Interactive Map - ${locations.length} places`}>
              <Cell>
                <div style={{ width: '100%', height: '400px' }}>
                  <MapContainer
                    latitude={displayLat}
                    longitude={displayLng}
                    zoom={mapCenter ? 13 : 16}
                    height="400px"
                    markerText={latitude && longitude ? "📍 You are here!" : "📍 Search location"}
                  />
                </div>
              </Cell>
            </Section>
          </List>

          {/* Action Buttons */}
          <List>
            <Section>
              <Cell
                Component="button"
                onClick={() => setShowLocationModal(true)}
                before={<MapPin size={20} />}
              >
                Share your location
              </Cell>
              <Cell
                Component="button"
                onClick={openAddLocation}
                before={<Plus size={20} />}
              >
                Add locations
              </Cell>
              <Cell
                Component="button"
                onClick={openProfile}
                before={<User size={20} />}
              >
                Profile
              </Cell>
            </Section>
          </List>

          {/* Recent Locations List */}
          {locations.length > 0 && (
            <List>
              <Section header="Recent Locations">
                {locations.slice(0, 5).map((loc) => (
                  <Cell
                    key={loc.id}
                    before={<MapPin size={20} />}
                    subtitle={`${loc.category.replace('-', ' ')} • ${new Date(loc.created_at).toLocaleDateString()}`}
                  >
                    {loc.name}
                  </Cell>
                ))}
              </Section>
            </List>
          )}
        </Page>
        
        {/* Bottom Action Buttons */}
        <FixedLayout vertical="bottom">
          <div style={{ padding: '12px', display: 'flex', gap: '8px' }}>
            <Button
              size="l"
              stretched
              onClick={() => navigate('/map')}
            >
              Open Map
            </Button>
            <Button
              size="l"
              stretched
              onClick={() => setShowBotInfo(true)}
            >
              Explore cities
            </Button>
          </div>
        </FixedLayout>
      </>
    );
  }

  // Fallback state
  return (
    <Page>
      <Banner
        header="No Location Data"
        subheader="Unable to retrieve location information from your device"
      />
      <List>
        <Section>
          <Cell
            Component="button"
            onClick={() => window.location.reload()}
            before={<RefreshCw size={20} />}
          >
            Refresh Page
          </Cell>
        </Section>
      </List>
    </Page>
  );
}