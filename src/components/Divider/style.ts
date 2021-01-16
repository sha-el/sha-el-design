import { createUseStyles } from 'react-jss';
import { shadowColor } from '../../helpers/color';
import { Theme } from '../Theme/Theme';

const commonStyle = (color: string, theme: Theme) => {
  return {
    content: '" "',
    background: color || shadowColor(theme)[0],
    height: '1px',
    zIndex: -1,
    display: 'block',
    position: 'absolute',
    top: 'calc(50% - 2px)',
  };
};

export const style = createUseStyles(
  {
    divider: ({ color, theme }) => ({
      width: '100%',
      textAlign: 'center',
      position: 'relative',
      zIndex: 2,
      margin: '5px 0',
      background: theme.background,
      display: 'inline-block',
      '& svg': {
        display: 'inline-block',
      },
      '&:before': {
        left: 0,
        ...commonStyle(color, theme),
      },
      '&:after': {
        right: 0,
        ...commonStyle(color, theme),
      },
    }),

    psuedoWithChild: {
      '&:before': {
        width: 'calc(50% - 20px)',
      },
      '&:after': {
        width: 'calc(50% - 20px)',
      },
    },

    psuedoWithoutChild: {
      '&:before': {
        width: '50%',
      },
      '&:after': {
        width: '50%',
      },
    },
  },
  { name: 'sha-el-divider' },
);
