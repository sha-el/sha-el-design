import { css } from '@emotion/css';
import { lightText, shadowColor } from '../../helpers/color';
import { Theme } from '../Theme/Theme';

export const style = ({ theme, nested, clickableRow }: { theme: Theme; nested: boolean; clickableRow: boolean }) => ({
  tableContainer: css({
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
    '& .table-cell': {
      padding: '12px 16px',
    },
  }),
  header: css({
    fontWeight: 600,
    fontSize: '12px',
    color: lightText(theme),
    cursor: 'default !important',
    borderBottom: `2px solid ${shadowColor(theme)[2]}`,
    textTransform: 'uppercase',
    letterSpacing: '.5px',
    wordWrap: 'break-word',
    boxSizing: 'border-box',
    '&:hover': {
      filter: 'none !important',
    },
  }),
  tableRow: css({
    padding: '0',
    cursor: (!nested && !clickableRow && 'auto !important') || undefined,
    fontFamily: "'Fira Code', monospace !important",
    borderBottom: `1px solid ${shadowColor(theme)[0]}`,
    borderCollapse: 'collapse',
  }),
  nestedContent: css({
    marginLeft: '-20px',
  }),
  empty: css({
    color: lightText(theme),
    background: theme.background,
    textAlign: 'center',
    padding: '50px',
    fontSize: '16px',
  }),
});
