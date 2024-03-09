import './Row.css';

import { isRGB } from '@tma.js/sdk';
import type { FC, ReactNode } from 'react';

import { DataTable } from '../DataTable.tsx';
import { RGB } from '../RGB';

export type RowLineValue = ReactNode | RowProps[];

export interface RowProps {
  title: string;
  value: RowLineValue;
}

function valueToNode(value: ReactNode): ReactNode {
  switch (typeof value) {
    case 'string':
      return <code>{isRGB(value) ? <RGB color={value} /> : value}</code>;
    case 'boolean':
      return <code>{value ? 'Yes' : 'No'}</code>;
    default:
      return value === undefined || value === null
        ? <i>empty</i>
        : value;
  }
}

export const Row: FC<RowProps> = ({ title, value }) => {
  return (
    <div className="data-table__row">
      {Array.isArray(value)
        ? <DataTable title={title} rows={value} />
        : (
          <>
            <div className="data-table__row-title">{title}</div>
            <div className="data-table__row-value">
              {valueToNode(value)}
            </div>
          </>
        )}
    </div>
  );
};
