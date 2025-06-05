import React from 'react';
import ReactDOM from 'react-dom/client';
import { StrictMode } from 'react';
import { retrieveLaunchParams } from '@telegram-apps/sdk-react';

import { Root } from '@/components/Root.tsx';
import { EnvUnsupported } from '@/components/EnvUnsupported.tsx';
import { init } from '@/init.ts';

const root = ReactDOM.createRoot(document.getElementById('root')!);

async function start() {
  try {
    console.log('Retrieve launch params');
    const launchParams = retrieveLaunchParams();
    console.log('Launch params:', launchParams);

    const { tgWebAppPlatform: platform } = launchParams;
    const debug = (launchParams.tgWebAppStartParam || '').includes('platformer_debug') || import.meta.env.DEV;

    console.log('Init app');
    await init({
      debug,
      eruda: debug && ['ios', 'android'].includes(platform),
      mockForMacOS: platform === 'macos',
    });
    console.log('Render Root');
    root.render(
      <StrictMode>
        <Root />
      </StrictMode>,
    );
  } catch (e) {
    console.error('Ошибка инициализации или рендера:', e);
    root.render(<EnvUnsupported />);
  }
}

start();
