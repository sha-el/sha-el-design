import React from 'react';
import { classes } from '../../helpers';
import { elevationCss } from '../../helpers/elevations';
import { Col, Row } from '../Grid';
import { Theme, useTheme } from '../Theme/Theme';
import { style } from './style';

export interface NavBarProps {
  /**
   * Brand Icon
   */
  icon?: React.ReactNode;

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
   * action to be displayed on right
   */
  action?: React.ReactNode;

  /**
   * Title
   */
  title?: React.ReactNode;

  /**
   * Elevation for shadow
   */
  elevation?: number;

  /**
   * Title text align
   */
  alignTitle?: React.CSSProperties['textAlign'];
}

export const NavBar: React.FC<NavBarProps> = (props) => {
  const { icon, title, action } = props;
  const theme = useTheme();
  const css = style(theme, props);

  return (
    <header style={props.style} className={classes(css.container, elevationCss(props.elevation), 'sha-el-nav-bar')}>
      <Row gutter={32} alignItems="center" className={classes(css.container)} style={{ margin: 0 }}>
        <Col flex="0 1">{icon}</Col>
        <Col className={css.title} flex="1 0">
          {title}
        </Col>
        <Col flex="0 1">{action}</Col>
      </Row>
    </header>
  );
};

NavBar.defaultProps = {
  bgColor: 'primary',
  elevation: 12,
  alignTitle: 'center',
};
