import { css } from '@emotion/css';
import { colorShades, lightText } from '../../helpers/color';
import { Theme } from '../Theme/Theme';
import { SwitchProps } from './Switch';

export const style = (props: SwitchProps, theme: Theme) => {
  let trackBackground = props.checked ? colorShades(theme[props.color] || props.color, 'light')[3] : lightText(theme);
  let thumbBackground = props.checked ? theme[props.color] || props.color : 'white';

  if (props.disabled) {
    trackBackground = props.checked
      ? colorShades(theme[props.color] || props.color, 'light')[5]
      : colorShades(lightText(theme))[2];

    thumbBackground = props.checked ? colorShades(theme[props.color] || props.color, 'light')[5] : 'white';
  }

  return {
    container: css({
      display: 'inline-flex',
      alignItems: 'center',
      cursor: !props.disabled && 'pointer',
      '&:hover, &:focus': {
        '& .sha-el-switch-thumb-container': {
          opacity: !props.disabled && '.1',
        },
      },
    }),
    track: css({
      width: props.size === 'small' ? '26px' : '36px',
      height: props.size === 'small' ? '10px' : '14px',
      background: trackBackground,
      borderRadius: '7px',
      transition: 'ease-in .1s',
    }),
    thumbContainer: css({
      width: props.size === 'small' ? '28px' : '38px',
      height: props.size === 'small' ? '28px' : '38px',
      borderRadius: '50%',
      background: colorShades(theme[props.color] || props.color, 'light')[3],
      transform: `translateX(${props.checked ? '7px' : '-9.5px'})`,
      transition: 'ease-in .1s',
      position: 'relative',
      opacity: '0',
      display: 'none',
      '&:hover, &:focus': {
        opacity: !props.disabled && '.1',
      },
    }),
    input: css({
      display: 'none',
    }),
    thumb: css({
      display: 'inline-flex',
      position: 'relative',
      width: props.size === 'small' ? '14px' : '20px',
      height: props.size === 'small' ? '14px' : '20px',
      borderRadius: '50%',
      background: thumbBackground,
      transform:
        props.size === 'small'
          ? `translateX(${props.checked ? '-26px' : '-12px'})`
          : `translateX(${props.checked ? '-36px' : '-16px'})`,
      transition: 'ease-in .1s',
    }),
  };
};
