import * as React from 'react';
import { style } from 'typestyle';

export const Row: React.StatelessComponent<RowProps> = (props) => {
  return (
    <div className={`${rowStyle} ${flexPosition(props)}`} style={props.style} children={props.children} />
  );
};

Row.defaultProps = {
  justifyContent: 'flex-start',
};

const rowStyle = style({
  boxSizing: 'border-box',
  display: 'flex',
  flex: '0 1 auto',
  flexDirection: 'row',
  flexWrap: 'wrap',
});

const flexPosition = (props: RowProps) => style({
  justifyContent: props.justifyContent,
  alignItems: props.alignItems,
  padding: props.gutter[0],
  $nest: {
    '& .sha-el-col': {
      padding: props.gutter[1],
    },
  },
});

export interface RowProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
  /**
   * Spacing between elements
   * [Row, Col]
   */
  gutter?: [React.CSSProperties['padding'], React.CSSProperties['padding']];
  justifyContent?: 'flex-start' | 'center' | 'flex-end';
  alignItems?: 'center' | 'end' | 'flex-end' | 'flex-start' | 'self-end' | 'self-start' | 'start';
}

Row.defaultProps = {
  gutter: ['10px 0', '0 .5rem'],
};