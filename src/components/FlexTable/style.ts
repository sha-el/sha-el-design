import { css } from '@emotion/css';
import { themeVar } from '../Theme/helper';

export const style = ({ nested, clickableRow }: { nested: boolean; clickableRow: boolean }) => ({
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
    borderBottom: `2px solid ${themeVar.neutral.neutralVariantKeyColor.outline}`,
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
    borderBottom: `1px solid $${themeVar.neutral.neutralVariantKeyColor.outline}`,
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
    color: themeVar.neutral.neutralVariantKeyColor.outline,
    background: themeVar.neutral.neutralKeyColor.surface,
    textAlign: 'center',
    padding: '50px',
    fontSize: '16px',
  }),
});
