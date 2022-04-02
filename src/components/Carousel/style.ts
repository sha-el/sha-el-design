import { css } from '@emotion/css';

export const style = () => ({
  container: css({
    position: 'relative',
    display: 'block',
    margin: 0,
    padding: 0,
    overflow: 'hidden',
    width: '300px',
  }),
  carousel: css({
    transition: '1s all',
  }),
  item: css({
    display: 'inline-block',
    width: '300px',
  }),
  dotsContainer: css({
    position: 'absolute',
    textAlign: 'center',
    bottom: '10px',
    margin: 'auto',
    left: 0,
    right: 0,
    width: '50%',
  }),
  dots: css({
    display: 'inline-block',
    width: '20px',
    height: '5px',
    background: '#aaa',
    margin: '5px',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: '.4s all',
    '&:hover': {
      background: '#ccc',
    },
  }),
});
