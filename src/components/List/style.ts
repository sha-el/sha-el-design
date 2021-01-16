import { Theme, theming } from '../Theme/Theme';
import { hoverColor } from '../../helpers/color';
import elevations from '../../helpers/elevations';
import { createUseStyles } from 'react-jss';

export const list = createUseStyles(
  (theme: Theme) => ({
    list: ({ densed, background, inline }) => ({
      padding: densed ? '4px 0' : '8px 0',
      margin: 0,
      listStyle: 'none',
      width: '100%',
      boxSizing: 'border-box',
      background: background,
      '& .list-item': {
        display: inline ? 'inline-block' : 'block',
        background: background,
        '&:hover': {
          filter: hoverColor(background),
          background: background,
        },
      },
    }),
    ...elevations(theme),
  }),
  { theming, name: 'sha-el-list' },
);

export const listItem = createUseStyles(
  {
    listItem: ({ background }) => ({
      transition: 'background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
      cursor: 'pointer',
      listStyle: 'none',
      overflow: 'hidden',
      '&:hover': {
        filter: hoverColor(background),
        background: background,
      },
    }),
  },
  { name: 'sha-el-list-item' },
);

export const nestedItem = createUseStyles(
  {
    nestedItem: {
      paddingLeft: '20px',
      overflowY: 'hidden',
      transition: 'all .6s cubic-bezier(0.4, 0, 0.2, 1)',
    },
  },
  { name: 'sha-el-nested-item' },
);
