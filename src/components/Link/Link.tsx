import { FC } from 'react';
import { Link as RouterLink, LinkProps } from 'react-router-dom';
import { classNames } from '@tma.js/sdk';

import './Link.css';

export const Link: FC<LinkProps> = (props) => {
  return <RouterLink {...props} className={classNames(props.className, 'link')}/>;
};