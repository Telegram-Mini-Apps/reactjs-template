import './DataTable.css';

import type { FC } from 'react';

import type { RowProps } from './Row';
import { Row } from './Row';

interface DataTableProps {
  title?: string;
  rows: RowProps[];
}

export const DataTable: FC<DataTableProps> = ({ title, rows }) => {
  return (
    <div className="data-table">
      {title && <div className="data-table__title">{title}</div>}
      {rows.map((line, idx) => <Row key={idx} {...line} />)}
    </div>
  );
};
