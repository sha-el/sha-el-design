import { css } from '@emotion/css';
import { colorShades } from '../../helpers/color';
import { Theme } from '../Theme/Theme';

export const style = (theme: Theme, expand: boolean, childWidth: number) =>
  css({
    width: expand ? childWidth : 'auto',
    minWidth: '100px',
    borderRadius: '4px',
    padding: '0',
    background: theme.background,
    color: `${theme.textColor} !important`,
    '& .rc-tooltip-arrow': {
      borderTopColor: colorShades(theme.background)[3],
    },
  });
