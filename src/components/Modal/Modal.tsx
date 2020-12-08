import * as React from 'react';
import { Portal } from '../Popover/Portal';
import { style as typeStyle, stylesheet, keyframes, classes, style, media } from 'typestyle';
import { Theme, ThemeConsumer } from '../Theme/Theme';
import { colorShades } from '../../helpers/color';
import elevations from '../../helpers/elevations';

export const Modal: React.FunctionComponent<ModalProps> = (props) => {
  const { children, onClose = () => ({}), isVisible, style = {}, width, elevation = 24 } = props;

  if (!isVisible) {
    return null;
  }

  const [className, updateClassName] = React.useState('');

  const beforeClose = () => {
    const slideOutRight = keyframes({
      '0%': {
        transform: 'translateY(0)',
      },
      '100%': {
        transform: 'translateY(120vh)',
      },
    });

    setTimeout(onClose, 200);

    updateClassName(
      typeStyle({
        animation: `${slideOutRight} .2s ease-in both !important`,
      }),
    );
  };

  return (
    <Portal key="modal">
      <ThemeConsumer>
        {(theme) => {
          const css = modalStyle(theme);
          return (
            <div key="mask" className={MaskStyle} onClick={() => onClose && beforeClose()}>
              <div
                key="container"
                className={classes(mediaQueries, css.container, css[`elevation${elevation}`], className)}
                style={{ width, ...style }}
                onClick={(e) => e.stopPropagation()}
              >
                <div>{children}</div>
              </div>
            </div>
          );
        }}
      </ThemeConsumer>
    </Portal>
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

const mediaQueries = style(
  media(
    {
      maxWidth: 768,
    },
    {
      width: '99vw',
    },
  ),
  media(
    {
      minWidth: 768,
    },
    {
      width: '80vw',
    },
  ),
  media(
    {
      minWidth: 992,
    },
    {
      width: '70vw',
    },
  ),
  media(
    {
      minWidth: 1200,
    },
    {
      width: '50vw',
    },
  ),
);

const modalStyle = (theme: Theme) => {
  return stylesheet({
    container: {
      maxHeight: '70vh',
      background: colorShades(theme.background)[1],
      zIndex: 1001,
      top: '10vh',
      overflowY: 'auto',
      animation: `${slideInBottom} 0.2s cubic-bezier(0.250, 0.460, 0.450, 0.940) both`,
      borderRadius: '2px',
    },
    ...elevations(theme),
  });
};

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
  background: 'rgba(0, 0, 0, .5)',
  zIndex: 1,
});

export interface ModalProps {
  children: React.ReactElement;
  width?: string;
  style?: React.CSSProperties;
  isVisible?: boolean;
  onClose?: () => void;
  elevation?: number;
}
