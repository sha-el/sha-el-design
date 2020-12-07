import { stylesheet } from 'typestyle';
import { Theme } from '../Theme/Theme';
import { hoverColor } from '../../helpers/color';
import elevations from '../../helpers/elevations';

export const style = (theme: Theme, background: string = theme.background, densed?: boolean, inline?: boolean) => {
  return stylesheet({
    list: {
      padding: densed ? '4px 0' : '8px 0',
      margin: 0,
      listStyle: 'none',
      width: '100%',
      boxSizing: 'border-box',
      background: background,
      $nest: {
        '.list-item': {
          display: inline ? 'inline-block' : 'block',
          background: background,
          $nest: {
            '&:hover': {
              filter: hoverColor(background),
              background: background,
            },
          },
        },
      },
    },
    listItem: {
      transition: 'background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
      cursor: 'pointer',
      listStyle: 'none',
      overflow: 'hidden',
      $nest: {
        '&:hover': {
          filter: hoverColor(background),
          background: background,
        },
      },
    },
    nestedItem: {
      paddingLeft: densed ? '10px' : '20px',
      overflowY: 'hidden',
      transition: 'all .6s cubic-bezier(0.4, 0, 0.2, 1)',
    },
    ...elevations(theme),
  });
};
