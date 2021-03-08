import { css } from '@emotion/css';
import { lightText } from '../../helpers/color';
import { shadow } from '../../helpers/style';
import { Theme } from '../Theme/Theme';

export const radioStyle = ({ theme, disabled }: { theme: Theme; disabled: boolean }) => ({
  container: css({
    cursor: disabled ? 'not-allowed' : 'pointer',
    margin: '0 5px',
  }),
  radio: css({
    height: '18px',
    width: '18px',
    border: '1px solid ' + lightText(theme),
    borderRadius: '100%',
    transition: 'background .2s',
  }),
  input: css({
    display: 'none',
    '&:checked + .radio-circle': {
      borderColor: theme.primary,
      background: theme.primary,
      boxShadow: shadow('2X', theme),
    },
  }),
});

export const radioButtonStyle = css({
  display: 'none',
});
