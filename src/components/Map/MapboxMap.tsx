import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface MapboxMapProps {
  latitude: number;
  longitude: number;
  zoom?: number;
  height?: string;
  onMapClick?: (lat: number, lng: number) => void;
}

export function MapboxMap({ 
  latitude, 
  longitude, 
  zoom = 13, 
  height = "400px",
  onMapClick 
}: MapboxMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    console.log('🗺️ Creating Mapbox GL JS map');

    // Initialize map with free OpenStreetMap style
    const map = new mapboxgl.Map({
      container: mapRef.current,
      style: {
        version: 8,
        sources: {
          'osm-tiles': {
            type: 'raster',
            tiles: [
              'https://a.tile.opentopomap.org/{z}/{x}/{y}.png',
              'https://b.tile.opentopomap.org/{z}/{x}/{y}.png', 
              'https://c.tile.opentopomap.org/{z}/{x}/{y}.png'
            ],
            tileSize: 256,
            attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a>'
          }
        },
        layers: [
          {
            id: 'osm-tiles',
            type: 'raster',
            source: 'osm-tiles'
          }
        ]
      },
      center: [longitude, latitude],
      zoom: zoom,
      attributionControl: true
    });

    // Add navigation controls
    map.addControl(new mapboxgl.NavigationControl());

    // Add marker
    new mapboxgl.Marker()
      .setLngLat([longitude, latitude])
      .setPopup(new mapboxgl.Popup({ offset: 25 })
        .setHTML(`<div>📍 You are here!<br>${latitude.toFixed(6)}, ${longitude.toFixed(6)}</div>`))
      .addTo(map);

    // Add click handler
    if (onMapClick) {
      map.on('click', (e) => {
        onMapClick(e.lngLat.lat, e.lngLat.lng);
      });
    }

    // Debug events
    map.on('sourcedata', (e) => {
      if (e.sourceId === 'osm-tiles' && e.isSourceLoaded) {
        console.log('🟢 Mapbox tiles loaded');
      }
    });

    map.on('error', (e) => {
      console.log('🔴 Mapbox error:', e.error);
    });

    mapInstanceRef.current = map;

    // Cleanup
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update map view when coordinates change
  useEffect(() => {
    if (mapInstanceRef.current) {
      console.log('🗺️ Updating Mapbox map view:', { latitude, longitude, zoom });
      mapInstanceRef.current.flyTo({
        center: [longitude, latitude],
        zoom: zoom,
        duration: 1000
      });
    }
  }, [latitude, longitude, zoom]);

  return (
    <div 
      ref={mapRef}
      style={{ 
        width: '100%', 
        height: height,
        position: 'relative',
        isolation: 'isolate'
      }}
    />
  );
}