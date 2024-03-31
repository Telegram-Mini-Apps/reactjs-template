import './IndexPage.css';

import type { FC } from 'react';

import { Link } from '../../components/Link';
import { Page } from '../../components/Page/Page';
import { routes } from '../../navigation/routes.tsx';

export const IndexPage: FC = () => {
  return (
    <Page title="Home Page">
      <p>
        This page is a home page in this boilerplate. You can use the links below to visit other
        pages with their own functionality.
      </p>
      <ul className="index-page__links">
        {routes.map(({ path, title, icon }) => title && (
          <li className="index-page__link-item" key={path}>
            <Link className="index-page__link" to={path}>
              {icon && (
                <i className="index-page__link-icon">
                  {icon}
                </i>
              )}
              {title}
            </Link>
          </li>
        ))}
      </ul>
    </Page>
  );
};
