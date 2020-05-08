import * as React from 'react';
import { Portal } from '../Popover/Portal';
import { style as typeStyle, keyframes } from 'typestyle';
import { shadow } from '../../helpers/style';
import { Theme, ThemeConsumer } from '../Theme/Theme';
import { colorShades } from '../../helpers/color';

export const Modal: React.FunctionComponent<ModalProps> = (props) => {
  const { children, onClose, isVisible, style = {}, width } = props;

  if (!isVisible) {
    document.body.style.overflow = 'auto';
    document.body.style.position = '';
    return null;
  }

  document.body.style.overflow = 'hidden';
  document.body.style.position = 'relative';

  return (
    <Portal key='modal'>
      <ThemeConsumer>
        {(theme) => (
          <div key='mask' className={MaskStyle} onClick={() => onClose && onClose()}>
            <div
              key='container'
              className={containerStyle(theme)}
              style={{ ...style, width }}
              onClick={(e) => e.stopPropagation()}
            >
              <div>
                {children}
              </div>
            </div>
          </div>
        )}
      </ThemeConsumer>
    </Portal >
  );
};

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

const containerStyle = (theme: Theme) => typeStyle({
  maxHeight: '70vh',
  background: colorShades(theme.background)[1],
  zIndex: 1001,
  top: '10vh',
  boxShadow: shadow('2X', theme),
  overflowY: 'auto',
  width: '50vw',
  animation: `${slideInBottom} 0.2s cubic-bezier(0.250, 0.460, 0.450, 0.940) both`,
});

const MaskStyle = typeStyle({
  position: 'fixed',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100vw',
  height: '100vh',
  left: '0',
  right: '0',
  top: '0',
  bottom: '0',
  background: 'rgba(0, 0, 0, .3)',
});

export interface ModalProps {
  children: React.ReactElement<any>;
  width?: string;
  style?: React.CSSProperties;
  isVisible?: boolean;
  onClose?: () => void;
}
