import * as React from 'react';
import { classes } from '../../helpers';
import { elevationCss } from '../../helpers/elevations';
import { Portal } from '../Popover/Portal';
import { useTheme } from '../Theme/Theme';
import { style } from './style';

export const Drawer: React.FunctionComponent<DrawerProps> = (props) => {
  const { elevation = 24, onClose = () => ({}) } = props;

  if (!props.isVisible) {
    return null;
  }

  const [className, updateClassName] = React.useState('');

  const theme = useTheme();
  const css = style(theme);

  const beforeClose = () => {
    setTimeout(onClose, 200);
    updateClassName(
      css[`slideOut${props.placement.charAt(0).toUpperCase() + props.placement.slice(1)}` || 'slideOutRight'],
    );
  };

  return (
    <Portal>
      <>
        <div className={css.maskStyle} onClick={() => props.onClose && beforeClose()} />
        <div
          style={props.style}
          className={classes(
            css.drawerStyle,
            css[`slideIn${props.placement.charAt(0).toUpperCase() + props.placement.slice(1)}` || 'slideInRight'],
            elevationCss(elevation),
            className,
          )}
        >
          {props.children}
        </div>
      </>
    </Portal>
  );
};

Drawer.defaultProps = {
  placement: 'right',
  style: {},
};

export interface DrawerProps {
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
  elevation?: number;
}
