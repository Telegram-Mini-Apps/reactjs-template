import { useEffect, useRef, useState } from 'react';

interface InteractiveMapProps {
  latitude: number;
  longitude: number;
  zoom?: number;
  height?: string;
  onMapClick?: (lat: number, lng: number) => void;
}

export function InteractiveMap({ 
  latitude, 
  longitude, 
  zoom = 13, 
  height = "400px",
  onMapClick 
}: InteractiveMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mapState, setMapState] = useState({
    centerLat: latitude,
    centerLng: longitude,
    zoom: zoom,
    offsetX: 0,
    offsetY: 0
  });
  const [isDragging, setIsDragging] = useState(false);
  const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 });
  const tileCache = useRef<Map<string, HTMLImageElement>>(new Map());

  // Map projection functions
  const rad2deg = (rad: number) => rad * (180 / Math.PI);

  const latLngToPixel = (lat: number, lng: number, zoom: number) => {
    const x = (lng + 180) / 360 * Math.pow(2, zoom) * 256;
    const y = (1 - Math.log(Math.tan(lat * Math.PI / 180) + 1 / Math.cos(lat * Math.PI / 180)) / Math.PI) / 2 * Math.pow(2, zoom) * 256;
    return { x, y };
  };

  const pixelToLatLng = (x: number, y: number, zoom: number) => {
    const lng = (x / (Math.pow(2, zoom) * 256)) * 360 - 180;
    const n = Math.PI - 2 * Math.PI * (y / (Math.pow(2, zoom) * 256));
    const lat = rad2deg(Math.atan(0.5 * (Math.exp(n) - Math.exp(-n))));
    return { lat, lng };
  };

  const latLngToTile = (lat: number, lng: number, zoom: number) => {
    const x = Math.floor((lng + 180) / 360 * Math.pow(2, zoom));
    const y = Math.floor((1 - Math.log(Math.tan(lat * Math.PI / 180) + 1 / Math.cos(lat * Math.PI / 180)) / Math.PI) / 2 * Math.pow(2, zoom));
    return { x, y };
  };

  const loadTile = async (tileX: number, tileY: number, zoom: number): Promise<HTMLImageElement | null> => {
    const tileKey = `${zoom}/${tileX}/${tileY}`;
    
    if (tileCache.current.has(tileKey)) {
      return tileCache.current.get(tileKey)!;
    }

    return new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      
      img.onload = () => {
        tileCache.current.set(tileKey, img);
        resolve(img);
      };
      
      img.onerror = () => {
        resolve(null);
      };
      
      const tileServers = [
        `https://tile.openstreetmap.org/${zoom}/${tileX}/${tileY}.png`,
        `https://a.tile.opentopomap.org/${zoom}/${tileX}/${tileY}.png`
      ];
      
      img.src = tileServers[0];
    });
  };

  const drawMap = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    // Clear canvas
    ctx.fillStyle = '#a0c4ff';
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    // Calculate center pixel coordinates
    const centerPixel = latLngToPixel(mapState.centerLat, mapState.centerLng, mapState.zoom);
    const centerTile = latLngToTile(mapState.centerLat, mapState.centerLng, mapState.zoom);

    // Calculate how many tiles we need to cover the canvas
    const tilesX = Math.ceil(canvasWidth / 256) + 2;
    const tilesY = Math.ceil(canvasHeight / 256) + 2;

    // Draw tiles
    const tilePromises: Promise<void>[] = [];
    
    for (let dx = -Math.ceil(tilesX / 2); dx <= Math.ceil(tilesX / 2); dx++) {
      for (let dy = -Math.ceil(tilesY / 2); dy <= Math.ceil(tilesY / 2); dy++) {
        const tileX = centerTile.x + dx;
        const tileY = centerTile.y + dy;

        if (tileX < 0 || tileY < 0 || tileX >= Math.pow(2, mapState.zoom) || tileY >= Math.pow(2, mapState.zoom)) {
          continue;
        }

        const promise = loadTile(tileX, tileY, mapState.zoom).then((img) => {
          if (img) {
            const tilePixelX = tileX * 256;
            const tilePixelY = tileY * 256;
            
            const drawX = (canvasWidth / 2) + (tilePixelX - centerPixel.x) + mapState.offsetX;
            const drawY = (canvasHeight / 2) + (tilePixelY - centerPixel.y) + mapState.offsetY;

            ctx.drawImage(img, drawX, drawY, 256, 256);
          } else {
            // Fallback colored square
            ctx.fillStyle = `hsl(${(tileX + tileY) * 30 % 360}, 40%, 70%)`;
            const tilePixelX = tileX * 256;
            const tilePixelY = tileY * 256;
            
            const drawX = (canvasWidth / 2) + (tilePixelX - centerPixel.x) + mapState.offsetX;
            const drawY = (canvasHeight / 2) + (tilePixelY - centerPixel.y) + mapState.offsetY;
            
            ctx.fillRect(drawX, drawY, 256, 256);
          }
        });

        tilePromises.push(promise);
      }
    }

    // Wait for all tiles to load, then draw marker
    Promise.all(tilePromises).then(() => {
      // Draw center marker
      ctx.fillStyle = '#ff4444';
      ctx.beginPath();
      ctx.arc(canvasWidth / 2, canvasHeight / 2, 8, 0, 2 * Math.PI);
      ctx.fill();
      ctx.strokeStyle = 'white';
      ctx.lineWidth = 3;
      ctx.stroke();
    });
  };

  // Mouse/Touch event handlers
  const getEventPosition = (e: React.MouseEvent | React.TouchEvent) => {
    if ('touches' in e) {
      return { x: e.touches[0]?.clientX || 0, y: e.touches[0]?.clientY || 0 };
    }
    return { x: e.clientX, y: e.clientY };
  };

  const handleStart = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    const pos = getEventPosition(e);
    setIsDragging(true);
    setLastMousePos(pos);
  };

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    e.preventDefault();

    const pos = getEventPosition(e);
    const deltaX = pos.x - lastMousePos.x;
    const deltaY = pos.y - lastMousePos.y;

    setMapState(prev => ({
      ...prev,
      offsetX: prev.offsetX + deltaX,
      offsetY: prev.offsetY + deltaY
    }));

    setLastMousePos(pos);
  };

  const handleEnd = () => {
    if (isDragging) {
      // Convert offset to new center coordinates
      const canvas = canvasRef.current;
      if (canvas) {
        const centerPixel = latLngToPixel(mapState.centerLat, mapState.centerLng, mapState.zoom);
        const newCenterPixelX = centerPixel.x - mapState.offsetX;
        const newCenterPixelY = centerPixel.y - mapState.offsetY;
        const newCenter = pixelToLatLng(newCenterPixelX, newCenterPixelY, mapState.zoom);

        setMapState(prev => ({
          ...prev,
          centerLat: newCenter.lat,
          centerLng: newCenter.lng,
          offsetX: 0,
          offsetY: 0
        }));
      }
    }
    setIsDragging(false);
  };

  const handleMapClick = (e: React.MouseEvent) => {
    if (isDragging || !onMapClick) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    // Convert click position to world coordinates
    const centerPixel = latLngToPixel(mapState.centerLat, mapState.centerLng, mapState.zoom);
    const worldX = centerPixel.x + (clickX - canvas.width / 2) - mapState.offsetX;
    const worldY = centerPixel.y + (clickY - canvas.height / 2) - mapState.offsetY;
    
    const clickCoords = pixelToLatLng(worldX, worldY, mapState.zoom);
    
    onMapClick(clickCoords.lat, clickCoords.lng);
  };

  const handleZoom = (delta: number) => {
    setMapState(prev => ({
      ...prev,
      zoom: Math.max(1, Math.min(18, prev.zoom + delta)),
      offsetX: 0,
      offsetY: 0
    }));
  };

  // Update map state when props change
  useEffect(() => {
    setMapState(prev => ({
      ...prev,
      centerLat: latitude,
      centerLng: longitude,
      zoom: zoom
    }));
  }, [latitude, longitude, zoom]);

  // Redraw map when state changes
  useEffect(() => {
    drawMap();
  }, [mapState]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Set canvas size
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    drawMap();
  }, []);

  return (
    <div 
      ref={containerRef}
      style={{ 
        width: '100%', 
        height: height,
        position: 'relative',
        overflow: 'hidden',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          cursor: isDragging ? 'grabbing' : 'grab',
          touchAction: 'none'
        }}
        onMouseDown={handleStart}
        onMouseMove={handleMove}
        onMouseUp={handleEnd}
        onMouseLeave={handleEnd}
        onTouchStart={handleStart}
        onTouchMove={handleMove}
        onTouchEnd={handleEnd}
        onClick={handleMapClick}
      />
      
      {/* Coordinates display */}
      <div style={{
        position: 'absolute',
        top: '8px',
        left: '8px',
        background: 'var(--tg-theme-bg-color, rgba(255,255,255,0.95))',
        color: 'var(--tg-theme-text-color, #000)',
        padding: '6px 10px',
        borderRadius: '12px',
        fontSize: '11px',
        fontFamily: 'monospace',
        zIndex: 1000,
        border: '1px solid var(--tg-theme-section-separator-color, rgba(0,0,0,0.1))',
        backdropFilter: 'blur(10px)'
      }}>
        📍 {mapState.centerLat.toFixed(4)}, {mapState.centerLng.toFixed(4)}
        <br/>
        🔍 Zoom: {mapState.zoom}
      </div>

      {/* Zoom controls */}
      <div style={{
        position: 'absolute',
        bottom: '8px',
        right: '8px',
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
        zIndex: 1000
      }}>
        <button
          onClick={() => handleZoom(1)}
          style={{
            width: '40px', 
            height: '40px', 
            background: 'var(--tg-theme-button-color, #0088cc)', 
            color: 'var(--tg-theme-button-text-color, white)',
            border: 'none', 
            borderRadius: '12px', 
            cursor: 'pointer', 
            fontSize: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
          }}
        >
          +
        </button>
        <button
          onClick={() => handleZoom(-1)}
          style={{
            width: '40px', 
            height: '40px', 
            background: 'var(--tg-theme-button-color, #0088cc)', 
            color: 'var(--tg-theme-button-text-color, white)',
            border: 'none', 
            borderRadius: '12px', 
            cursor: 'pointer', 
            fontSize: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
          }}
        >
          −
        </button>
      </div>
    </div>
  );
}