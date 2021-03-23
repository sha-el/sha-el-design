import { css } from '@emotion/css';
import { Theme } from '../Theme/Theme';

export const style = (theme: Theme) =>
  css({
    background: theme.background,
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
