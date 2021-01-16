import { createUseStyles } from 'react-jss';
import { getColor } from '../../helpers';
import elevations from '../../helpers/elevations';
import { Theme, theming } from '../Theme/Theme';

export const container = createUseStyles(
  {
    container: {
      display: 'flex',
      position: 'relative',
    },
  },
  { name: 'sha-el-layout-container' },
);

export const content = createUseStyles(
  {
    content: ({ width }) => ({
      position: 'relative',
      minWidth: 0,
      flex: '1 0 auto',
      margin: '0 0 0 5px',
      zIndex: 0,
      minHeight: '100%',
      width: `calc(100% - ${width + 50}px)`,
      marginLeft: width + 'px',
      padding: '5px 25px',
    }),
  },
  { name: 'sha-el-layout-content' },
);

export const sidePanel = createUseStyles(
  (theme: Theme) => {
    const background = theme.background;
    const color = getColor(background);
    return {
      container: ({ width }) => ({
        position: 'fixed',
        width: width + 'px',
        flex: `0 1 60px`,
        maxHeight: '100%',
        color,
        background,
        transition: '.3s all',
        overflow: 'auto',
        zIndex: 1,
        left: 0,
        top: 0,
        overflowX: 'visible',
        overflowY: 'auto',
      }),
      logo: {
        cursor: 'pointer',
        margin: 'auto',
        marginTop: '20px',
        svg: {
          width: '100%',
        },
      },
      item: {
        margin: '20px 0',
        color,
        '*': {
          color,
          '&:hover': {
            color,
          },
        },
      },
      drawer: {
        height: '100vh',
        overflow: 'auto',
      },
      resizer: ({ width }) => ({
        position: 'fixed',
        top: '20px',
        left: width - 10 + 'px',
      }),
      line: ({ width }) => ({
        position: 'fixed',
        height: '110vh',
        left: width / 2 + 'px',
        width: '2px',
        background: theme.primary,
      }),
      bottom: {
        position: 'fixed',
        bottom: '0',
        left: '0',
        width: '60px',
        background,
        zIndex: 2,
      },
      ...elevations(theme),
    };
  },
  { theming, name: 'sha-el-side-panel' },
);
