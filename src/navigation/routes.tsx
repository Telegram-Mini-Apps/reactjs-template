import type { ComponentType, JSX } from 'react';

import { Profile, Home, Shop, Product } from '@/pages';

interface Route {
  path: string;
  Component: ComponentType;
  title?: string;
  icon?: JSX.Element;
}

export const routes: Route[] = [
  { path: '/', Component: Home },
  { path: '/profile', Component: Profile },
  { path: '/shop', Component: Shop },
  { path: "/shop/:type/:id", Component: Product },
];
