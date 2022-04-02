import { css } from '@emotion/css';
import { themeVar } from '../Theme/helper';

export const radioStyle = ({ disabled }: { disabled: boolean }) => ({
  container: css({
    cursor: disabled ? 'not-allowed' : 'pointer',
    margin: '0 5px',
  }),
  radio: css({
    height: '18px',
    width: '18px',
    border: '1px solid ' + themeVar.neutral.neutralVariantKeyColor.outline,
    borderRadius: '100%',
    transition: 'background .2s',
  }),
  input: css({
    display: 'none',
    '&:checked + .radio-circle': {
      borderColor: themeVar.accent.primaryKeyColor.primary,
      background: themeVar.accent.primaryKeyColor.primary,
    },
  }),
});

export const radioButtonStyle = css({
  display: 'none',
});
