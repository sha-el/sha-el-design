import { css } from '@emotion/css';
import { getColor } from '../../helpers';
import { Theme } from '../Theme/Theme';

export const container = css({
  display: 'flex',
  position: 'relative',
});

export const content = (width: number) =>
  css({
    position: 'relative',
    minWidth: 0,
    flex: '1 0 auto',
    margin: '0 0 0 5px',
    zIndex: 0,
    minHeight: '100%',
    width: `calc(100% - ${width + 50}px)`,
    marginLeft: width + 'px',
    padding: '5px 25px',
  });

export const sidePanel = (theme: Theme, width: number) => {
  const background = theme.background;
  const color = getColor(background);

  return {
    container: css({
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
    logo: css({
      cursor: 'pointer',
      margin: 'auto',
      marginTop: '20px',
      svg: {
        width: '100%',
      },
    }),
    item: css({
      margin: '20px 0',
      color,
      '*': {
        color,
        '&:hover': {
          color,
        },
      },
    }),
    drawer: css({
      height: '100vh',
      overflow: 'auto',
    }),
    resizer: css({
      position: 'fixed',
      top: '20px',
      left: width - 10 + 'px',
    }),
    line: css({
      position: 'fixed',
      height: '110vh',
      left: width / 2 + 'px',
      width: '2px',
      background: theme.primary,
    }),
    bottom: css({
      position: 'fixed',
      bottom: '0',
      left: '0',
      width: '60px',
      background,
      zIndex: 2,
    }),
  };
};
