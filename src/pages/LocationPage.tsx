import { MapPin, RefreshCw, Navigation2, Search } from 'lucide-react';
import { useState, useEffect } from 'react';
import { 
  Button, 
  Cell, 
  Section, 
  List, 
  Modal, 
  Banner, 
  Input,
  Avatar,
  IconButton
} from '@telegram-apps/telegram-ui';
import { initDataState, useSignal } from '@telegram-apps/sdk-react';
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
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [clickedLocation, setClickedLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [showAddLocationModal, setShowAddLocationModal] = useState(false);
  const [newLocationName, setNewLocationName] = useState('');
  const [newLocationDescription, setNewLocationDescription] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [userProfile, setUserProfile] = useState<any>(null);
  
  const initDataState_ = useSignal(initDataState);
  const telegramUser = initDataState_?.user;
  
  const location = useGeolocation({
    enableHighAccuracy: true,
    timeout: 15000,
    maximumAge: 60000,
  });

  const { loading, error, latitude, longitude } = location;
  
  const getUserInitials = () => {
    if (telegramUser?.first_name) {
      return telegramUser.first_name.charAt(0).toUpperCase();
    }
    return 'U';
  };

  useEffect(() => {
    loadLocations();
    if (telegramUser) {
      loadUserProfile();
    }
  }, [telegramUser]);

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

  const loadUserProfile = async () => {
    try {
      const response = await fetch(`/api/proxy/users/${telegramUser?.id}`);
      if (response.ok) {
        const data = await response.json();
        setUserProfile(data);
        setAvatarUrl(data.avatar_url || '');
      } else if (response.status === 404) {
        // Create user if not exists
        await createUser();
      }
    } catch (error) {
      console.error('Error loading user profile:', error);
    }
  };

  const createUser = async () => {
    if (!telegramUser) return;
    
    try {
      const response = await fetch(`/api/proxy/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          telegramId: telegramUser?.id?.toString(),
          nickname: telegramUser?.first_name + (telegramUser?.last_name ? ` ${telegramUser.last_name}` : ''),
          avatarUrl: null
        })
      });
      
      if (response.ok) {
        const data = await response.json();
        setUserProfile(data);
      }
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  const handleMapClick = (lat: number, lng: number) => {
    setClickedLocation({ lat, lng });
    setShowAddLocationModal(true);
  };

  const handleAddLocation = async () => {
    if (!clickedLocation || !newLocationName.trim() || !userProfile) return;
    
    try {
      const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';
      const response = await fetch(`${BACKEND_URL}/api/locations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: newLocationName,
          description: newLocationDescription,
          latitude: clickedLocation.lat,
          longitude: clickedLocation.lng,
          category: 'user-added',
          userId: userProfile.id
        })
      });
      
      if (response.ok) {
        setShowAddLocationModal(false);
        setNewLocationName('');
        setNewLocationDescription('');
        setClickedLocation(null);
        loadLocations(); // Refresh locations
      }
    } catch (error) {
      console.error('Error adding location:', error);
    }
  };

  const updateUserProfile = async () => {
    if (!userProfile) return;
    
    try {
      const response = await fetch(`/api/proxy/users/update/${userProfile.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          avatar_url: avatarUrl
        })
      });
      
      if (response.ok) {
        setShowProfileModal(false);
        loadUserProfile(); // Refresh user profile
      }
    } catch (error) {
      console.error('Error updating profile:', error);
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
      <Page>
        {/* Profile Modal */}
        {showProfileModal && (
          <Modal
            header="Profile Settings"
            trigger={undefined}
            open={showProfileModal}
            onOpenChange={setShowProfileModal}
          >
            <List>
              <Section>
                <Cell>
                  <Input
                    header="Avatar URL"
                    value={avatarUrl}
                    onChange={(e) => setAvatarUrl(e.target.value)}
                    placeholder="https://example.com/avatar.jpg"
                  />
                </Cell>
              </Section>
            </List>
            <div style={{ padding: '16px', display: 'flex', gap: '8px' }}>
              <Button size="l" stretched onClick={updateUserProfile}>
                Save
              </Button>
              <Button size="l" stretched mode="plain" onClick={() => setShowProfileModal(false)}>
                Cancel
              </Button>
            </div>
          </Modal>
        )}

        {/* Add Location Modal */}
        {showAddLocationModal && clickedLocation && (
          <Modal
            header="Add Location"
            trigger={undefined}
            open={showAddLocationModal}
            onOpenChange={setShowAddLocationModal}
          >
            <List>
              <Section>
                <Cell>
                  <Input
                    header="Location Name"
                    value={newLocationName}
                    onChange={(e) => setNewLocationName(e.target.value)}
                    placeholder="Enter location name"
                  />
                </Cell>
                <Cell>
                  <Input
                    header="Description"
                    value={newLocationDescription}
                    onChange={(e) => setNewLocationDescription(e.target.value)}
                    placeholder="Optional description"
                  />
                </Cell>
                <Cell
                  before={<MapPin size={20} />}
                  subtitle={`Lat: ${clickedLocation.lat.toFixed(6)}, Lng: ${clickedLocation.lng.toFixed(6)}`}
                >
                  Selected Location
                </Cell>
              </Section>
            </List>
            <div style={{ padding: '16px', display: 'flex', gap: '8px' }}>
              <Button size="l" stretched onClick={handleAddLocation} disabled={!newLocationName.trim()}>
                Add Location
              </Button>
              <Button size="l" stretched mode="plain" onClick={() => {
                setShowAddLocationModal(false);
                setNewLocationName('');
                setNewLocationDescription('');
                setClickedLocation(null);
              }}>
                Cancel
              </Button>
            </div>
          </Modal>
        )}

        {/* Header with User Profile */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          padding: '16px',
          borderBottom: '1px solid var(--tg-theme-section-separator-color)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <h1 style={{ margin: 0, fontSize: '20px', fontWeight: '600' }}>OpenFreeMap</h1>
          </div>
          {telegramUser && (
            <IconButton
              size="l"
              onClick={() => setShowProfileModal(true)}
            >
              <Avatar
                size={40}
                src={userProfile?.avatar_url}
                fallbackIcon={getUserInitials()}
              />
            </IconButton>
          )}
        </div>

        {/* Search Input */}
        <List>
          <Section>
            <Cell>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <Input
                  style={{ flex: 1 }}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  placeholder="Search for places..."
                />
                <IconButton
                  size="m"
                  onClick={handleSearch}
                  disabled={isSearching}
                >
                  {isSearching ? <RefreshCw size={20} className="animate-spin" /> : <Search size={20} />}
                </IconButton>
              </div>
            </Cell>
          </Section>
        </List>
        
        {/* Map Section */}
        <List>
          <Section header={`Interactive Map - Click to add locations (${locations.length} places)`}>
            <Cell>
              <div style={{ width: '100%', height: '400px' }}>
                <MapContainer
                  latitude={displayLat}
                  longitude={displayLng}
                  zoom={mapCenter ? 13 : 16}
                  height="400px"
                  markerText={latitude && longitude ? "📍 You are here!" : "📍 Search location"}
                  onMapClick={handleMapClick}
                />
              </div>
            </Cell>
          </Section>
        </List>

        {/* Current Location Info */}
        {latitude && longitude && (
          <List>
            <Section header="Current Location">
              <Cell
                before={<Navigation2 size={20} />}
                subtitle={`${displayLat.toFixed(6)}, ${displayLng.toFixed(6)}`}
                after="📍 GPS"
              >
                Your Position
              </Cell>
            </Section>
          </List>
        )}

        {/* Recent Locations List */}
        {locations.length > 0 && (
          <List>
            <Section header="Recent Locations">
              {locations.slice(0, 10).map((loc) => (
                <Cell
                  key={loc.id}
                  Component="button"
                  before={<MapPin size={20} />}
                  subtitle={`${loc.category.replace('-', ' ')} • ${new Date(loc.created_at).toLocaleDateString()}`}
                  onClick={() => {
                    setMapCenter({ lat: loc.latitude, lng: loc.longitude });
                  }}
                >
                  {loc.name}
                </Cell>
              ))}
            </Section>
          </List>
        )}
      </Page>
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