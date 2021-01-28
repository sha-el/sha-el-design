import { createUseStyles } from 'react-jss';
import { getColor } from '../../helpers';
import { disabledColor, disabledText } from '../../helpers/color';

export const style = createUseStyles({
  number: {
    borderRadius: '100%',
    width: '32px',
    height: '32px',
    textAlign: 'center',
    color: ({ theme }) => disabledText(theme),
    background: ({ theme }) => disabledColor(theme),
  },
  icon: {
    fontSize: '28px',
    paddingTop: '0',
    paddingBottom: '0',
    color: ({ theme }) => disabledText(theme),
  },
  active: {
    color: ({ theme }) => getColor(theme.primary),
    background: ({ theme }) => theme.primary,
  },
  activeIcon: {
    color: ({ theme }) => theme.primary,
  },
  error: {
    color: ({ theme }) => theme.error,
  },
  success: {
    color: ({ theme }) => theme.info,
  },
  clickable: {
    cursor: 'pointer',
  },
  disabled: {
    color: ({ theme }) => disabledText(theme),
    cursor: 'not-allowed',
  },
});
