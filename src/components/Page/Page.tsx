import type { FC, PropsWithChildren, ReactNode } from 'react';

import './Page.css';

export interface PageProps extends PropsWithChildren {
  title: string;
  disclaimer?: ReactNode;
}

export const Page: FC<PageProps> = ({ title, children, disclaimer }) => {
  return (
    <div className="page">
      <h1 className="page__title">{title}</h1>
      {disclaimer && <div className="page__disclaimer">{disclaimer}</div>}
      {children}
    </div>
  );
};
