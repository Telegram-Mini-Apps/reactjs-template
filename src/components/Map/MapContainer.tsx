import { useEffect } from 'react';
import { MapContainer as LeafletMapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { cn } from '@/utils/cn';
import 'leaflet/dist/leaflet.css';

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
}

/**
 * Component to update map view when coordinates change
 */
function MapUpdater({ latitude, longitude, zoom }: { latitude: number; longitude: number; zoom: number }) {
  const map = useMap();
  
  useEffect(() => {
    map.setView([latitude, longitude], zoom);
  }, [map, latitude, longitude, zoom]);
  
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
  className,
  showMarker = true,
  markerText = "Your location"
}: MapContainerProps) {
  return (
    <div 
      className={cn("relative overflow-hidden rounded-lg", className)}
      style={{ height }}
    >
      <LeafletMapContainer
        center={[latitude, longitude]}
        zoom={zoom}
        style={{ height: '100%', width: '100%' }}
        zoomControl={true}
        dragging={true}
        touchZoom={true}
        doubleClickZoom={true}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <MapUpdater latitude={latitude} longitude={longitude} zoom={zoom} />
        
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