import { stylesheet } from 'typestyle';
import { Theme } from '../Theme/Theme';
import { hoverColor } from '../../helpers/color';
import elevations from '../../helpers/elevations';

export const style = (theme: Theme) => {
  return stylesheet({
    list: {
      padding: '8px 0',
      margin: 0,
      listStyle: 'none',
      width: '100%',
      boxSizing: 'border-box',
      background: theme.background,
    },
    listItem: {
      transition: 'background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
      cursor: 'pointer',
      listStyle: 'none',
      overflow: 'hidden',
      display: 'block',
      // color: theme.textColor,
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
    ...elevations(theme),
  });
};
