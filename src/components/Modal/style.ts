import { createUseStyles } from 'react-jss';
import { colorShades } from '../../helpers/color';
import elevations from '../../helpers/elevations';
import { Theme, theming } from '../Theme/Theme';

export const style = createUseStyles(
  (theme: Theme) => ({
    '@keyframes slideInBottom': {
      '0%': {
        transform: 'translateY(120vh)',
        opacity: 0,
      },
      '100%': {
        transform: 'translateY(0)',
        opacity: 1,
      },
    },
    '@keyframes slideOutRight': {
      '0%': {
        transform: 'translateY(0)',
      },
      '100%': {
        transform: 'translateY(120vh)',
      },
    },
    slideOutRight: {
      animation: `$slideOutRight .2s ease-in both !important`,
    },
    modalContainer: {
      maxHeight: '70vh',
      background: colorShades(theme.background)[1],
      zIndex: 1001,
      top: '10vh',
      overflowY: 'auto',
      animation: `$slideInBottom 0.2s cubic-bezier(0.250, 0.460, 0.450, 0.940) both`,
      borderRadius: '2px',
    },
    ...elevations(theme),
    maskStyle: {
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
    },
    mediaQueries: {
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
    },
  }),
  { theming, name: 'sha-el-modal' },
);
