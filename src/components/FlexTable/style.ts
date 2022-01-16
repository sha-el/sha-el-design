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
  }),
  header: css({
    fontWeight: 500,
    fontSize: '12px',
    cursor: 'default !important',
    borderBottom: `2px solid ${shadowColor(theme)[2]}`,
    textTransform: 'uppercase',
    letterSpacing: '.5px',
    wordWrap: 'break-word',
    boxSizing: 'border-box',
    lineHeight: '56px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    '& .table-cell': {
      textOverflow: 'ellipsis',
      padding: '0 16px',
    },
    '&:hover': {
      filter: 'none !important',
    },
  }),
  tableRow: css({
    padding: '0',
    fontWeight: 400,
    cursor: (!nested && !clickableRow && 'auto !important') || undefined,
    borderBottom: `1px solid ${shadowColor(theme)[0]}`,
    borderCollapse: 'collapse',
    letterSpacing: '.3px',
    '& .table-cell': {
      padding: '18px 16px',
    },
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
