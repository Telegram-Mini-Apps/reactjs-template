import { Section, Cell, Image, List } from '@telegram-apps/telegram-ui';
import type { FC } from 'react';
import { MapPin, Navigation2, Plus } from 'lucide-react';

import { Link } from '@/components/Link/Link.tsx';
import { Page } from '@/components/Page.tsx';

import tonSvg from './ton.svg';

export const IndexPage: FC = () => {
  return (
    <Page back={false}>
      <List>
        <Section
          header="Map Features"
          footer="Explore maps with community-driven locations. Add new locations and share your experiences."
        >
          <Link to="/location">
            <Cell
              before={<MapPin size={24} />}
              subtitle="Discover and share places around you"
            >
              Open Map
            </Cell>
          </Link>
          <Link to="/add-location">
            <Cell
              before={<Plus size={24} />}
              subtitle="Add new locations to the community map"
            >
              Add Location
            </Cell>
          </Link>
          <Link to="/profile">
            <Cell
              before={<Navigation2 size={24} />}
              subtitle="View your profile and location history"
            >
              Profile
            </Cell>
          </Link>
        </Section>
        <Section
          header="Integrations"
          footer="Connect with external services and explore advanced features"
        >
          <Link to="/ton-connect">
            <Cell
              before={<Image src={tonSvg} style={{ backgroundColor: '#007AFF' }}/>}
              subtitle="Connect your TON wallet"
            >
              TON Connect
            </Cell>
          </Link>
        </Section>
        <Section
          header="Application Data"
          footer="Technical information about the current app session"
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
    </Page>
  );
};
