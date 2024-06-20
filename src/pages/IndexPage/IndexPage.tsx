import { Section, Cell, Image, List } from '@telegram-apps/telegram-ui';
import { FC } from 'react';

import { Link } from '@/components/Link/Link.tsx';

import tonSvg from './ton.svg';

import './IndexPage.css';
import { useInitData, useLaunchParams } from '@tma.js/sdk-react';
import useAccessToken from '@/hooks/useAccessToken.ts';
import { TelegramWebAppDataUserInput, transformInitData } from '@/utils';

export const IndexPage: FC = () => {
  const initDataRaw = useLaunchParams().initDataRaw;

  const initData = useInitData();

  useAccessToken({
    query_id: initData?.queryId ?? '',
    user: (initData?.user ?? {}) as TelegramWebAppDataUserInput,
    auth_date: initData?.authDate.getTime() ?? 0,
    hash: initData?.hash ?? '',
    checkDataString: (initDataRaw && transformInitData(initDataRaw)) ?? '',
  });

  return (
    <List>
      <Section
        header="Features"
        footer="You can use these pages to learn more about features, provided by Telegram Mini Apps and other useful projects"
      >
        <Link to="/ton-connect">
          <Cell
            before={<Image src={tonSvg} style={{ backgroundColor: '#007AFF' }} />}
            subtitle="Connect your TON wallet"
          >
            TON Connect
          </Cell>
        </Link>
      </Section>
      <Section
        header="Application Launch Data"
        footer="These pages help developer to learn more about current launch information"
      >
        <Link to="/init-data">
          <Cell subtitle="User data, chat information, technical data">Init Data</Cell>
        </Link>
        <Link to="/launch-params">
          <Cell subtitle="Platform identifier, Mini Apps version, etc.">Launch Parameters</Cell>
        </Link>
        <Link to="/theme-params">
          <Cell subtitle="Telegram application palette information">Theme Parameters</Cell>
        </Link>
      </Section>
    </List>
  );
};
