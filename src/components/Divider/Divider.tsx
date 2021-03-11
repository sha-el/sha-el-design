import * as React from 'react';
import { classes } from '../../helpers';
import { useTheme } from '../Theme/Theme';
import { style } from './style';

export const Divider: React.FC<DividerProps> = (props) => {
  const theme = useTheme();
  const color = props.color;
  const css = style(color, theme);

  return (
    <div
      style={props.style}
      className={classes(css.divider, props.children ? css.psuedoWithChild : css.psuedoWithoutChild, props.className)}
    >
      {props.children}
    </div>
  );
};

Divider.defaultProps = {
  className: '',
};

export interface DividerProps {
  style?: React.CSSProperties;
  className?: string;
  color?: string;
}
