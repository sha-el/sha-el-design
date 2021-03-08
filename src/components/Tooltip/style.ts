import { Theme } from '../Theme/Theme';
import { color } from 'csx';
import { colorShades } from '../../helpers/color';
import { css } from '@emotion/css';

export const style = (theme: Theme) =>
  css({
    backgroundColor: colorShades(color(theme.background).invert().toString())[4] + ' !important',
    color: theme.background + ' !important',
    borderRadius: '4px !important',
    padding: '5px 10px !important',
  });
