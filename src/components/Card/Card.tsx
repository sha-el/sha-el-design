import * as React from 'react';
import { useTheme } from '../Theme/Theme';
import { classes } from '../../helpers';
import { cardStyle } from './style';
import { elevationCss } from '../../helpers/elevations';

export const Card: React.FC<CardProps> = (props) => {
  const { className, elevation = 4, ...rest } = props;

  const theme = useTheme();
  const css = cardStyle(theme);

  return (
    <div className={classes(className, css, elevationCss(elevation))} {...rest}>
      {props.children}
    </div>
  );
};

export interface CardProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children?: React.ReactNode;
  elevation?: number;
}
