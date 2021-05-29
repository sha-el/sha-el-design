import { hoverColor } from '../../helpers/color';
import { css } from '@emotion/css';
import { getBorders } from '../../helpers/border';
import { Theme } from '../Theme/Theme';

export const list = (background: string, border: number, theme: Theme) =>
  css({
    listStyle: 'none',
    width: '100%',
    boxSizing: 'border-box',
    borderRadius: '6px',
    background: background,
    display: 'block',
    borderCollapse: 'collapse',
    '& .list-item': {
      display: 'block',
      background: background,
      borderCollapse: 'collapse',
      borderBottom: getBorders(theme, border),
      '&:last-child': {
        border: 'none',
      },
      '&:hover': {
        filter: hoverColor(background),
        background: background,
      },
    },
  });

export const listItem = (background: string, clickable: boolean) =>
  css({
    transition: 'background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    cursor: clickable && 'pointer',
    listStyle: 'none',
    overflow: 'hidden',
    padding: '6px 8px 6px 9px',
    '&:hover': {
      filter: hoverColor(background),
      background: background,
    },
  });

export const nestedItem = css({
  overflowY: 'hidden',
  transition: 'all .6s cubic-bezier(0.4, 0, 0.2, 1)',
});
