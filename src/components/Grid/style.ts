import { createUseStyles } from 'react-jss';

export const colStyle = () => {
  const styles = {
    col: (props) => ({
      maxWidth: !props.flex && 100 / (24 / props.span) + '%',
      flexBasis: !props.flex && 100 / (24 / props.span) + '%',
      boxSizing: 'border-box',
      flex: props.flex || '0 0 auto',
      marginLeft: props.offset && typeof props.offset === 'number' && 100 / (24 / props.offset) + '%',
      alignSelf: props.alignSelf,
    }),
    '@media (max-width: 576px)': {
      col: (props) => ({
        maxWidth: !props.flex && 100 / (24 / props.spanXs) + '%',
        flexBasis: !props.flex && 100 / (24 / props.spanXs) + '%',
        marginLeft: props.offset && typeof props.offset === 'object' && 100 / (24 / props.offset.xs) + '%',
      }),
    },
    '@media (min-width: 576px)': {
      col: (props) => ({
        maxWidth: !props.flex && 100 / (24 / props.spanSm) + '%',
        flexBasis: !props.flex && 100 / (24 / props.spanSm) + '%',
        marginLeft: props.offset && typeof props.offset === 'object' && 100 / (24 / props.offset.sm) + '%',
      }),
    },

    '@media (min-width: 768px)': {
      col: (props) => ({
        maxWidth: !props.flex && 100 / (24 / props.spanMd) + '%',
        flexBasis: !props.flex && 100 / (24 / props.spanMd) + '%',
        marginLeft: props.offset && typeof props.offset === 'object' && 100 / (24 / props.offset.md) + '%',
      }),
    },

    '@media (min-width: 992px)': {
      col: (props) => ({
        maxWidth: !props.flex && 100 / (24 / props.spanLg) + '%',
        flexBasis: !props.flex && 100 / (24 / props.spanLg) + '%',
        marginLeft: props.offset && typeof props.offset === 'object' && 100 / (24 / props.offset.lg) + '%',
      }),
    },

    '@media (min-width: 1200px)': {
      col: (props) => ({
        maxWidth: !props.flex && 100 / (24 / props.spanXl) + '%',
        flexBasis: !props.flex && 100 / (24 / props.spanXl) + '%',
        marginLeft: props.offset && typeof props.offset === 'object' && 100 / (24 / props.offset.xl) + '%',
      }),
    },
  };
  return createUseStyles(styles, { name: 'sha-el-col' });
};

export const rowStyle = createUseStyles(
  {
    container: {
      boxSizing: 'border-box',
      display: 'flex',
    },
  },
  { name: 'sha-el-row' },
);

export const flexPosition = createUseStyles(
  {
    container: (props) => ({
      flexDirection: props.flexDirection,
      justifyContent: props.justifyContent,
      alignItems: props.alignItems,
      padding: props.gutter[0],
      flexWrap: props.wrap,
      '& > .sha-el-col': {
        padding: props.gutter[1],
      },
    }),
  },
  { name: 'sha-el-row-flex' },
);
