import * as React from 'react';
import { style, classes } from 'typestyle';

export const Row: React.StatelessComponent<RowProps> = (props) => {
  const {
    className,
  } = props;
  return (
    <div
      onClick={props.onClick}
      className={classes(rowStyle, flexPosition(props), className)}
      style={props.style}
    >
      {props.children}
    </div>
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
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

Row.defaultProps = {
  gutter: ['10px 0', '0 .5rem'],
};