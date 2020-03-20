import * as React from 'react';
import { Portal } from '../Popover/Portal';
import { style, keyframes } from 'typestyle';
import { NestedCSSProperties } from 'typestyle/lib/types';

export const Drawer: React.FunctionComponent<DrawerProps> = (props) => {
  if (!props.isVisible) {
    return null;
  }

  return (
    <Portal>
      <div className={MaskStyle} onClick={() => props.onClose && props.onClose()} />
      <div style={props.style.container} className={DrawerStyle(props)}>
        {props.header && <div style={props.style.header} className='header'>
          {props.header}
        </div>}

        <div style={props.style.body} className='body'>{props.children}</div>

        {props.footer && <div style={props.style.footer} className='footer'>
          {props.footer}
        </div>}
      </div>
    </Portal>
  );
};

const MaskStyle = style({
  position: 'absolute',
  width: '100%',
  height: '100%',
  left: '0',
  right: '0',
  top: '0',
  bottom: '0',
  background: 'rgba(0, 0, 0, .3)',
});

const DrawerStyle = (props: DrawerProps) => {
  const styles: NestedCSSProperties[] = [{
    position: 'absolute',
    boxSizing: 'border-box',
    background: 'white',
    zIndex: 1000,
    $nest: {
      '& .header': {
        padding: '16px 24px',
        borderBottom: '1px solid #ccc',
      },
      '& .body': {
        padding: '16px 24px',
      },
      '& .footer': {
        padding: '16px 24px',
        borderTop: '1px solid #ccc',
      },
    },
  }];

  const slideInLeft = keyframes({
    '0%': {
      transform: 'translateX(-1000px)',
      opacity: 0,
    },
    '100%': {
      transform: 'translateX(0)',
      opacity: 1,
    },
  });

  const slideInRight = keyframes({
    '0%': {
      transform: 'translateX(120vw)',
      opacity: 0,
    },
    '100%': {
      transform: 'translateX(0)',
      opacity: 1,
    },
  });

  const slideInTop = keyframes({
    '0%': {
      transform: 'translateY(-1000px)',
      opacity: 0,
    },
    '100%': {
      transform: 'translateY(0)',
      opacity: 1,
    },
  });

  const slideInBottom = keyframes({
    '0%': {
      transform: 'translateY(120vh)',
      opacity: 0,
    },
    '100%': {
      transform: 'translateY(0)',
      opacity: 1,
    },
  });

  ({
    top: () => styles.push({
      top: '0',
      width: '100%',
      animation: `${slideInTop} 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both`,
    }),
    bottom: () => styles.push({
      bottom: '0',
      width: '100%',
      animation: `${slideInBottom} 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both`,
    }),
    left: () => styles.push({
      left: '0',
      width: 'auto',
      height: '100%',
      top: '0',
      animation: `${slideInLeft} 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both`,
    }),
    right: () => styles.push({
      right: '0',
      top: '0',
      width: 'auto',
      height: '100%',
      animation: `${slideInRight} 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both`,
    }),
  })[props.placement]();

  return style(...styles);
};

Drawer.defaultProps = {
  placement: 'right',
  style: {},
};

interface DrawerProps {
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
   * Shoould close wjen clicked on mask
   * Displays X on top when true
   */
  closable?: boolean;
  /**
   * Callback to be triggered when clicked on close(X) or on mask
   */
  onClose?: () => void;
}