import type { ComponentType, JSX } from 'react';

import InvitePage from '@/pages/InvitePage/InvitePage.tsx';
import LeaderboardPage from '@/pages/LeaderboardPage/LeaderboardPage.tsx';
import BoostersPage from '@/pages/BoostersPage/BoostersPage.tsx';
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
  { path: '/boosters', Component: BoostersPage, title: 'Boosters' },
];
