import { createUseStyles } from 'react-jss';

export const style = createUseStyles(
  {
    body: {
      position: 'fixed',
      right: '20px',
      top: '20px',
      zIndex: 10000,
    },
  },
  { name: 'sha-el-notification' },
);
