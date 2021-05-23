import * as React from 'react';
import { classes } from '../../helpers';
import { colStyle } from './style';

export const Col: React.FC<ColProps> = React.forwardRef((props, ref) => {
  const {
    className,
    children,
    span: __span,
    spanSm: __spanSm,
    spanMd: __spanMd,
    spanLg: __spanLg,
    spanXl: __spanXl,
    spanXs: __spanXs,
    ...rest
  } = props;
  return (
    <div ref={ref} className={classes(className, colStyle(props), 'sha-el-col')} {...rest}>
      {children}
    </div>
  );
});

export interface ColProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  style?: React.CSSProperties;
  children?: React.ReactNode;
  /**
   * Number of cells to occupy out of 24
   * @default 24
   */
  span?: number;
  /**
   * Number of cell to occupy when width <= 576px
   * @see span
   */
  spanXs?: number;
  /**
   * Number of cell to occupy when width > 576px
   * @see span
   */
  spanSm?: number;
  /**
   * Number of cell to occupy when width > 768px
   * @see span
   */
  spanMd?: number;
  /**
   * Number of cell to occupy when width > 992px
   * @see span
   */
  spanLg?: number;
  /**
   * Number of cell to occupy when width > 1200px
   * @see span
   */
  spanXl?: number;
  /**
   * The number of cells to offset Col from the left
   */
  offset?:
    | number
    | {
        xs?: number;
        sm?: number;
        md?: number;
        lg?: number;
        xl?: number;
      };
  alignSelf?: React.CSSProperties['alignSelf'];
  flex?: React.CSSProperties['flex'];
  className?: string;
}

Col.defaultProps = {
  span: 24,
};

Col.displayName = 'Col';
