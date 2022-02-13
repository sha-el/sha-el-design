import { css } from '@emotion/css';
import { colorFromChoices } from '../../helpers/color';
import { themeVar } from '../Theme/helper';
import { SwitchProps } from './Switch';

export const style = (props: SwitchProps) => {
  let trackBackground = props.checked
    ? colorFromChoices(props.color).background
    : themeVar.neutral.neutralVariantKeyColor.outline;
  let thumbBackground = props.checked ? colorFromChoices(props.color).background : 'white';

  if (props.disabled) {
    trackBackground = themeVar.neutral.neutralVariantKeyColor.outline;

    thumbBackground = themeVar.neutral.error.disabled;
  }

  return {
    container: css({
      display: 'inline-flex',
      alignItems: 'center',
      cursor: props.disabled ? 'not-allowed' : 'pointer',
      position: 'relative',
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
      background: colorFromChoices(props.color).background,
      transform:
        props.size === 'small'
          ? `translateX(${props.checked ? '5px' : '-7.5px'})`
          : `translateX(${props.checked ? '7px' : '-9.5px'})`,
      transition: 'ease-in .1s',
      position: 'absolute',
      opacity: '0',
      '&:hover, &:focus': {
        opacity: !props.disabled && '.1',
      },
    }),
    input: css({
      display: 'none',
    }),
    thumb: css({
      display: 'inline-flex',
      position: 'absolute',
      width: props.size === 'small' ? '14px' : '20px',
      height: props.size === 'small' ? '14px' : '20px',
      borderRadius: '50%',
      background: thumbBackground,
      transform:
        props.size === 'small'
          ? `translateX(${props.checked ? '12px' : '0px'})`
          : `translateX(${props.checked ? '16px' : '0'})`,
      transition: 'ease-in .1s',
    }),
  };
};
