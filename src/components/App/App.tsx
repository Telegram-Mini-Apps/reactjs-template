import type { FC } from 'react';
import { useMemo } from 'react';
import {
  Navigate,
  Route,
  Router,
  Routes,
} from 'react-router-dom';

import { createNavigator, routes, useNavigator } from '../../navigation';

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
  const [location, navigator] = useNavigator(tmaNavigator);

  return (
    <Router location={location} navigator={navigator}>
      <Inner />
    </Router>
  );
};
