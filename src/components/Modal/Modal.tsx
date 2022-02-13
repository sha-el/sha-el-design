import * as React from 'react';
import { classes } from '../../helpers';
import { surfaceProps } from '../../helpers/surface';
import { SurfaceProps } from '../../typings/surface';
import { Card } from '../Card';
import { Portal } from '../Portal/Portal';
import { style as modalStyle } from './style';

export const Modal: React.FunctionComponent<ModalProps> = (props) => {
  const { children, isVisible, style = {}, width } = props;

  const [className, updateClassName] = React.useState('');
  const [open, updateOpen] = React.useState(isVisible);
  const [lastVisible, updateLastVisible] = React.useState(open);

  const css = modalStyle();

  const onHide = () => {
    setTimeout(() => updateOpen(false), 200);
    updateClassName(css.slideOutRight);
    setTimeout(() => updateClassName(''), 200);
  };

  React.useEffect(() => {
    if (!isVisible && lastVisible) {
      onHide();
    }
    updateLastVisible(isVisible);
    if (isVisible) {
      updateOpen(true);
    }
  }, [isVisible]);

  if (!open) {
    return null;
  }

  return (
    <Portal key="modal">
      <div key="mask" className={classes(css.maskStyle, 'sha-el-modal')} onClick={() => props.onClose?.()}>
        <Card
          key="container"
          className={classes(css.mediaQueries, css.modalContainer, className)}
          style={{ width, ...style }}
          onClick={(e) => e.stopPropagation()}
          {...surfaceProps(props)}
        >
          {children}
        </Card>
      </div>
    </Portal>
  );
};

export interface ModalProps extends SurfaceProps {
  children: React.ReactElement;
  width?: string;
  style?: React.CSSProperties;
  isVisible?: boolean;
  onClose?: () => void;
}
