import { css } from '@emotion/css';
import { getColor } from '../../helpers';
import { lightText } from '../../helpers/color';
import { shadow } from '../../helpers/style';
import { Theme } from '../Theme/Theme';
import { TagProps } from './Tag';

const borderStyle = (props: TagProps, theme: Theme) => {
  const background = props.color === 'light' ? lightText(theme) : theme[props.color] || props.color;
  const color = props.textColor === 'light' ? lightText(theme) : theme[props.textColor] || props.textColor;

  if (!props.outline) {
    return {
      background,
      color: color || getColor(props.color),
    };
  }

  return {
    border: '1px solid ' + color,
    color: color || background,
  };
};

const sizeCss = (size: TagProps['size']) => {
  if (size === 'DEFAULT') {
    return {
      padding: '0 20px',
      minWidth: '64px',
      lineHeight: '36px',
      height: '36px',
      fontSize: '0.8125rem',
    };
  }

  return {
    padding: '0 14px',
    minWidth: '50px',
    lineHeight: '22px',
    height: '22px',
    fontSize: '0.7125rem',
  };
};

export const chipIconCss = css({
  chipIcon: {
    marginLeft: '5px',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export const style = ({ props, theme }: { props: TagProps; theme: Theme }) =>
  css({
    ...borderStyle(props, theme),
    ...sizeCss(props.size),
    fontWeight: 500,
    margin: '5px',
    display: 'inline-flex',
    boxShadow: shadow('DEFAULT', theme),
    cursor: props.onClick ? 'pointer' : 'default',
    textTransform: 'uppercase',
    textAlign: 'center',
    borderRadius: props.chips ? '16px' : '4px',
    letterSpacing: '0.02857em',
    boxSizing: 'border-box',
    alignItems: 'center',
  });
