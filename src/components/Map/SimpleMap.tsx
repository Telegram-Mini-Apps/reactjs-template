import { useEffect, useRef } from 'react';

interface SimpleMapProps {
  latitude: number;
  longitude: number;
  zoom?: number;
  height?: string;
  onMapClick?: (lat: number, lng: number) => void;
}

export function SimpleMap({ 
  latitude, 
  longitude, 
  zoom = 13, 
  height = "400px",
  onMapClick 
}: SimpleMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const tileSize = 256;

  // Convert lat/lng to tile coordinates
  const latLngToTile = (lat: number, lng: number, zoom: number) => {
    const x = Math.floor((lng + 180) / 360 * Math.pow(2, zoom));
    const y = Math.floor((1 - Math.log(Math.tan(lat * Math.PI / 180) + 1 / Math.cos(lat * Math.PI / 180)) / Math.PI) / 2 * Math.pow(2, zoom));
    return { x, y };
  };

  const loadTiles = () => {
    if (!containerRef.current) return;

    console.log('🗺️ Loading simple tile map');

    const container = containerRef.current;
    container.innerHTML = '';
    
    const centerTile = latLngToTile(latitude, longitude, zoom);
    const tilesAround = 2; // Load 2 tiles in each direction
    
    const mapDiv = document.createElement('div');
    mapDiv.style.cssText = `
      position: relative;
      width: 100%;
      height: 100%;
      overflow: hidden;
      background: #a0c4ff;
      cursor: crosshair;
    `;

    // Calculate map center offset
    const containerWidth = parseInt(height) || 400;
    const containerHeight = parseInt(height) || 400;

    for (let dx = -tilesAround; dx <= tilesAround; dx++) {
      for (let dy = -tilesAround; dy <= tilesAround; dy++) {
        const tileX = centerTile.x + dx;
        const tileY = centerTile.y + dy;
        
        if (tileX < 0 || tileY < 0 || tileX >= Math.pow(2, zoom) || tileY >= Math.pow(2, zoom)) {
          continue;
        }

        const img = document.createElement('img');
        img.style.cssText = `
          position: absolute;
          width: ${tileSize}px;
          height: ${tileSize}px;
          left: ${(dx * tileSize) + (containerWidth / 2 - tileSize / 2)}px;
          top: ${(dy * tileSize) + (containerHeight / 2 - tileSize / 2)}px;
          user-select: none;
          pointer-events: none;
        `;
        
        img.src = `https://a.tile.opentopomap.org/${zoom}/${tileX}/${tileY}.png`;
        
        img.onload = () => {
          console.log('🟢 Simple map tile loaded:', img.src);
        };
        
        img.onerror = () => {
          console.log('🔴 Simple map tile error:', img.src);
          img.src = `https://via.placeholder.com/256x256/cccccc/999999?text=No+Tile`;
        };

        mapDiv.appendChild(img);
      }
    }

    // Add marker
    const marker = document.createElement('div');
    marker.style.cssText = `
      position: absolute;
      width: 20px;
      height: 20px;
      background: #ff4444;
      border: 2px solid white;
      border-radius: 50%;
      left: ${containerWidth / 2 - 10}px;
      top: ${containerHeight / 2 - 10}px;
      z-index: 1000;
      box-shadow: 0 2px 6px rgba(0,0,0,0.3);
    `;
    mapDiv.appendChild(marker);

    // Add coordinates display
    const coordsDiv = document.createElement('div');
    coordsDiv.style.cssText = `
      position: absolute;
      top: 10px;
      left: 10px;
      background: rgba(255,255,255,0.9);
      padding: 5px 10px;
      border-radius: 3px;
      font-size: 12px;
      z-index: 1000;
      font-family: monospace;
    `;
    coordsDiv.textContent = `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`;
    mapDiv.appendChild(coordsDiv);

    // Add click handler
    if (onMapClick) {
      mapDiv.addEventListener('click', (e) => {
        const rect = mapDiv.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const clickY = e.clientY - rect.top;
        
        // Simple approximation - not perfect but works for demo
        const offsetX = (clickX - containerWidth / 2) / tileSize;
        const offsetY = (clickY - containerHeight / 2) / tileSize;
        
        const clickLat = latitude - (offsetY * 0.01); // Rough approximation
        const clickLng = longitude + (offsetX * 0.01); // Rough approximation
        
        onMapClick(clickLat, clickLng);
      });
    }

    container.appendChild(mapDiv);
  };

  useEffect(() => {
    loadTiles();
  }, [latitude, longitude, zoom]);

  return (
    <div 
      ref={containerRef}
      style={{ 
        width: '100%', 
        height: height,
        position: 'relative',
        border: '1px solid #ccc',
        borderRadius: '8px',
        overflow: 'hidden'
      }}
    />
  );
}