import { stylesheet } from 'typestyle';
import { lightText, shadowColor } from '../../helpers/color';
import { Theme } from '../Theme/Theme';

export const style = (theme: Theme, nested: boolean) => {
  return stylesheet({
    tableContainer: {
      display: 'flex',
      overflowX: 'auto',
      padding: '0 !important',
      width: '100%',
      boxSizing: 'border-box',
      $nest: {
        '& .sha-el-col': {
          overflow: 'hidden',
        },
        'li, ul': {
          padding: '0 !important',
        },
      },
    },
    header: {
      fontWeight: 600,
      fontSize: '12px',
      $nest: {
        '&:hover': {
          background: `${theme.primary}`,
        },
      },
    },
    tableRow: {
      padding: '0',
      cursor: !nested && 'auto !important',
      fontFamily: "'Fira Code', monospace !important",
      $nest: {
        '& .table-cell': {
          borderBottom: `1px solid ${shadowColor(theme)[0]}`,
          borderCollapse: 'collapse',
        },
      },
    },
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
  });
};
