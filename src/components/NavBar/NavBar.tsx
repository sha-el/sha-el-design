import React from 'react';
import { classes } from '../../helpers';
import { elevationCss } from '../../helpers/elevations';
import { Theme, useTheme } from '../Theme/Theme';
import { style } from './style';

export interface NavBarProps {
  /**
   * Style
   */
  style?: React.CSSProperties;

  /**
   * Background color
   * @accepts "primary", "secondary" or any color code
   */
  bgColor?: keyof Theme | string;

  /**
   * Elevation for shadow
   */
  elevation?: number;

  /**
   * Nav bar content
   */
  children?: React.ReactNode;
}

export const NavBar: React.FC<NavBarProps> = (props) => {
  const theme = useTheme();
  const css = style(theme, props);

  return (
    <header style={props.style} className={classes(css.container, elevationCss(props.elevation), 'sha-el-nav-bar')}>
      {props.children}
    </header>
  );
};

NavBar.defaultProps = {
  bgColor: 'primary',
  elevation: 12,
};
