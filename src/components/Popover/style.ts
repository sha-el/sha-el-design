import { createUseStyles } from 'react-jss';
import { colorShades } from '../../helpers/color';
import elevations from '../../helpers/elevations';
import { Theme, theming } from '../Theme/Theme';

export const style = createUseStyles(
  (theme: Theme) => ({
    container: ({ expand, childWidth }) => ({
      width: expand ? childWidth : 'auto',
      minWidth: '100px',
      borderRadius: '4px',
      padding: '0',
      background: theme.background,
      color: `${theme.textColor} !important`,
      '& .rc-tooltip-arrow': {
        borderTopColor: colorShades(theme.background)[3],
      },
    }),
    ...elevations(theme),
  }),
  { theming, name: 'sha-el-popover' },
);
