import { css } from '@emotion/css';
import { ColProps } from './Col';
import { ResponsiveBreakpoint, Gutter, RowProps } from './Row';
import { useWindowSize } from '../../helpers/Grid';

export const colStyle = (props: ColProps) =>
  css({
    flex: props.flex,
    maxWidth: !props.flex && 100 / (24 / props.span) + '%',
    flexBasis: !props.flex && 100 / (24 / props.span) + '%',
    boxSizing: 'border-box',
    marginLeft: props.offset && typeof props.offset === 'number' && 100 / (24 / props.offset) + '%',
    alignSelf: props.alignSelf,

    '@media (max-width: 576px)': props.spanXs && {
      maxWidth: !props.flex && 100 / (24 / props.spanXs) + '%',
      flexBasis: !props.flex && 100 / (24 / props.spanXs) + '%',
      marginLeft: props.offset && typeof props.offset === 'object' && 100 / (24 / props.offset.xs) + '%',
    },
    '@media (min-width: 576px)': props.spanSm && {
      maxWidth: !props.flex && 100 / (24 / props.spanSm) + '%',
      flexBasis: !props.flex && 100 / (24 / props.spanSm) + '%',
      marginLeft: props.offset && typeof props.offset === 'object' && 100 / (24 / props.offset.sm) + '%',
    },

    '@media (min-width: 768px)': props.spanMd && {
      maxWidth: !props.flex && 100 / (24 / props.spanMd) + '%',
      flexBasis: !props.flex && 100 / (24 / props.spanMd) + '%',
      marginLeft: props.offset && typeof props.offset === 'object' && 100 / (24 / props.offset.md) + '%',
    },

    '@media (min-width: 992px)': props.spanLg && {
      maxWidth: !props.flex && 100 / (24 / props.spanLg) + '%',
      flexBasis: !props.flex && 100 / (24 / props.spanLg) + '%',
      marginLeft: props.offset && typeof props.offset === 'object' && 100 / (24 / props.offset.lg) + '%',
    },

    '@media (min-width: 1200px)': props.spanXl && {
      maxWidth: !props.flex && 100 / (24 / props.spanXl) + '%',
      flexBasis: !props.flex && 100 / (24 / props.spanXl) + '%',
      marginLeft: props.offset && typeof props.offset === 'object' && 100 / (24 / props.offset.xl) + '%',
    },
  });

export const rowStyle = (props: RowProps) =>
  css({
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: props.flexDirection,
    justifyContent: props.justifyContent,
    alignItems: props.alignItems,
  });

const breakpointRowObject = (gutter: Gutter[], breakpoint: ResponsiveBreakpoint) => ({
  marginLeft: typeof gutter[0] === 'object' && gutter[0][breakpoint] !== undefined ? gutter[0][breakpoint] / -2 : null,
  marginRight: typeof gutter[0] === 'object' && gutter[0][breakpoint] !== undefined ? gutter[0][breakpoint] / -2 : null,
  rowGap: typeof gutter[1] === 'object' && gutter[1][breakpoint] !== undefined ? gutter[1][breakpoint] : null,
});

const breakpointColObject = (gutter: Gutter[], breakpoint: ResponsiveBreakpoint | '') =>
  typeof gutter[0] === 'object' &&
  gutter[0][breakpoint] !== undefined && {
    paddingLeft: gutter[0][breakpoint] / 2,
    paddingRight: gutter[0][breakpoint] / 2,
  };

export const gutterStyle = (props: RowProps): [string, { paddingLeft: number; paddingRight: number }] => {
  const normalizedGutter = Array.isArray(props.gutter) ? props.gutter : [props.gutter, 0];
  const defaultGutter = [
    typeof normalizedGutter[0] === 'number' ? normalizedGutter[0] : 0,
    typeof normalizedGutter[1] === 'number' ? normalizedGutter[1] : 0,
  ];
  const [width] = useWindowSize();

  return [
    css({
      flexWrap: props.wrap,
      rowGap: defaultGutter[1],
      marginLeft: defaultGutter[0] / -2,
      marginRight: defaultGutter[0] / -2,
      '@media (max-width: 576px)': {
        ...breakpointRowObject(normalizedGutter, 'xs'),
      },
      '@media (min-width: 576px)': {
        ...breakpointRowObject(normalizedGutter, 'sm'),
      },
      '@media (min-width: 768px)': {
        ...breakpointRowObject(normalizedGutter, 'md'),
      },
      '@media (min-width: 992px)': {
        ...breakpointRowObject(normalizedGutter, 'lg'),
      },
      '@media (min-width: 1200px)': {
        ...breakpointRowObject(normalizedGutter, 'xl'),
      },
    }),
    {
      paddingLeft: defaultGutter[0] / 2,
      paddingRight: defaultGutter[0] / 2,
      ...breakpointColObject(normalizedGutter, width < 576 ? 'xs' : ''),
      ...breakpointColObject(normalizedGutter, width > 576 ? 'sm' : ''),
      ...breakpointColObject(normalizedGutter, width > 768 ? 'md' : ''),
      ...breakpointColObject(normalizedGutter, width > 992 ? 'lg' : ''),
      ...breakpointColObject(normalizedGutter, width > 1200 ? 'xl' : ''),
    },
  ];
};
