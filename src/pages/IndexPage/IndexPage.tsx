import { Section, Cell, Image, List } from '@telegram-apps/telegram-ui';
import { FC } from 'react';

import { Link } from '@/components/Link/Link.tsx';

import tonSvg from './ton.svg';

import './IndexPage.css';
import { useInitData, useLaunchParams } from '@tma.js/sdk-react';
import useAccessToken, { AccessTokenParams } from '@/hooks/useAccessToken.ts';
import { TelegramWebAppDataUserInput, transformInitData } from '@/utils';

export const IndexPage: FC = () => {
  const initDataRaw = useLaunchParams().initDataRaw;

  const initData = useInitData();
  const transformedAuthDate = initData?.authDate ? Math.floor(initData.authDate.getTime() / 1000) : 0;

  const data: AccessTokenParams = {
    auth_date: transformedAuthDate, // Use the transformed value
    checkDataString: (initDataRaw && transformInitData(initDataRaw)) ?? '',
    hash: initData?.hash ?? '',
    query_id: initData?.queryId ?? '',
    user: {
      id: initData?.user?.id,
      first_name: initData?.user?.firstName,
      last_name: initData?.user?.lastName,
      username: initData?.user?.username || "",
      language_code: initData?.user?.languageCode,
      allows_write_to_pm: initData?.user?.allowsWriteToPm,
    } as TelegramWebAppDataUserInput,
  };

  const { sessionToken } = useAccessToken(data);

  return (
    <List>
      <Section
        header="Features"
        footer="You can use these pages to learn more about features, provided by Telegram Mini Apps and other useful projects"
      >
        <p> TOKEN {sessionToken} </p>
        <pre>{JSON.stringify(data, null, 2)}</pre>
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
