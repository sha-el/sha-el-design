import { Theme } from '../Theme/Theme';
import Color from 'color';
import { colorShades } from '../../helpers/color';
import { css } from '@emotion/css';

export const style = (theme: Theme, open: boolean, placement: string) => {
  const arrowPlacement = {
    top: 'bottom',
    bottom: 'top',
    right: 'left',
    left: 'right',
  }[placement];

  return {
    content: css({
      backgroundColor: colorShades(Color(theme.background).negate().toString())[4],
      color: theme.background,
      borderRadius: '4px',
      visibility: open ? 'visible' : 'hidden',
    }),
    arrow: css({
      visibility: 'hidden',
      position: 'absolute',
      width: '8px',
      height: '8px',
      background: 'inherit',

      [arrowPlacement]: '-4px',

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
