import { MapPin, Navigation, Clock, Target } from 'lucide-react';
import { cn } from '@/utils/cn';
import type { GeolocationState } from '@/hooks/useGeolocation';

interface LocationCardProps {
  location: GeolocationState;
  className?: string;
}

export function LocationCard({ location, className }: LocationCardProps) {
  const { latitude, longitude, accuracy, timestamp, speed } = location;

  if (!latitude || !longitude) {
    return null;
  }

  const formatTimestamp = (ts?: number) => {
    if (!ts) return 'Unknown';
    return new Date(ts).toLocaleTimeString();
  };

  const formatCoordinate = (coord: number) => {
    return coord.toFixed(6);
  };

  return (
    <div className={cn(
      "bg-gradient-to-br from-blue-50 to-white border border-blue-100 rounded-2xl p-6 shadow-lg",
      "dark:from-blue-900/20 dark:to-gray-800 dark:border-blue-800/30",
      className
    )}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-full dark:bg-blue-900/40">
            <MapPin className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              Your Location
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Real-time positioning
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1 text-green-600 dark:text-green-400">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-xs font-medium">Live</span>
        </div>
      </div>

      {/* Coordinates */}
      <div className="grid grid-cols-1 gap-3 mb-4">
        <div className="bg-white/50 dark:bg-gray-800/50 rounded-xl p-4 border border-gray-100 dark:border-gray-700">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Latitude</p>
              <p className="font-mono text-lg font-bold text-gray-900 dark:text-white">
                {formatCoordinate(latitude)}°
              </p>
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Longitude</p>
              <p className="font-mono text-lg font-bold text-gray-900 dark:text-white">
                {formatCoordinate(longitude)}°
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3">
        {/* Accuracy */}
        {accuracy && (
          <div className="text-center p-3 bg-white/50 dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-700">
            <Target className="h-4 w-4 text-blue-600 dark:text-blue-400 mx-auto mb-1" />
            <p className="text-xs text-gray-500 dark:text-gray-400">Accuracy</p>
            <p className="text-sm font-bold text-gray-900 dark:text-white">
              ±{Math.round(accuracy)}m
            </p>
          </div>
        )}

        {/* Speed */}
        <div className="text-center p-3 bg-white/50 dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-700">
          <Navigation className="h-4 w-4 text-blue-600 dark:text-blue-400 mx-auto mb-1" />
          <p className="text-xs text-gray-500 dark:text-gray-400">Speed</p>
          <p className="text-sm font-bold text-gray-900 dark:text-white">
            {speed && speed > 0 ? `${Math.round(speed * 3.6)} km/h` : '0 km/h'}
          </p>
        </div>
      </div>

      {/* Timestamp */}
      <div className="flex items-center justify-center gap-2 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <Clock className="h-4 w-4 text-gray-400" />
        <span className="text-sm text-gray-500 dark:text-gray-400">
          Last updated: {formatTimestamp(timestamp)}
        </span>
      </div>
    </div>
  );
}