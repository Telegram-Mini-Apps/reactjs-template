import { useEffect, useRef } from 'react';

interface BasicMapProps {
  latitude: number;
  longitude: number;
  zoom?: number;
  height?: string;
  onMapClick?: (lat: number, lng: number) => void;
}

export function BasicMap({ 
  latitude, 
  longitude, 
  zoom = 13, 
  height = "400px",
  onMapClick 
}: BasicMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    console.log('🗺️ Creating basic offline map');

    const container = containerRef.current;
    container.innerHTML = '';
    
    // Create canvas-based real map
    const canvas = document.createElement('canvas');
    canvas.width = 400;
    canvas.height = 400;
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.cursor = 'crosshair';
    canvas.style.background = '#a0c4ff';
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Convert lat/lng to tile coordinates
    const latLngToTile = (lat: number, lng: number, zoom: number) => {
      const x = Math.floor((lng + 180) / 360 * Math.pow(2, zoom));
      const y = Math.floor((1 - Math.log(Math.tan(lat * Math.PI / 180) + 1 / Math.cos(lat * Math.PI / 180)) / Math.PI) / 2 * Math.pow(2, zoom));
      return { x, y };
    };

    const centerTile = latLngToTile(latitude, longitude, zoom);
    const tileSize = 256;
    
    // Load tiles around center
    let tilesLoaded = 0;
    const totalTiles = 9; // 3x3 grid
    
    for (let dx = -1; dx <= 1; dx++) {
      for (let dy = -1; dy <= 1; dy++) {
        const tileX = centerTile.x + dx;
        const tileY = centerTile.y + dy;
        
        if (tileX < 0 || tileY < 0 || tileX >= Math.pow(2, zoom) || tileY >= Math.pow(2, zoom)) {
          tilesLoaded++;
          continue;
        }

        const img = new Image();
        img.crossOrigin = 'anonymous';
        
        img.onload = () => {
          // Draw tiles at proper size - each tile is 256px, draw them adjacent
          const drawX = (dx + 1) * (tileSize / 3);
          const drawY = (dy + 1) * (tileSize / 3);
          
          // Scale tiles to fit canvas properly
          const scaledTileSize = 400 / 3; // Canvas is 400px, show 3x3 tiles
          
          ctx.drawImage(img, 
            drawX - scaledTileSize/2, 
            drawY - scaledTileSize/2, 
            scaledTileSize, 
            scaledTileSize
          );
          
          tilesLoaded++;
          console.log(`🟢 Real tile loaded: ${tilesLoaded}/${totalTiles}`);
          
          if (tilesLoaded === totalTiles) {
            // Draw marker on top
            ctx.fillStyle = '#ff4444';
            ctx.beginPath();
            ctx.arc(200, 200, 8, 0, 2 * Math.PI);
            ctx.fill();
            ctx.strokeStyle = 'white';
            ctx.lineWidth = 3;
            ctx.stroke();
          }
        };
        
        img.onerror = () => {
          // Fallback to colored square if tile fails
          ctx.fillStyle = `hsl(${(tileX + tileY) * 30 % 360}, 40%, 70%)`;
          const drawX = (dx + 1) * (tileSize / 3);
          const drawY = (dy + 1) * (tileSize / 3);
          const scaledTileSize = 400 / 3;
          
          ctx.fillRect(
            drawX - scaledTileSize/2, 
            drawY - scaledTileSize/2, 
            scaledTileSize, 
            scaledTileSize
          );
          
          tilesLoaded++;
          console.log(`🟡 Tile fallback: ${tilesLoaded}/${totalTiles}`);
        };
        
        // Try multiple tile servers in order of reliability
        const tileServers = [
          `https://tile.openstreetmap.org/${zoom}/${tileX}/${tileY}.png`,
          `https://a.tile.opentopomap.org/${zoom}/${tileX}/${tileY}.png`,
          `https://tiles.wmflabs.org/osm/${zoom}/${tileX}/${tileY}.png`
        ];
        
        img.src = tileServers[0];
      }
    }


    // Add coordinates display
    const coordsDiv = document.createElement('div');
    coordsDiv.style.cssText = `
      position: absolute;
      top: 10px;
      left: 10px;
      background: rgba(0,0,0,0.8);
      color: white;
      padding: 8px 12px;
      border-radius: 6px;
      font-size: 12px;
      font-family: monospace;
      z-index: 1000;
    `;
    coordsDiv.innerHTML = `
      📍 ${latitude.toFixed(6)}, ${longitude.toFixed(6)}<br>
      🔍 Zoom: ${zoom}<br>
      🗺️ Interactive Map (Demo)
    `;

    // Add zoom controls
    const controls = document.createElement('div');
    controls.style.cssText = `
      position: absolute;
      top: 10px;
      right: 10px;
      display: flex;
      flex-direction: column;
      gap: 2px;
      z-index: 1000;
    `;

    const zoomIn = document.createElement('button');
    zoomIn.textContent = '+';
    zoomIn.style.cssText = `
      width: 30px; height: 30px; background: rgba(0,0,0,0.8); color: white;
      border: none; border-radius: 4px; cursor: pointer; font-size: 18px;
    `;
    zoomIn.onclick = () => console.log('🔍 Zoom in clicked');

    const zoomOut = document.createElement('button');
    zoomOut.textContent = '−';
    zoomOut.style.cssText = `
      width: 30px; height: 30px; background: rgba(0,0,0,0.8); color: white;
      border: none; border-radius: 4px; cursor: pointer; font-size: 18px;
    `;
    zoomOut.onclick = () => console.log('🔍 Zoom out clicked');

    controls.appendChild(zoomIn);
    controls.appendChild(zoomOut);

    // Add click handler
    if (onMapClick) {
      canvas.addEventListener('click', (e) => {
        const rect = canvas.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 400;
        const y = ((e.clientY - rect.top) / rect.height) * 400;
        
        // Simple coordinate conversion (demo purposes)
        const clickLat = latitude + ((200 - y) * 0.001);
        const clickLng = longitude + ((x - 200) * 0.001);
        
        console.log('🗺️ Map clicked:', { x, y, lat: clickLat, lng: clickLng });
        onMapClick(clickLat, clickLng);
      });
    }

    // Assemble the map
    const wrapper = document.createElement('div');
    wrapper.style.cssText = `
      position: relative;
      width: 100%;
      height: 100%;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    `;

    wrapper.appendChild(canvas);
    wrapper.appendChild(coordsDiv);
    wrapper.appendChild(controls);
    container.appendChild(wrapper);

    console.log('🟢 Basic offline map created successfully');

  }, [latitude, longitude, zoom]);

  return (
    <div 
      ref={containerRef}
      style={{ 
        width: '100%', 
        height: height,
        position: 'relative'
      }}
    />
  );
}