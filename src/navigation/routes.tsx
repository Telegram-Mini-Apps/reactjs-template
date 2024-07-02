import type { ComponentType, JSX } from 'react';

import InvitePage from '@/pages/InvitePage/InvitePage.tsx';
import LeaderboardPage from '@/pages/LeaderboardPage/LeaderboardPage.tsx';
import DebugPage from '@/pages/DebugPage/DebugPage.tsx';
import HomePage from '@/pages/HomePage/HomePage.tsx';

interface Route {
  path: string;
  Component: ComponentType;
  title?: string;
  icon?: JSX.Element;
}

export const routes: Route[] = [
  { path: '/', Component: HomePage, title: 'Home Page' },
  { path: '/invite', Component: InvitePage, title: 'Invite Page' },
  { path: '/leaderboard', Component: LeaderboardPage, title: 'Leaderboard' },
  { path: '/debug', Component: DebugPage, title: 'Debug' },
];
