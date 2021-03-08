import { css } from '@emotion/css';

export const style = css({
  '& .sha-el-col': {
    maxHeight: '300px',
    overflowY: 'hidden',
    cursor: 'pointer',
    minWidth: '50px',
    scrollBehavior: 'smooth',
    '&:hover': {
      overflowY: 'auto',
    },
    '& p': {
      '&:hover': {
        background: '#ccc',
      },
    },
    '&.hour-column, &.min-column, &.sec-column': {
      borderRight: '1px solid #eee',
    },
  },
});
