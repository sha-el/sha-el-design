import { borderColor } from 'csx';
import { createUseStyles } from 'react-jss';
import { lightText, shadowColor } from '../../helpers/color';
import { Theme, theming } from '../Theme/Theme';

export const style = createUseStyles(
  (theme: Theme) => ({
    tableContainer: {
      display: 'flex',
      overflowX: 'auto',
      padding: '0 !important',
      width: '100%',
      boxSizing: 'border-box',
      '& .sha-el-col': {
        overflow: 'hidden',
      },
      '& li, & ul': {
        padding: '0 !important',
      },
    },
    header: {
      fontWeight: 600,
      fontSize: '12px',
      color: lightText(theme),
      borderBottom: '2px solid ' + borderColor(theme.bodyBg),
      cursor: 'default',
      '&:hover': {
        background: theme.background,
      },
    },
    tableRow: ({ nested, clickableRow }) => ({
      padding: '0',
      cursor: (!nested && !clickableRow && 'auto !important') || undefined,
      fontFamily: "'Fira Code', monospace !important",
      borderBottom: `1px solid ${shadowColor(theme)[0]}`,
      borderCollapse: 'collapse',
    }),
    nestedContent: {
      marginLeft: '-20px',
    },
    empty: {
      color: lightText(theme),
      background: theme.background,
      textAlign: 'center',
      padding: '50px',
      fontSize: '16px',
    },
  }),
  { theming, name: 'sha-el-flex-table' },
);
