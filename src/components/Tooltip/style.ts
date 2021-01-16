import { Theme, theming } from '../Theme/Theme';
import { color } from 'csx';
import { colorShades } from '../../helpers/color';
import { createUseStyles } from 'react-jss';

export const style = createUseStyles(
  (theme: Theme) => ({
    overlay: {
      background: colorShades(color(theme.background).invert().toString())[4],
      color: theme.background,
      borderRadius: '4px',
      padding: '5px 10px',
    },
  }),
  { theming, name: 'sha-el-tooltip' },
);
