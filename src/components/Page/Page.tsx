import './Page.css';

import type { FC, PropsWithChildren } from 'react';
import { LargeTitle } from '@xelene/tgui';

export const Page: FC<PropsWithChildren<{ title: string }>> = ({ title, children }) => {
  return (
    <div className="page">
      <LargeTitle className="page__title">{title}</LargeTitle>
      {children}
    </div>
  );
};
