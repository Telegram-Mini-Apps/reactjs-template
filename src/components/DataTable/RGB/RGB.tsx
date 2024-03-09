import './RGB.css';

import type { RGB as RGBType } from '@tma.js/sdk';
import type { FC } from 'react';

interface RGBProps {
  color: RGBType;
}

export const RGB: FC<RGBProps> = ({ color }) => (
  <div className="data-table__rgb">
    <div className="data-table__rgb-icon" style={{ backgroundColor: color }} />
    {color}
  </div>
);
