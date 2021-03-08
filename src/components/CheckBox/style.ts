import { css } from '@emotion/css';
import { disabledColor, lightText } from '../../helpers/color';
import { Theme } from '../Theme/Theme';

export const style = (disabled: boolean, theme: Theme, checked: boolean, color: string) => ({
  container: css({
    cursor: disabled ? 'not-allowed' : 'pointer',
  }),
  input: css({
    display: 'none',
  }),
  svg: css({
    fill: disabled ? disabledColor(theme) : checked ? theme[color] || color : lightText(theme),
  }),
});
