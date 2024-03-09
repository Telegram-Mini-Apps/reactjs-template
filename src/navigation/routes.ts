import type { ComponentType } from 'react';

import { IndexPage } from '../pages/IndexPage';
import { InitDataPage } from '../pages/InitDataPage';
import { LaunchParamsPage } from '../pages/LaunchParamsPage';
import { ThemeParamsPage } from '../pages/ThemeParamsPage';
import { TONConnectPage } from '../pages/TONConnectPage';

interface Route {
  path: string;
  Component: ComponentType;
  title?: string;
}

export const routes: Route[] = [
  { path: '/', Component: IndexPage },
  { path: '/init-data', Component: InitDataPage, title: 'Init Data' },
  { path: '/theme-params', Component: ThemeParamsPage, title: 'Theme Params' },
  { path: '/launch-params', Component: LaunchParamsPage, title: 'Launch Params' },
  { path: '/ton-connect', Component: TONConnectPage, title: 'TON Connect' },
];
