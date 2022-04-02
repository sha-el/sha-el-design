import { css } from '@emotion/css';
import { colorFromChoices } from '../../helpers/color';
import { ColorChoices } from '../../typings/color';
import { themeVar } from '../Theme/helper';

export const style = (disabled: boolean, checked: boolean, color: ColorChoices) => ({
  container: css({
    cursor: disabled ? 'not-allowed' : 'pointer',
  }),
  input: css({
    display: 'none',
  }),
  svg: css({
    fill: disabled
      ? themeVar.neutral.neutralVariantKeyColor.surfaceVariant
      : checked
      ? colorFromChoices(color).color
      : themeVar.neutral.neutralVariantKeyColor.surfaceVariant,
  }),
});
