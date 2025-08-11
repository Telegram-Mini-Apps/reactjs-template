import { useEffect } from 'react';
import { MapContainer as LeafletMapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';

// Fix for default markers in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface MapContainerProps {
  /**
   * Latitude coordinate for the map center
   */
  latitude: number;
  /**
   * Longitude coordinate for the map center  
   */
  longitude: number;
  /**
   * Zoom level (1-18, where 18 is most zoomed in)
   * @default 13
   */
  zoom?: number;
  /**
   * Height of the map container
   * @default "400px"
   */
  height?: string;
  /**
   * Additional CSS classes for the map container
   */
  className?: string;
  /**
   * Whether to show a marker at the center position
   * @default true
   */
  showMarker?: boolean;
  /**
   * Text to display in the marker popup
   */
  markerText?: string;
  /**
   * Callback function when map is clicked
   */
  onMapClick?: (lat: number, lng: number) => void;
}

/**
 * Component to update map view when coordinates change
 */
function MapUpdater({ latitude, longitude, zoom }: { latitude: number; longitude: number; zoom: number }) {
  const map = useMap();
  
  useEffect(() => {
    console.log('🗺️ MapUpdater setting view:', { latitude, longitude, zoom });
    map.setView([latitude, longitude], zoom);
    
    // Debug map state
    setTimeout(() => {
      const tileContainers = document.querySelectorAll('.leaflet-tile-container');
      const tiles = document.querySelectorAll('.leaflet-tile');
      console.log('🗺️ Map state after update:', {
        center: map.getCenter(),
        zoom: map.getZoom(),
        bounds: map.getBounds(),
        size: map.getSize(),
        ready: (map as any)._loaded,
        tileContainers: tileContainers.length,
        tiles: tiles.length,
        tilesLoaded: Array.from(tiles).filter(t => (t as HTMLImageElement).complete).length
      });
    }, 2000);
  }, [map, latitude, longitude, zoom]);
  
  return null;
}

/**
 * Component to handle map click events
 */
function MapClickHandler({ onMapClick }: { onMapClick?: (lat: number, lng: number) => void }) {
  useMapEvents({
    click: (e) => {
      if (onMapClick) {
        onMapClick(e.latlng.lat, e.latlng.lng);
      }
    }
  });
  
  return null;
}

/**
 * Interactive map component using Leaflet
 * 
 * Displays a map centered on the provided coordinates with optional marker
 * 
 * @example
 * ```tsx
 * <MapContainer 
 *   latitude={40.7128} 
 *   longitude={-74.0060}
 *   zoom={15}
 *   markerText="You are here!"
 *   className="rounded-lg shadow-md"
 * />
 * ```
 */
export function MapContainer({
  latitude,
  longitude,
  zoom = 13,
  height = "400px",
  showMarker = true,
  markerText = "Your location",
  onMapClick
}: MapContainerProps) {
  console.log('🗺️ MapContainer render:', { latitude, longitude, zoom, height, showMarker });
  
  return (
    <div 
      className="map-isolation-wrapper"
      style={{ 
        height, 
        width: '100%', 
        position: 'relative',
        isolation: 'isolate',
        transform: 'translateZ(0)'
      }}
    >
      <LeafletMapContainer
        center={[latitude, longitude]}
        zoom={zoom}
        style={{ 
          height: '100%', 
          width: '100%',
          minHeight: height,
          zIndex: 1
        }}
        zoomControl={true}
        dragging={true}
        touchZoom={true}
        doubleClickZoom={true}
        scrollWheelZoom={true}
      >
        {/* OpenTopoMap - reliable alternative */}
        <TileLayer
          attribution='Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
          url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
          subdomains={['a', 'b', 'c']}
          maxZoom={17}
          errorTileUrl="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=="
          eventHandlers={{
            loading: () => console.log('🟡 OpenTopoMap tiles loading...'),
            load: () => console.log('🟢 OpenTopoMap tiles loaded successfully'),
            tileerror: (e) => console.log('🔴 OpenTopoMap tile error:', e.tile?.src || e),
            tileload: (e) => console.log('🟢 OpenTopoMap tile loaded:', e.tile?.src || 'tile loaded'),
            tileloadstart: (e) => console.log('🔵 OpenTopoMap tile load start:', e.tile?.src || 'tile loading')
          }}
        />
        
        <MapUpdater latitude={latitude} longitude={longitude} zoom={zoom} />
        <MapClickHandler onMapClick={onMapClick} />
        
        {showMarker && (
          <Marker position={[latitude, longitude]}>
            <Popup>
              <div className="text-center">
                <p className="font-medium">{markerText}</p>
                <p className="text-sm text-gray-600">
                  {latitude.toFixed(6)}, {longitude.toFixed(6)}
                </p>
              </div>
            </Popup>
          </Marker>
        )}
      </LeafletMapContainer>
    </div>
  );
}