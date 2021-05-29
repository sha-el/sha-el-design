import * as React from 'react';
import { classes } from '../../helpers';
import { gutterStyle, rowStyle } from './style';

export const Row: React.FC<RowProps> = (props) => {
  const {
    className,
    onClick,
    style,
    children: __children,
    gutter: __gutter,
    justifyContent: __justifyContent,
    alignItems: __alignItems,
    wrap: __wrap,
    flexDirection: __flexDirection,
    ...rest
  } = props;

  const children: React.ReactElement[] = Array.isArray(__children)
    ? (__children as React.ReactElement[])
    : [__children];

  const [rowGutterStyles, colPadding] = gutterStyle(props);
  return (
    <div
      onClick={onClick}
      className={classes(rowStyle(props), rowGutterStyles, className, 'sha-el-row')}
      style={style}
      {...rest}
    >
      {children
        .filter((child) => !!child)
        .map((child, i) =>
          React.cloneElement(
            child,
            (child.type as unknown as { displayName: string }).displayName === 'Col'
              ? { key: i, style: { ...colPadding, ...child.props.style } }
              : { key: i, style: { ...child.props.style } },
          ),
        )}
    </div>
  );
};

Row.defaultProps = {
  justifyContent: 'flex-start',
  gutter: [0, 0],
  wrap: 'wrap',
  flexDirection: 'row',
};

export type ResponsiveBreakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type Gutter = number | Partial<Record<ResponsiveBreakpoint, number>>;

export interface RowProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  children: React.ReactElement | React.ReactElement[];
  style?: React.CSSProperties;
  /**
   * Spacing between elements
   * [Row, Col]
   */
  gutter?: Gutter | [Gutter, Gutter];
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
