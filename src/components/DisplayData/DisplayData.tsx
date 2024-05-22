import { isRGB } from '@tma.js/sdk-react';
import {
  Checkbox,
  Section,
  Subheadline,
  Text,
} from '@telegram-apps/telegram-ui';
import type { FC, ReactNode } from 'react';

import { RGB } from '@/components/RGB/RGB.tsx';
import { Link } from '@/components/Link/Link.tsx';

import './DisplayData.css';

export type DisplayDataRow =
  & { title: string }
  & (
  | { type: 'link'; value?: string }
  | { value: ReactNode }
  )

export interface DisplayDataProps {
  header?: ReactNode;
  footer?: ReactNode;
  rows: DisplayDataRow[];
}

export const DisplayData: FC<DisplayDataProps> = ({ header, rows }) => (
  <Section>
    {header && <Section.Header className="display-data__header">
      {header}
    </Section.Header>}
    {rows.map((item, idx) => {
      let valueNode: ReactNode;

      if (item.value === undefined) {
        valueNode = <i>empty</i>;
      } else {
        if ('type' in item) {
          valueNode = <Link to={item.value}>Open</Link>;
        } else if (typeof item.value === 'string') {
          valueNode = isRGB(item.value)
            ? <RGB color={item.value}/>
            : item.value;
        } else if (typeof item.value === 'boolean') {
          valueNode = <Checkbox checked={item.value} disabled/>;
        } else {
          valueNode = item.value;
        }
      }

      return (
        <div className="display-data__line" key={idx}>
          <Subheadline className="display-data__line-title" level={'2'}>{item.title}</Subheadline>
          <Text className="display-data__line-value">{valueNode}</Text>
        </div>
      );
    })}
  </Section>
);
