import type { ComponentType, JSX } from 'react';
import { MapPin, Plus, User } from 'lucide-react';

import { LocationPage } from '@/pages/LocationPage';
import { AddLocationPage } from '@/pages/AddLocationPage';
import { ProfilePage } from '@/pages/ProfilePage';

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
    title: 'Map',
    icon: <MapPin className="w-6 h-6" />
  },
  { 
    path: '/add-location', 
    Component: AddLocationPage,
    title: 'Add Location',
    icon: <Plus className="w-6 h-6" />
  },
  { 
    path: '/profile', 
    Component: ProfilePage,
    title: 'Profile',
    icon: <User className="w-6 h-6" />
  },
];
