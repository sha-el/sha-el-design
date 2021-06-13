import { css } from '@emotion/css';
import { Theme } from '../Theme/Theme';

export const style = (theme: Theme, expand: boolean, childWidth: number) =>
  css({
    width: expand ? childWidth : 'auto',
    minWidth: '100px',
    borderRadius: '4px',
    background: theme.background + ' !important',
    color: `${theme.textColor} !important`,
  });
