import { css } from '@emotion/css';
import { getColor, lightText } from '../../helpers/color';
import { Theme } from '../Theme/Theme';
import { TagProps } from './Tag';

const borderStyle = (props: TagProps, theme: Theme) => {
  const background = props.color === 'light' ? lightText(theme) : theme[props.color] || props.color;
  const textColor = props.textColor === 'light' ? lightText(theme) : theme[props.textColor] || props.textColor;

  if (!props.outline) {
    return {
      background: background,
      color: textColor || getColor(background),
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
    height: '26px',
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
    cursor: props.onClick ? 'pointer' : 'default',
    textTransform: 'uppercase',
    textAlign: 'center',
    borderRadius: props.chips ? '16px' : '2px',
    boxSizing: 'border-box',
    transition: 'all .3s',
    whiteSpace: 'nowrap',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    letterSpacing: '1px',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  }),
  icon: css({
    marginRight: '5px',
  }),
});
