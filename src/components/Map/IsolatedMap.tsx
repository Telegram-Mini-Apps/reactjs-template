import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface IsolatedMapProps {
  latitude: number;
  longitude: number;
  zoom?: number;
  height?: string;
  onMapClick?: (lat: number, lng: number) => void;
}

export function IsolatedMap({ 
  latitude, 
  longitude, 
  zoom = 13, 
  height = "400px",
  onMapClick 
}: IsolatedMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletMapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || leafletMapRef.current) return;

    console.log('🗺️ Creating isolated Leaflet map');

    // Create map with vanilla Leaflet (no React wrapper)
    const map = L.map(mapRef.current, {
      center: [latitude, longitude],
      zoom: zoom,
      zoomControl: true,
      dragging: true,
      touchZoom: true,
      doubleClickZoom: true,
      scrollWheelZoom: true
    });

    // Add tile layer
    L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
      maxZoom: 17,
      subdomains: ['a', 'b', 'c']
    }).addTo(map);

    // Add marker
    const marker = L.marker([latitude, longitude]).addTo(map);
    marker.bindPopup(`📍 You are here!<br>${latitude.toFixed(6)}, ${longitude.toFixed(6)}`);

    // Add click handler
    if (onMapClick) {
      map.on('click', (e) => {
        onMapClick(e.latlng.lat, e.latlng.lng);
      });
    }

    // Debug events
    map.on('tileload', () => console.log('🟢 Vanilla Leaflet tile loaded'));
    map.on('tileerror', (e) => console.log('🔴 Vanilla Leaflet tile error:', e));

    leafletMapRef.current = map;

    // Cleanup
    return () => {
      if (leafletMapRef.current) {
        leafletMapRef.current.remove();
        leafletMapRef.current = null;
      }
    };
  }, []);

  // Update map view when coordinates change
  useEffect(() => {
    if (leafletMapRef.current) {
      console.log('🗺️ Updating isolated map view:', { latitude, longitude, zoom });
      leafletMapRef.current.setView([latitude, longitude], zoom);
    }
  }, [latitude, longitude, zoom]);

  return (
    <div 
      ref={mapRef}
      style={{ 
        width: '100%', 
        height: height,
        position: 'relative',
        zIndex: 1,
        background: '#f0f0f0'
      }}
    />
  );
}