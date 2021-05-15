import { hoverColor } from '../../helpers/color';
import { css } from '@emotion/css';

export const list = (densed: boolean, background: string) =>
  css({
    padding: densed ? '4px 0' : '8px 0',
    margin: 0,
    listStyle: 'none',
    width: '100%',
    boxSizing: 'border-box',
    borderRadius: '6px',
    background: background,
    display: 'block',
    '& .list-item': {
      display: 'block',
      background: background,
      '&:hover': {
        filter: hoverColor(background),
        background: background,
      },
    },
  });

export const listItem = (background: string) =>
  css({
    transition: 'background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    cursor: 'pointer',
    listStyle: 'none',
    overflow: 'hidden',
    '&:hover': {
      filter: hoverColor(background),
      background: background,
    },
  });

export const nestedItem = css({
  paddingLeft: '20px',
  overflowY: 'hidden',
  transition: 'all .6s cubic-bezier(0.4, 0, 0.2, 1)',
});
