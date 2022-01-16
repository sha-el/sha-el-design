import { css } from '@emotion/css';

export const container = css({
  display: 'flex',
  position: 'relative',
});

export const content = (width: number) =>
  css({
    position: 'relative',
    minWidth: 0,
    flex: '1 0 auto',
    minHeight: '100%',
    width: `calc(100% - ${width + 30}px)`,
    marginLeft: width + 'px',
    margin: `5px 5px 5px ${width + (width === 0 ? 0 : 38) + 'px'}`,
  });
