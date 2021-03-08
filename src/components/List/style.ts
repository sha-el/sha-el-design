import { Theme } from '../Theme/Theme';
import { hoverColor } from '../../helpers/color';
import { css } from '@emotion/css';

export const list = (theme: Theme, densed: boolean, background: string, inline: boolean) =>
  css({
    padding: densed ? '4px 0' : '8px 0',
    margin: 0,
    listStyle: 'none',
    width: '100%',
    boxSizing: 'border-box',
    borderRadius: '5px',
    background: background,
    display: 'block',
    '& .list-item': {
      display: inline ? 'inline-block' : 'block',
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
