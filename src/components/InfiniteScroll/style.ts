import { css } from '@emotion/css';

export const style = (height: string | number) => {
  return {
    container: css({
      height: height || 'auto',
      overflow: height ? 'auto' : 'hidden',
      position: 'relative',
    }),
    loadingIndicator: css({
      marginBottom: '20px',
      position: 'relative',
      margin: 'auto',
      left: 0,
      right: 0,
    }),
    loadingContainer: css({
      position: 'relative',
    }),
  };
};
