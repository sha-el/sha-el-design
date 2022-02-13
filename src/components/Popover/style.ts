import { css } from '@emotion/css';
import { themeVar } from '../Theme/helper';

export const style = (expand: boolean, childWidth: number) =>
  css({
    width: expand ? childWidth : 'auto',
    minWidth: '100px',
    borderRadius: '4px',
    background: themeVar.neutral.neutralKeyColor.surface + ' !important',
    color: `${themeVar.neutral.neutralKeyColor.onSurface} !important`,
  });
