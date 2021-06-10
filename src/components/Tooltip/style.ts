import { Theme } from '../Theme/Theme';
import Color from 'color';
import { colorShades } from '../../helpers/color';
import { css } from '@emotion/css';
import { zBelowBase, zLayoutPopUp } from '../../helpers/zIndex';

export const style = (theme: Theme, open: boolean, placement: string, hideArrow: boolean) => {
  const arrowPlacement = {
    top: 'bottom',
    bottom: 'top',
    right: 'left',
    left: 'right',
  }[placement?.split('-')[0]];

  const contentPadding = {
    top: 'paddingBottom',
    bottom: 'paddingTop',
    right: 'paddingLeft',
    left: 'paddingRight',
  }[placement?.split('-')[0]];

  return {
    content: css({
      [contentPadding]: !hideArrow && '10px',
      boxSizing: 'border-box',
      zIndex: open ? zLayoutPopUp : zBelowBase,
      opacity: open ? '1' : '0',
    }),
    inner: css({
      backgroundColor: colorShades(Color(theme.background).negate().toString())[4],
      color: theme.background,
      borderRadius: '4px',
      boxSizing: 'border-box',
      zIndex: open ? zLayoutPopUp : zBelowBase,
    }),
    arrow: css({
      visibility: 'hidden',
      position: 'absolute',
      width: '8px',
      height: '8px',
      background: 'inherit',

      [arrowPlacement]: '6px',

      '&::before': {
        visibility: open ? 'visible' : 'hidden',
        content: "' '",
        transform: 'rotate(45deg)',

        position: 'absolute',
        width: '8px',
        height: '8px',
        background: 'inherit',
      },
    }),
  };
};
