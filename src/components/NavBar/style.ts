import { css } from '@emotion/css';
import { getColor } from '../../helpers/color';
import { Theme } from '../Theme/Theme';
import { NavBarProps } from './NavBar';

export const style = (theme: Theme, props: NavBarProps) => {
  return {
    container: css({
      background: theme[props.bgColor] || props.bgColor,
      width: '100%',
      height: '64px',
      color: getColor(theme[props.bgColor] || props.bgColor),
      fontSize: '24px',
    }),
    icon: css({
      // fontSize: '24px',
    }),
    title: css({
      textAlign: props.alignTitle,
      fontSize: '36px',
      fontWeight: 300,
    }),
  };
};
