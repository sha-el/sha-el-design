import { createUseStyles } from 'react-jss';
import { colorShades } from '../../helpers/color';
import { shadow } from '../../helpers/style';
import { Theme, theming } from '../Theme/Theme';

export const style = createUseStyles(
  (theme: Theme) => ({
    container: {
      width: '100%',
      minWidth: '200px',
      background: colorShades(theme.background)[2],
      borderRadius: '2px',
      overflow: 'visible',
    },
    line: ({ props }) => ({
      height: '10px',
      lineHeight: '10px',
      background: theme[props.status],
      borderRadius: '0 2px 2px 0',
      transition: 'all .4s cubic-bezier(.08,.82,.17,1) 0s',
      boxShadow: shadow('BOT2X', theme, theme[props.status]),
    }),
    circle: {
      transform: 'rotate(-90deg)',
      transformOrigin: '50% 50%',
      transition: '0.35s stroke-dashoffset',
    },
  }),
  { theming, name: 'sha-el-progress' },
);
