import { Theme } from '../Theme/Theme';
import { css, keyframes } from '@emotion/css';
import { zLayoutModal, zLayoutModalBackDrop } from '../../helpers/zIndex';

const slideOutRight = keyframes({
  '0%': {
    transform: 'translateX(0)',
  },
  '100%': {
    transform: 'translateX(120vw)',
  },
});

const slideOutLeft = keyframes({
  '0%': {
    transform: 'translateX(0)',
  },
  '100%': {
    transform: 'translateX(-1000px)',
  },
});

const slideOutTop = keyframes({
  '0%': {
    transform: 'translateY(0)',
  },
  '100%': {
    transform: 'translateY(-1000px)',
  },
});

const slideOutBottom = keyframes({
  '0%': {
    transform: 'translateY(0)',
  },
  '100%': {
    transform: 'translateY(120vh)',
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

export const style = (theme: Theme) => ({
  drawerStyle: css({
    position: 'fixed',
    boxSizing: 'border-box',
    background: theme.background,
    zIndex: zLayoutModal,
    height: '100%',
    '& .header': {
      padding: '16px 24px',
      borderBottom: '1px solid #ccc',
    },
    '& .body': {
      padding: '16px 24px',
      overflowY: 'auto',
      overflowX: 'auto',
    },
    '& .footer': {
      padding: '16px 24px',
      borderTop: '1px solid #ccc',
    },
  }),
  maskStyle: css({
    position: 'fixed',
    width: '100%',
    height: '100%',
    left: '0',
    right: '0',
    top: '0',
    bottom: '0',
    background: 'rgba(0, 0, 0, 0.5)',
    zIndex: zLayoutModalBackDrop,
  }),
  slideOutRight: css({
    animation: `${slideOutRight} .5s ease-in both !important`,
  }),
  slideOutLeft: css({
    animation: `${slideOutLeft} .5s ease-in both !important`,
  }),
  slideOutTop: css({
    animation: `${slideOutTop} .5s ease-in both !important`,
  }),
  slideOutBottom: css({
    animation: `${slideOutBottom} .5s ease-in both !important`,
  }),
  slideInRight: css({
    right: '0',
    top: '0',
    width: 'auto',
    height: '100%',
    animation: `${slideInRight} 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both`,
    '& .body': {
      height: '100%',
    },
  }),
  slideInLeft: css({
    left: '0',
    width: 'auto',
    height: '100%',
    top: '0',
    animation: `${slideInLeft} 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both`,
    '& .body': {
      height: '100%',
    },
  }),
  slideInTop: css({
    top: '0',
    width: '100%',
    height: 'auto',
    left: 0,
    animation: `${slideInTop} 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both`,
  }),
  slideInBottom: css({
    bottom: '0',
    width: '100%',
    height: 'auto',
    left: 0,
    animation: `${slideInBottom} 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both`,
  }),
});
