import { stylesheet } from 'typestyle';
import { Theme } from '../Theme/Theme';
import { PaperProps } from '../Paper';
import { shadow } from '../../helpers/style';
import { hoverColor } from '../../helpers/color';

export const style = (theme: Theme, __paper?: PaperProps) => {
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
      listStyle: 'none',
      overflow: 'hidden',
      $nest: {
        '&:hover': {
          background: hoverColor(theme.background),
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
