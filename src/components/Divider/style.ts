import { css } from '@emotion/css';
import { shadowColor } from '../../helpers/color';
import { Theme } from '../Theme/Theme';
import { DividerProps } from './Divider';

const commonStyle = (color: string, theme: Theme) => {
  return {
    content: '" "',
    background: color || shadowColor(theme)[0],
    height: '1px',
    display: 'block',
    position: 'absolute' as const,
    top: 'calc(50% - 2px)',
  };
};

const commonStyleVertical = (color: string, theme: Theme) => {
  return {
    content: '" "',
    background: color || shadowColor(theme)[0],
    width: '1px',
    height: '100%',
    display: 'inline-block',
    position: 'relative' as const,
  };
};

export const style = (color: string, theme: Theme, props: DividerProps) => ({
  divider: css({
    width: '100%',
    textAlign: 'center',
    position: 'relative',
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

  dividerVertical: css({
    height: '150px',
    textAlign: 'center',
    position: 'relative',
    margin: '0px 5px',
    background: theme.background,
    display: 'inline-block',
    '& svg': {
      display: 'block',
      padding: '5px 0px 10px 0px',
    },
    '&:before': {
      left: 0,
      ...commonStyleVertical(color, theme),
    },
    '&:after': {
      right: 0,
      ...commonStyleVertical(color, theme),
    },
  }),

  psuedoWithChild:
    props.orientation === 'vertical'
      ? css({
          '&:before': {
            height: 'calc(100% - 20px)',
          },
          '&:after': {
            height: 'calc(100% - 20px)',
          },
        })
      : css({
          '&:before': {
            width: 'calc(50% - 20px)',
          },
          '&:after': {
            width: 'calc(50% - 20px)',
          },
        }),

  psuedoWithoutChild:
    props.orientation === 'vertical'
      ? css({
          '&:before': {
            height: '50%',
          },
          '&:after': {
            height: '50%',
            top: '50%',
            left: '-1px',
          },
        })
      : css({
          '&:before': {
            width: '50%',
          },
          '&:after': {
            width: '50%',
          },
        }),
});
