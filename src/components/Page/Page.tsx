import { FC, PropsWithChildren } from 'react';

import './Page.css';

export const Page: FC<PropsWithChildren<{ title: string }>> = ({ title, children }) => {
  return (
    <div className="page">
      <h1 className="page__title">{title}</h1>
      {children}
    </div>
  );
};