import * as React from 'react';
import { createUseStyles } from 'react-jss';
import { classes } from '../../helpers';

export const Col: React.FC<ColProps> = (props) => {
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
    <div className={classes(className, colStyle(props).container, 'sha-el-col')} {...rest}>
      {children}
    </div>
  );
};

const colStyle = createUseStyles({
  container: (props) => ({
    maxWidth: !props.flex && 100 / (24 / props.span) + '%',
    flexBasis: !props.flex && 100 / (24 / props.span) + '%',
    boxSizing: 'border-box',
    flex: props.flex || '0 0 auto',
    marginLeft: props.offset && typeof props.offset === 'number' && 100 / (24 / props.offset) + '%',
    alignSelf: props.alignSelf,

    '@media (max-width: 576)': {
      maxWidth: !props.flex && 100 / (24 / props.spanXs) + '%',
      flexBasis: !props.flex && 100 / (24 / props.spanXs) + '%',
      marginLeft: props.offset && typeof props.offset === 'object' && 100 / (24 / props.offset.xs) + '%',
    },

    '@media (min-width: 576)': {
      maxWidth: !props.flex && 100 / (24 / props.spanSm) + '%',
      flexBasis: !props.flex && 100 / (24 / props.spanSm) + '%',
      marginLeft: props.offset && typeof props.offset === 'object' && 100 / (24 / props.offset.sm) + '%',
    },

    '@media (min-width: 768)': {
      maxWidth: !props.flex && 100 / (24 / props.spanMd) + '%',
      flexBasis: !props.flex && 100 / (24 / props.spanMd) + '%',
      marginLeft: props.offset && typeof props.offset === 'object' && 100 / (24 / props.offset.md) + '%',
    },

    '@media (min-width: 992)': {
      maxWidth: !props.flex && 100 / (24 / props.spanLg) + '%',
      flexBasis: !props.flex && 100 / (24 / props.spanLg) + '%',
      marginLeft: props.offset && typeof props.offset === 'object' && 100 / (24 / props.offset.lg) + '%',
    },

    '@media (min-width: 1200)': {
      maxWidth: !props.flex && 100 / (24 / props.spanXl) + '%',
      flexBasis: !props.flex && 100 / (24 / props.spanXl) + '%',
      marginLeft: props.offset && typeof props.offset === 'object' && 100 / (24 / props.offset.xl) + '%',
    },
  }),
});

// const colStyle = (props: ColProps) =>
//   style(
//     {

//     },
//     props.spanXs &&
//       media(
//         {
//           maxWidth: 576,
//         },
//         {

//         },
//       ),
//     props.spanSm &&
//       media(
//         {
//           minWidth: 576,
//         },
//         {

//         },
//       ),
//     props.spanMd &&
//       media(
//         {
//           minWidth: 768,
//         },
//         {

//         },
//       ),
//     props.spanLg &&
//       media(
//         {
//           minWidth: 992,
//         },
//         {

//         },
//       ),
//     props.spanXl &&
//       media(
//         {
//           minWidth: 1200,
//         },
//         {

//         },
//       ),
//   );

export interface ColProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  style?: React.CSSProperties;
  children?: React.ReactNode;
  /**
   * Number of cells to occupy out off 24
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
