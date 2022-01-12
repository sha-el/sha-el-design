import React, { useState } from 'react';
import { style } from './style';
import { useTheme } from '../Theme/Theme';
import { classes } from '../../helpers';
import { elevationCss } from '../../helpers/elevations';
import { Col, Row } from '../Grid';
import { Divider } from '../Divider';
import { Switch } from '../Switch';
import { useWindowSize } from '../../helpers/Grid';
import { Drawer } from '../Drawer';
import { DrawerProps } from '../Drawer/Drawer';
import { SidePanelContext } from '../Layout/Container';

export interface SidebarProps {
  /**
   * Container classname
   */
  className?: string;

  /**
   * Whether Sidebar can be collapsed
   */
  collapsible?: boolean;

  /**
   * Shadow elevation
   */
  elevation?: number;

  /**
   * Brand Icon
   */
  brandIcon?: React.ReactNode;

  /**
   * Brancd text
   */
  brandText?: React.ReactNode;

  /**
   * Collapsed width
   */
  collapsedWidth?: number;

  /**
   * Width when expanded
   */
  expandWidth?: number;

  /**
   * Drawer placement
   */
  placement?: DrawerProps['placement'];

  /**
   * Bottom list
   */
  bottom?: React.ReactNode;

  /**
   * Open Drawer in mobile view
   */
  drawerOpen?: boolean;

  /**
   * Drawer change hanlde
   */
  onDrawerChange?: (e: boolean) => void;

  /**
   * responsive
   */
  responsive?: boolean;
}

export const Sidebar: React.FC<SidebarProps> = (props) => {
  const theme = useTheme();
  const [fixed, updateFixed] = useState(false);
  const css = style(props, theme, fixed);
  const { width } = useWindowSize();

  const content = () => (
    <SidePanelContext.Consumer>
      {({ updateWidth }) => (
        <div className={css.sidebar}>
          {(props.brandIcon || props.brandText) && (
            <div className={css.logo}>
              <Row gutter={10} alignItems="center">
                <Col flex="0 1 auto">{props.brandIcon}</Col>
                <Col flex="1 0 auto">{props.brandText}</Col>
                {width > 1199 && (
                  <Col flex="0 1 auto">
                    <Switch
                      checked={fixed}
                      onChange={(e) => {
                        updateWidth?.(e.target.checked ? props.expandWidth : props.collapsedWidth);
                        return updateFixed(e.target.checked);
                      }}
                    />
                  </Col>
                )}
                <Col flex="0 1 auto" />
              </Row>
              <Divider />
            </div>
          )}
          {props.children}
          <div className={classes(css.bottom, 'sidebar-bottom')}>{props.bottom}</div>
        </div>
      )}
    </SidePanelContext.Consumer>
  );

  if (width < 1200 && props.responsive) {
    return (
      <div className="sha-el-sidebar">
        <Drawer
          padding={10}
          placement={props.placement}
          isVisible={props.drawerOpen}
          onClose={() => props.onDrawerChange?.(false)}
        >
          {content()}
        </Drawer>
      </div>
    );
  }

  return (
    <div className={classes(css.container, css.sidebar, elevationCss(props.elevation), 'sha-el-sidebar')}>
      {content()}
    </div>
  );
};

Sidebar.defaultProps = {
  elevation: 12,
  collapsedWidth: 50,
  expandWidth: 200,
};
