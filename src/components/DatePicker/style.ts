import { css } from '@emotion/css';
import { themeVar } from '../Theme/helper';

export const style = () =>
  css({
    background: themeVar.neutral.neutralKeyColor.surface,
    '& .sha-el-col': {
      maxHeight: '250px',
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
