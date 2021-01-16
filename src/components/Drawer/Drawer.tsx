import * as React from 'react';
import { classes } from '../../helpers';
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
          style={props.style?.container}
          className={classes(
            css.drawerStyle,
            css[`slideIn${props.placement.charAt(0).toUpperCase() + props.placement.slice(1)}` || 'slideInRight'],
            css[`elevation${elevation}`],
            className,
          )}
        >
          {props.header && (
            <div style={props.style?.header} className="header">
              {props.header}
            </div>
          )}

          <div style={props.style?.body} className="body">
            {props.children}
          </div>

          {props.footer && (
            <div style={props.style?.footer} className="footer">
              {props.footer}
            </div>
          )}
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
   * Footer of Drawer
   */
  footer?: React.ReactNode;

  /**
   * header of Drawer
   */
  header?: React.ReactNode;

  /**
   * Styles for all types of container
   */
  style?: {
    header?: React.CSSProperties;
    body?: React.CSSProperties;
    footer?: React.CSSProperties;
    container?: React.CSSProperties;
  };
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
