import './Page.css';

import type { FC, PropsWithChildren } from 'react';

export const Page: FC<PropsWithChildren<{ title: string }>> = ({ title, children }) => {
  return (
    <div className="page">
      <h1 className="page__title">{title}</h1>
      {children}
    </div>
  );
};
