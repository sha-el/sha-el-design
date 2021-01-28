import * as React from 'react';
import { classes } from '../../helpers';
import { flexPosition, rowStyle } from './style';

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
  flexDirection: 'row',
};

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
  /**
   * Flex direction
   */
  flexDirection?: React.CSSProperties['flexDirection'];
}
