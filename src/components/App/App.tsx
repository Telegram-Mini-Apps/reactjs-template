import {
  createNavigator,
  useBackButtonIntegration,
  useNavigatorIntegration,
} from '@tma.js/react-router-integration';
import { useBackButton, useLaunchParams, useMiniApp } from '@tma.js/sdk-react';
import type { FC } from 'react';
import { useMemo } from 'react';
import {
  Navigate,
  Route,
  Router,
  Routes,
} from 'react-router-dom';
import { AppRoot } from '@xelene/tgui';
import { Platform } from '@xelene/tgui/dist/enums/Platform';
import { isColorDark } from '@tma.js/sdk';

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

  const launchParams = useLaunchParams();
  const miniApp = useMiniApp();
  const backButton = useBackButton();

  const platform = useMemo(() => {
    return ['macos', 'ios'].includes(launchParams.platform) ? Platform.IOS : Platform.Base;
  }, [launchParams]);
  const appearance = useMemo(() => {
    return isColorDark(miniApp.backgroundColor) ? 'dark' : 'light';
  }, [miniApp]);

  useBackButtonIntegration(tmaNavigator, backButton);

  return (
    <AppRoot platform={platform} appearance={appearance} className="app">
      <Router location={location} navigator={navigator}>
        <Inner />
      </Router>
    </AppRoot>
  );
};
