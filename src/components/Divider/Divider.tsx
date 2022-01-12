import * as React from 'react';
import { classes } from '../../helpers';
import { useTheme } from '../Theme/Theme';
import { style } from './style';

export const Divider: React.FC<DividerProps> = (props) => {
  const theme = useTheme();
  const color = props.color;
  const css = style(color, theme, props);

  return (
    <div
      style={props.style}
      className={classes(
        props.orientation === 'vertical' ? css.dividerVertical : css.divider,
        props.children ? css.psuedoWithChild : css.psuedoWithoutChild,
        props.className,
      )}
    >
      {props.children}
    </div>
  );
};

Divider.defaultProps = {
  className: '',
  orientation: 'horizontal',
};

export interface DividerProps {
  style?: React.CSSProperties;
  className?: string;
  color?: string;
  orientation?: string;
}
