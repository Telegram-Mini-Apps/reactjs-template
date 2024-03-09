import { FC } from 'react';

import { Row, RowProps } from './Row';

import './DataTable.css';

interface DataTableProps {
  title?: string;
  rows: RowProps[];
}

export const DataTable: FC<DataTableProps> = ({ title, rows }) => {
  return (
    <div className="data-table">
      {title && <div className="data-table__title">{title}</div>}
      {rows.map((line, idx) => <Row key={idx} {...line}/>)}
    </div>
  );
};