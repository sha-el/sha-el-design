import { Theme, theming } from '../Theme/Theme';
import elevations from '../../helpers/elevations';
import { createUseStyles } from 'react-jss';

export const style = createUseStyles(
  (theme: Theme) => ({
    drawerStyle: {
      position: 'fixed',
      boxSizing: 'border-box',
      background: theme.background,
      zIndex: 1000,
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
    },
    maskStyle: {
      position: 'fixed',
      width: '100%',
      height: '100%',
      left: '0',
      right: '0',
      top: '0',
      bottom: '0',
      background: 'rgba(0, 0, 0, 0.5)',
    },
    ...elevations(theme),

    '@keyframes slideOutRight': {
      '0%': {
        transform: 'translateX(0)',
      },
      '100%': {
        transform: 'translateX(120vw)',
      },
    },
    '@keyframes slideOutLeft': {
      '0%': {
        transform: 'translateX(0)',
      },
      '100%': {
        transform: 'translateX(-1000px)',
      },
    },
    '@keyframes slideOutTop': {
      '0%': {
        transform: 'translateY(0)',
      },
      '100%': {
        transform: 'translateY(-1000px)',
      },
    },
    '@keyframes slideOutBottom': {
      '0%': {
        transform: 'translateY(0)',
      },
      '100%': {
        transform: 'translateY(120vh)',
      },
    },
    '@keyframes slideInRight': {
      '0%': {
        transform: 'translateX(120vw)',
        opacity: 0,
      },
      '100%': {
        transform: 'translateX(0)',
        opacity: 1,
      },
    },
    '@keyframes slideInLeft': {
      '0%': {
        transform: 'translateX(-1000px)',
        opacity: 0,
      },
      '100%': {
        transform: 'translateX(0)',
        opacity: 1,
      },
    },
    '@keyframes slideInTop': {
      '0%': {
        transform: 'translateY(-1000px)',
        opacity: 0,
      },
      '100%': {
        transform: 'translateY(0)',
        opacity: 1,
      },
    },
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
    slideOutRight: {
      animation: '$slideOutRight .5s ease-in both !important',
    },
    slideOutLeft: {
      animation: '$slideOutLeft .5s ease-in both !important',
    },
    slideOutTop: {
      animation: '$slideOutTop .5s ease-in both !important',
    },
    slideOutBottom: {
      animation: '$slideOutBottom .5s ease-in both !important',
    },
    slideInRight: {
      right: '0',
      top: '0',
      width: 'auto',
      height: '100%',
      animation: `$slideInRight 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both`,
      '& .body': {
        height: '100%',
      },
    },
    slideInLeft: {
      left: '0',
      width: 'auto',
      height: '100%',
      top: '0',
      animation: `$slideInLeft 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both`,
      '& .body': {
        height: '100%',
      },
    },
    slideInTop: {
      top: '0',
      width: '100%',
      height: 'auto',
      left: 0,
      animation: `$slideInTop 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both`,
    },
    slideInBottom: {
      bottom: '0',
      width: '100%',
      height: 'auto',
      left: 0,
      animation: `$slideInBottom 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both`,
    },
  }),
  { theming, name: 'sha-el-drawer' },
);
