import * as React from 'react';
import { style } from 'typestyle';

export const Row: React.StatelessComponent<RowProps> = (props) => {
  return (
    <div className={rowStyle} {...props} />
  );
};

const rowStyle = style({
  boxSizing: 'border-box',
  display: 'flex',
  flex: '0 1 auto',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginRight: '-.5rem',
  marginLeft: '-.5rem',
  padding: '10px 0',
});

export interface RowProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
}