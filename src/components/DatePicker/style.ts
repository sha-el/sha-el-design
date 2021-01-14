import { createUseStyles } from 'react-jss';

export const style = createUseStyles(
  {
    timePicker: {
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
    },
  },
  { name: 'sha-el-time-picker' },
);
