import './Link.css';

import { classNames } from '@tma.js/sdk';
import type { FC } from 'react';
import type { LinkProps } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';

export const Link: FC<LinkProps> = ({ className, ...rest }) => {
  return <RouterLink {...rest} className={classNames(className, 'link')} />;
};
