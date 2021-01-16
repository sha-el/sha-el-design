import * as React from 'react';
import { classes } from '../../helpers';
import { Portal } from '../Popover/Portal';
import { useTheme } from '../Theme/Theme';
import { style as modalStyle } from './style';

export const Modal: React.FunctionComponent<ModalProps> = (props) => {
  const { children, onClose = () => ({}), isVisible, style = {}, width, elevation = 24 } = props;

  if (!isVisible) {
    return null;
  }

  const [className, updateClassName] = React.useState('');

  const theme = useTheme();
  const css = modalStyle(theme);

  const beforeClose = () => {
    setTimeout(onClose, 200);
    updateClassName(css.slideOutRight);
  };

  return (
    <Portal key="modal">
      <div key="mask" className={css.maskStyle} onClick={() => onClose && beforeClose()}>
        <div
          key="container"
          className={classes(css.mediaQueries, css.modalContainer, css[`elevation${elevation}`], className)}
          style={{ width, ...style }}
          onClick={(e) => e.stopPropagation()}
        >
          <div>{children}</div>
        </div>
      </div>
    </Portal>
  );
};

export interface ModalProps {
  children: React.ReactElement;
  width?: string;
  style?: React.CSSProperties;
  isVisible?: boolean;
  onClose?: () => void;
  elevation?: number;
}
