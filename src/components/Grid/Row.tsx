import * as React from 'react';
import { style } from 'typestyle';

export const Row: React.StatelessComponent<RowProps> = (props) => {
  return (
    <div className={rowStyle} {...props} />
  );
};

const rowStyle = style({
  display: 'block',
  margin: '5px 0',
  gridColumnGap: '5px',
});

export interface RowProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
}