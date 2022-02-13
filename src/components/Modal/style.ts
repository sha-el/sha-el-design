import { css, keyframes } from '@emotion/css';
import { zLayoutModal, zLayoutModalBackDrop } from '../../helpers/zIndex';

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

export const style = () => ({
  slideOutRight: css({
    animation: `${slideOutRight} .2s ease-in both !important`,
  }),
  modalContainer: css({
    maxHeight: '70vh',
    zIndex: zLayoutModal,
    top: '10vh',
    overflowY: 'auto',
    animation: `${slideInBottom} 0.2s cubic-bezier(0.250, 0.460, 0.450, 0.940) both`,
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
