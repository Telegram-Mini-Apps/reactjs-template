import { Section, Cell, List } from '@telegram-apps/telegram-ui';
import type { FC } from 'react';

import { Link } from '@/components/Link/Link.tsx';

export const IndexPage: FC = () => {
  return (
    <List>
      {/* <Section
        header='Features'
        footer='You can use these pages to learn more about features, provided by Telegram Mini Apps and other useful projects'
      >
        <Link to='/ton-connect'>
          <Cell
            before={<Image src={tonSvg} style={{ backgroundColor: '#007AFF' }}/>}
            subtitle='Connect your TON wallet'
          >
            TON Connect
          </Cell>
        </Link>
      </Section> */}
      <Section
        header='Application pages'
      >
        {/* <Link to='/init-data'>
          <Cell subtitle='User data, chat information, technical data'>Init Data</Cell>
        </Link>
        <Link to='/launch-params'>
          <Cell subtitle='Platform identifier, Mini Apps version, etc.'>Launch Parameters</Cell>
        </Link>
        <Link to='/theme-params'>
          <Cell subtitle='Telegram application palette information'>Theme Parameters</Cell>
        </Link> */}
        <Link to='/home'>
          <Cell>Home</Cell>
        </Link>
        <Link to='/profile'>
          <Cell>profile</Cell>
        </Link>
        <Link to='/shop'>
          <Cell>shop</Cell>
        </Link>
        <Link to='/shop/clothes'>
          <Cell>shop clothes</Cell>
        </Link>
        <Link to='/shop/clothes'>
          <Cell>shop clothes</Cell>
        </Link>
      </Section>
    </List>
  );
};
