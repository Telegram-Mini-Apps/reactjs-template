import { setDebug } from '@tma.js/sdk';
import { DisplayGate, SDKProvider } from '@tma.js/sdk-react';
import { TonConnectUIProvider } from '@tonconnect/ui-react';
import { type FC, useEffect, useMemo } from 'react';

import { App } from '~/components/App/App.tsx';

const Err: FC<{ error: unknown }> = ({ error }) => {
  return (
    <div>
      <p>An error occurred while initializing the SDK</p>
      <blockquote>
        <code>
          {error instanceof Error
            ? error.message
            : JSON.stringify(error)}
        </code>
      </blockquote>
    </div>
  );
};

const Loading: FC = () => {
  return (
    <div>Application is loading</div>
  );
};

export const Root: FC = () => {
  const manifestUrl = useMemo(() => {
    return new URL('tonconnect-manifest.json', window.location.href).toString();
  }, []);

  // Enable debug mode to see all the methods sent and events received.
  useEffect(() => {
    setDebug(true);
  }, []);

  return (
    <TonConnectUIProvider manifestUrl={manifestUrl}>
      <SDKProvider options={{ acceptCustomStyles: true, cssVars: true, complete: true }}>
        <DisplayGate error={Err} loading={Loading} initial={Loading}>
          <App />
        </DisplayGate>
      </SDKProvider>
    </TonConnectUIProvider>
  );
};
