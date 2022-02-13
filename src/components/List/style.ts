import { css } from '@emotion/css';
import { getBorder } from '../../helpers/border';
import { themeVar } from '../Theme/helper';

export const list = (border: number) =>
  css({
    listStyle: 'none',
    width: '100%',
    boxSizing: 'border-box',
    borderRadius: '6px',
    background: themeVar.neutral.neutralKeyColor.surface,
    display: 'block',
    borderCollapse: 'collapse',
    '& .list-item': {
      display: 'block',
      background: themeVar.neutral.neutralKeyColor.surface,
      borderCollapse: 'collapse',
      borderBottom: getBorder(border),
      '&:last-child': {
        border: 'none',
      },
      '&:hover': {
        color: themeVar.neutral.neutralVariantKeyColor.onSurfaceVariant,
        background: themeVar.neutral.neutralVariantKeyColor.surfaceVariant,
      },
    },
  });

export const listItem = (clickable: boolean) =>
  css({
    transition: 'background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    cursor: clickable && 'pointer',
    listStyle: 'none',
    overflow: 'hidden',
  });

export const nestedItem = css({
  overflowY: 'hidden',
  transition: 'all .3s linear',
});
