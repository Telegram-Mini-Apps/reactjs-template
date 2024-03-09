import { useLaunchParams } from '@tma.js/sdk-react';
import type { FC } from 'react';
import { useMemo } from 'react';

import { DataTable } from '../../components/DataTable';
import type { RowProps } from '../../components/DataTable/Row';
import { Link } from '../../components/Link';
import { Page } from '../../components/Page';

export const LaunchParamsPage: FC = () => {
  const lp = useLaunchParams();

  const rows = useMemo<RowProps[]>(() => [
    { title: 'Platform', value: lp.platform },
    { title: 'Show Settings', value: lp.showSettings },
    { title: 'Version', value: lp.version },
    { title: 'Bot Inline', value: lp.botInline },
    { title: 'Start Param', value: lp.showSettings },
    { title: 'Init Data', value: <Link to="/init-data">View</Link> },
    { title: 'Theme Params', value: <Link to="/theme-params">View</Link> },
  ], [lp]);

  return (
    <Page title="Launch Params">
      <DataTable rows={rows} />
    </Page>
  );
};
