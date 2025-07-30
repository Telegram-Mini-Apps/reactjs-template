import type { ComponentType, JSX } from 'react';
import { MapPin } from 'lucide-react';

import { LocationPage } from '@/pages/LocationPage';

interface Route {
  path: string;
  Component: ComponentType;
  title?: string;
  icon?: JSX.Element;
}

export const routes: Route[] = [
  { 
    path: '/', 
    Component: LocationPage,
    title: 'Location',
    icon: <MapPin className="w-6 h-6" />
  },
];
