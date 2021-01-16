import { createUseStyles } from 'react-jss';
import { shadow } from '../../helpers/style';

export const style = createUseStyles(
  {
    container: {
      position: 'relative',
      display: 'block',
      margin: 0,
      padding: 0,
      overflow: 'hidden',
      width: '300px',
    },
    carousel: {
      transition: '1s all',
    },
    item: {
      display: 'inline-block',
      width: '300px',
    },
    dotsContainer: {
      position: 'absolute',
      textAlign: 'center',
      bottom: '10px',
      margin: 'auto',
      left: 0,
      right: 0,
      width: '50%',
    },
    dots: ({ theme }) => ({
      display: 'inline-block',
      width: '20px',
      height: '5px',
      background: '#aaa',
      margin: '5px',
      borderRadius: '5px',
      cursor: 'pointer',
      transition: '.4s all',
      boxShadow: shadow('2X', theme),
      '&:hover': {
        background: '#ccc',
      },
    }),
  },
  { name: 'sha-el-carousel' },
);
