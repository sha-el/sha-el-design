import { css } from '@emotion/css';
import { DividerProps } from './Divider';
import { themeVar } from '../Theme/helper';

const commonStyle = (color: string) => {
  return {
    content: '" "',
    background: color || themeVar.neutral.neutralVariantKeyColor.outline,
    height: '1px',
    display: 'block',
    position: 'absolute' as const,
    top: 'calc(50% - 2px)',
  };
};

const commonStyleVertical = (color: string) => {
  return {
    content: '" "',
    background: color || themeVar.neutral.neutralVariantKeyColor.outline,
    width: '1px',
    height: '100%',
    display: 'inline-block',
    position: 'relative' as const,
  };
};

export const style = (color: string, props: DividerProps) => ({
  divider: css({
    width: '100%',
    textAlign: 'center',
    position: 'relative',
    margin: '5px 0',
    background: themeVar.neutral.neutralKeyColor.surface,
    display: 'inline-block',
    '& svg': {
      display: 'inline-block',
    },
    '&:before': {
      left: 0,
      ...commonStyle(color),
    },
    '&:after': {
      right: 0,
      ...commonStyle(color),
    },
  }),

  dividerVertical: css({
    height: '150px',
    textAlign: 'center',
    position: 'relative',
    margin: '0px 5px',
    background: themeVar.neutral.neutralKeyColor.surface,
    display: 'inline-block',
    '& svg': {
      display: 'block',
      padding: '5px 0px 10px 0px',
    },
    '&:before': {
      left: 0,
      ...commonStyleVertical(color),
    },
    '&:after': {
      right: 0,
      ...commonStyleVertical(color),
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
