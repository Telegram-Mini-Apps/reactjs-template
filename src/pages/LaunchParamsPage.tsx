import { retrieveLaunchParams } from '@telegram-apps/sdk-react';
import { List } from '@telegram-apps/telegram-ui';
import { type FC, useMemo } from 'react';

import { DisplayData } from '@/components/DisplayData/DisplayData.tsx';
import { Page } from '@/components/Page.tsx';

export const LaunchParamsPage: FC = () => {
  const lp = useMemo(() => retrieveLaunchParams(), []);

  return (
    <Page>
      <List>
        <DisplayData
          rows={[
            { title: 'tgWebAppPlatform', value: lp.tgWebAppPlatform },
            { title: 'tgWebAppShowSettings', value: lp.tgWebAppShowSettings },
            { title: 'tgWebAppVersion', value: lp.tgWebAppVersion },
            { title: 'tgWebAppBotInline', value: lp.tgWebAppBotInline },
            { title: 'tgWebAppStartParam', value: lp.tgWebAppStartParam },
            { title: 'tgWebAppData', type: 'link', value: '/init-data' },
            { title: 'tgWebAppThemeParams', type: 'link', value: '/theme-params' },
          ]}
        />
      </List>
    </Page>
  );
};
