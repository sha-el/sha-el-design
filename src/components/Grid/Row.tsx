import * as React from 'react';
import { createUseStyles } from 'react-jss';
import { classes } from '../../helpers';

export const Row: React.FC<RowProps> = (props) => {
  const { className } = props;
  return (
    <div
      onClick={props.onClick}
      className={classes(rowStyle().container, flexPosition(props).container, className, 'sha-el-row')}
      style={props.style}
    >
      {props.children}
    </div>
  );
};

Row.defaultProps = {
  justifyContent: 'flex-start',
  gutter: ['10px 0', '.5rem'],
  wrap: 'wrap',
};

const rowStyle = createUseStyles({
  container: {
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'row',
  },
});

const flexPosition = createUseStyles({
  container: (props) => ({
    justifyContent: props.justifyContent,
    alignItems: props.alignItems,
    padding: props.gutter[0],
    flexWrap: props.wrap,
    '& > .sha-el-col': {
      padding: props.gutter[1],
    },
  }),
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
