import {
  createNavigator,
  useBackButtonIntegration,
  useNavigatorIntegration,
} from '@tma.js/react-router-integration';
import { useBackButton } from '@tma.js/sdk-react';
import type { FC } from 'react';
import { useMemo } from 'react';
import {
  Navigate,
  Route,
  Router,
  Routes,
} from 'react-router-dom';

import { routes } from '../../navigation/routes.ts';

const Inner: FC = () => {
  return (
    <Routes>
      {routes.map((route) => <Route key={route.path} {...route} />)}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export const App: FC = () => {
  const tmaNavigator = useMemo(createNavigator, []);
  const [location, navigator] = useNavigatorIntegration(tmaNavigator);
  const backButton = useBackButton();

  useBackButtonIntegration(tmaNavigator, backButton);

  return (
    <Router location={location} navigator={navigator}>
      <Inner />
    </Router>
  );
};
