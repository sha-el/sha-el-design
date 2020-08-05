import * as React from 'react';
import { style, classes } from 'typestyle';

export const Row: React.StatelessComponent<RowProps> = (props) => {
  const {
    className,
  } = props;
  return (
    <div
      onClick={props.onClick}
      className={classes(rowStyle, flexPosition(props), className, 'sha-el-row')}
      style={props.style}
    >
      {props.children}
    </div>
  );
};

Row.defaultProps = {
  justifyContent: 'flex-start',
  gutter: ['10px 0', '0 .5rem'],
  wrap: 'wrap',
};

const rowStyle = style({
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'row',
});

const flexPosition = (props: RowProps) => style({
  justifyContent: props.justifyContent,
  alignItems: props.alignItems,
  padding: props.gutter[0],
  flexWrap: props.wrap,
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
  justifyContent?: React.CSSProperties['justifyContent'];
  alignItems?: React.CSSProperties['alignItems'];
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  wrap?: React.CSSProperties['flexWrap'];
}
