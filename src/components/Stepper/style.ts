import { css } from '@emotion/css';
import { getColor } from '../../helpers/color';
import { disabledColor, disabledText } from '../../helpers/color';
import { Theme } from '../Theme/Theme';

export const style = (theme: Theme) => ({
  number: css({
    borderRadius: '100%',
    width: '32px',
    height: '32px',
    textAlign: 'center',
    color: disabledText(theme),
    background: disabledColor(theme),
  }),
  icon: css({
    fontSize: '28px',
    padding: '0.5rem',
    color: disabledText(theme),
  }),
  active: css({
    color: getColor(theme.primary),
    background: theme.primary,
  }),
  activeIcon: css({
    color: theme.primary,
  }),
  error: css({
    color: theme.error,
  }),
  success: css({
    color: theme.info,
  }),
  clickable: css({
    cursor: 'pointer',
  }),
  disabled: css({
    color: disabledText(theme),
    cursor: 'not-allowed',
  }),
  container: css({
    padding: '0.5rem',
  }),
});
