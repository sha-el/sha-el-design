import { css } from '@emotion/css';
import Color from 'color';
import { lightText } from '../../helpers/color';
import { shadow } from '../../helpers/style';
import { Theme } from '../Theme/Theme';
import { TagProps } from './Tag';

const borderStyle = (props: TagProps, theme: Theme) => {
  const background = props.color === 'light' ? lightText(theme) : theme[props.color] || props.color;
  const textColor = props.textColor === 'light' ? lightText(theme) : theme[props.textColor] || props.textColor;

  if (!props.outline) {
    return {
      background: Color(background).lighten(0.8).toString(),
      color: textColor || background,
      border: '1px solid ' + background,
    };
  }

  return {
    border: '1px solid ' + background,
    color: textColor || background,
  };
};

const sizeCss = () => {
  return {
    padding: '0 7px',
    lineHeight: '22px',
    height: '22px',
    fontSize: '12px',
  };
};

export const style = ({ props, theme }: { props: TagProps; theme: Theme }) => ({
  chipIcon: css({
    marginLeft: '5px',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    '& > svg': {
      height: '14px',
      width: '14px',
    },
  }),
  tag: css({
    ...borderStyle(props, theme),
    ...sizeCss(),
    fontWeight: 'bold',
    margin: '5px',
    marginLeft: '0',
    boxShadow: shadow('DEFAULT', theme),
    cursor: props.onClick ? 'pointer' : 'default',
    textTransform: 'uppercase',
    textAlign: 'center',
    borderRadius: props.chips ? '2px' : '2px',
    boxSizing: 'border-box',
    transition: 'all .3s',
    whiteSpace: 'nowrap',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    letterSpacing: '1px',
  }),
  icon: css({
    marginRight: '5px',
  }),
});
