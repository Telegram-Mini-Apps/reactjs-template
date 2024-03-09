import { FC, ReactNode } from 'react';
import { isRGB } from '@tma.js/sdk';

import { DataTable } from '../DataTable.tsx';
import { RGB } from '../RGB';

import './Row.css';

export type RowLineValue = ReactNode | RowProps[];

export interface RowProps {
  title: string;
  value: RowLineValue;
}

function valueToNode(value: ReactNode): ReactNode {
  if (value === undefined || value === null) {
    return <i>empty</i>;
  }

  switch (typeof value) {
    case 'string':
      return <code>{isRGB(value) ? <RGB color={value}/> : value}</code>;
    case 'boolean':
      return <code>{value ? 'Yes' : 'No'}</code>;
  }

  return value;
}

export const Row: FC<RowProps> = ({ title, value }) => {
  return (
    <div className="data-table__row">
      {Array.isArray(value)
        ? <DataTable title={title} rows={value}/>
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