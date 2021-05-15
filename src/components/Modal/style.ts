import { css, keyframes } from '@emotion/css';
import { colorShades } from '../../helpers/color';
import { zLayoutModal, zLayoutModalBackDrop } from '../../helpers/zIndex';
import { Theme } from '../Theme/Theme';

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

const slideOutRight = keyframes({
  '0%': {
    transform: 'translateY(0)',
  },
  '100%': {
    transform: 'translateY(120vh)',
  },
});

export const style = (theme: Theme) => ({
  slideOutRight: css({
    animation: `${slideOutRight} .2s ease-in both !important`,
  }),
  modalContainer: css({
    maxHeight: '70vh',
    background: colorShades(theme.background)[1],
    zIndex: zLayoutModal,
    top: '10vh',
    overflowY: 'auto',
    animation: `${slideInBottom} 0.2s cubic-bezier(0.250, 0.460, 0.450, 0.940) both`,
    borderRadius: '2px',
  }),
  maskStyle: css({
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
    zIndex: zLayoutModalBackDrop,
  }),
  mediaQueries: css({
    '@media (max-width: 768px)': {
      width: '99vw',
    },
    '@media (min-width: 768px)': {
      width: '80vw',
    },
    '@media (min-width: 992px)': {
      width: '70vw',
    },
    '@media (min-width: 1200px)': {
      width: '50vw',
    },
  }),
});
