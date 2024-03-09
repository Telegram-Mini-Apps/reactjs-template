import { FC, useMemo } from 'react';
import {
  Route,
  Routes,
  Navigate,
  Router,
} from 'react-router-dom';

import { createNavigator, useNavigator, routes } from '../../navigation';

const Inner: FC = () => {
  return (
    <Routes>
      {routes.map(route => <Route key={route.path} {...route}/>)}
      <Route path="*" element={<Navigate to="/"/>}/>
    </Routes>
  );
};

export const App: FC = () => {
  const tmaNavigator = useMemo(createNavigator, []);
  const [location, navigator] = useNavigator(tmaNavigator);

  return (
    <Router location={location} navigator={navigator}>
      <Inner/>
    </Router>
  );
};