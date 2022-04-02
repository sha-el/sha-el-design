import { css } from '@emotion/css';
import { colorFromChoices } from '../../helpers/color';
import { themeVar } from '../Theme/helper';
import { ProgressProps } from './Progress';

export const style = (props: ProgressProps) => {
  return {
    container: css({
      width: '100%',
      minWidth: '200px',
      background: themeVar.neutral.neutralVariantKeyColor.surfaceVariant,
      borderRadius: '2px',
      overflow: 'visible',
    }),
    line: css({
      height: '10px',
      lineHeight: '10px',
      background: colorFromChoices(props.color).background,
      borderRadius: '0 2px 2px 0',
      transition: 'all .4s cubic-bezier(.08,.82,.17,1) 0s',
    }),
    circle: css({
      transform: 'rotate(-90deg)',
      transformOrigin: '50% 50%',
      transition: '0.35s stroke-dashoffset',
    }),
  };
};
