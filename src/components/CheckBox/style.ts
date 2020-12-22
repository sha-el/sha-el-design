import { createUseStyles } from 'react-jss';
import { disabledColor, lightText } from '../../helpers/color';
import { theming } from '../Theme/Theme';

export const style = createUseStyles(
  {
    container: ({ disabled }) => {
      return {
        cursor: disabled ? 'not-allowed' : 'pointer',
      };
    },
    input: { display: 'none' },
    svg: ({ disabled, theme, checked, color }) => {
      return {
        fill: disabled ? disabledColor(theme) : checked ? theme[color] || color : lightText(theme),
      };
    },
  },
  { theming, name: 'sha-el-checkbox' },
);
