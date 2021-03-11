import { css } from '@emotion/css';
import { ColProps } from './Col';
import { RowProps } from './Row';

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

export const rowStyle = css({
  boxSizing: 'border-box',
  display: 'flex',
});

export const flexPosition = (props: RowProps) =>
  css({
    flexDirection: props.flexDirection,
    justifyContent: props.justifyContent,
    alignItems: props.alignItems,
    padding: props.gutter[0],
    flexWrap: props.wrap,
    '& > .sha-el-col': {
      padding: props.gutter[1],
    },
  });
