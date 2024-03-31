import { useThemeParams } from '@tma.js/sdk-react';
import type { FC } from 'react';

import { Page } from '../../components/Page';
import { RGB } from '../../components/RGB';

import './ThemeParamsPage.css';

export const ThemeParamsPage: FC = () => {
  const themeParams = useThemeParams();

  return (
    <Page title="Theme Params">
      <blockquote className="theme-params-page__disclaimer">
        This page displays current theme parameters. It is reactive, so, changing theme
        externally will lead to this page updates.
      </blockquote>
      {Object
        .entries(themeParams.getState())
        .map(([title, value]) => (
          <div className="theme-params-page__line" key={title}>
            <span className="theme-params-page__line-title">
              {title
                .replace(/[A-Z]/g, (m) => `_${m.toLowerCase()}`)}
            </span>
            {value ? <RGB color={value} /> : <i>empty</i>}
          </div>
        ))}
    </Page>
  );
};
