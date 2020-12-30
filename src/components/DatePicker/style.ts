import { createUseStyles } from 'react-jss';

export const style = createUseStyles(
  {
    timePicker: {
      '& .sha-el-col': {
        maxHeight: '300px',
        overflowY: 'hidden',
        cursor: 'pointer',
        minWidth: '50px',
        '&:hover': {
          overflowY: 'auto',
        },
        '& div': {
          padding: '2px',
          '&:hover': {
            background: '#ccc',
          },
        },
      },
    },
  },
  { name: 'sha-el-time-picker' },
);
