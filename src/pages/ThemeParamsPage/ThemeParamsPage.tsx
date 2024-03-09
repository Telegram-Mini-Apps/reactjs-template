import { FC, useMemo } from 'react';
import { useLaunchParams } from '@tma.js/sdk-react';

import { RowProps } from '../../components/DataTable/Row';
import { DataTable } from '../../components/DataTable';
import { Page } from '../../components/Page';

export const ThemeParamsPage: FC = () => {
  const { themeParams } = useLaunchParams();
  const rows = useMemo<RowProps[]>(() => {
    const result: RowProps[] = [];

    for (const key in themeParams) {
      result.push({
        title: key
          .replace(/[a-z][A-Z]/g, (match) => `${match[0]} ${match[1]}`)
          .replace(/^[a-z]/, match => match.toUpperCase()),
        value: themeParams[key]
      });
    }

    return result;
  }, [themeParams]);

  return (
    <Page title="Theme Params">
      <DataTable rows={rows}/>
    </Page>
  );
};