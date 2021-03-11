import { css } from '@emotion/css';
import { shadowColor } from '../../helpers/color';
import { Theme } from '../Theme/Theme';

const commonStyle = (color: string, theme: Theme) => {
  return {
    content: '" "',
    background: color || shadowColor(theme)[0],
    height: '1px',
    zIndex: -1,
    display: 'block',
    position: 'absolute' as const,
    top: 'calc(50% - 2px)',
  };
};

export const style = (color: string, theme: Theme) => ({
  divider: css({
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

  psuedoWithChild: css({
    '&:before': {
      width: 'calc(50% - 20px)',
    },
    '&:after': {
      width: 'calc(50% - 20px)',
    },
  }),

  psuedoWithoutChild: css({
    '&:before': {
      width: '50%',
    },
    '&:after': {
      width: '50%',
    },
  }),
});
