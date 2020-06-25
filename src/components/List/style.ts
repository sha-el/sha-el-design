import { stylesheet } from 'typestyle';
import { Theme } from '../Theme/Theme';
import { PaperProps } from '../Paper';
import { shadow } from '../../helpers/style';
import { hoverColor, lightText } from '../../helpers/color';

export const style = (theme: Theme, paper?: PaperProps) => {
  return stylesheet({
    list: {
      padding: '8px 0',
      margin: 0,
      listStyle: 'none',
      background: theme.background,
      boxShadow: shadow('2X', theme),
    },
    listItem: {
      transition: 'background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
      cursor: 'pointer',
      $nest: {
        '&:hover': {
          background: hoverColor(theme.background),
        },
        '.list-subtitle': {
          color: lightText(theme),
          fontSize: '.875rem',
        },
      },
    },
    nestedItem: {
      paddingLeft: '20px',
      overflowY: 'hidden',
      transition: 'all .6s cubic-bezier(0.4, 0, 0.2, 1)',
    },
  });
};