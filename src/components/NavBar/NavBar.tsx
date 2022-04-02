import React from 'react';
import { classes } from '../../helpers';
import { SurfaceProps } from '../../typings/surface';
import { addSurfaceCss } from '../../helpers/surface';
import { style } from './style';

export interface NavBarProps extends SurfaceProps {
  /**
   * Style
   */
  style?: React.CSSProperties;
  /**
   * Nav bar content
   */
  children?: React.ReactNode;
}

export const NavBar: React.FC<NavBarProps> = (props) => {
  const css = style();

  return (
    <header style={props.style} className={classes(css.container, ...addSurfaceCss(props), 'sha-el-nav-bar')}>
      {props.children}
    </header>
  );
};

NavBar.defaultProps = {
  elevation: 12,
  filled: 'neutral',
};
