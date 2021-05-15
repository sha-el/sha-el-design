import * as React from 'react';
import { classes } from '../../helpers';
import { borderCss } from '../../helpers/border';
import { elevationCss } from '../../helpers/elevations';
import { marginCss } from '../../helpers/margin';
import { paddingCss } from '../../helpers/padding';
import { SurfaceProps } from '../../typings/surface';
import { Portal } from '../Popover/Portal';
import { useTheme } from '../Theme/Theme';
import { style as modalStyle } from './style';

export const Modal: React.FunctionComponent<ModalProps> = (props) => {
<<<<<<< HEAD
  const {
    children,
    isVisible,
    style = {},
    width,
    elevation = 24,
    padding = { xs: 2, sm: 5, md: 10 },
    margin = { xs: [2, 0], md: [4, 0] },
    border,
  } = props;
=======
  const { children, isVisible, style = {}, width, elevation = 24 } = props;
>>>>>>> Minor fixes

  const [className, updateClassName] = React.useState('');
  const [open, updateOpen] = React.useState(isVisible);
  const [lastVisible, updateLastVisible] = React.useState(open);

  const theme = useTheme();
  const css = modalStyle(theme);

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
      <div key="mask" className={css.maskStyle} onClick={() => props.onClose?.()}>
        <div
          key="container"
          className={classes(
            css.mediaQueries,
            css.modalContainer,
            elevationCss(elevation),
            borderCss(border),
            className,
          )}
          style={{ width, ...style }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={classes(paddingCss(padding), marginCss(margin))}>{children}</div>
        </div>
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
