import * as React from 'react';
import { classes } from '../../helpers';
import { SurfaceProps } from '../../typings/surface';
import { Card } from '../Card';
import { Portal } from '../Portal/Portal';
import { style } from './style';

export const Drawer: React.FunctionComponent<DrawerProps> = (props) => {
  const { elevation = 24, padding = { xs: 5, sm: 10, md: 15, lg: 20 }, border, onClose = () => ({}) } = props;

  if (!props.isVisible) {
    return null;
  }

  const [className, updateClassName] = React.useState('');

  const css = style();

  const beforeClose = () => {
    setTimeout(onClose, 200);
    updateClassName(
      css[`slideOut${props.placement.charAt(0).toUpperCase() + props.placement.slice(1)}` || 'slideOutRight'],
    );
  };

  return (
    <Portal>
      <>
        <div className={classes(css.maskStyle, 'sha-el-drawer')} onClick={() => props.onClose && beforeClose()} />
        <Card
          elevation={elevation}
          padding={padding}
          border={border}
          margin={0}
          style={props.style}
          className={classes(
            css.drawerStyle,
            css[`slideIn${props.placement.charAt(0).toUpperCase() + props.placement.slice(1)}` || 'slideInRight'],
            className,
          )}
        >
          {props.children}
        </Card>
      </>
    </Portal>
  );
};

Drawer.defaultProps = {
  placement: 'right',
  style: {},
};

export interface DrawerProps extends Omit<SurfaceProps, 'margin'> {
  /**
   * Placement of Drawer
   */
  placement?: 'right' | 'left' | 'bottom' | 'top';

  children: React.ReactNode;

  /**
   * Style
   */
  style?: React.CSSProperties;
  /**
   * Weather Drawer is visible or not
   */
  isVisible?: boolean;
  /**
   * Callback to be triggered when clicked on close(X) or on mask
   */
  onClose?: () => void;
}
