import { css } from '@emotion/css';

export const container = css({
  display: 'flex',
  position: 'relative',
});

export const content = (width: number) =>
  css({
    position: 'relative',
    minWidth: 0,
    flex: '1',
    minHeight: '100%',
    marginLeft: width + (width === 0 ? 0 : 20) + 'px',
    padding: '0 28px',
    boxSizing: 'border-box',
  });
