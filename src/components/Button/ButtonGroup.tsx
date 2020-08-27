import * as React from 'react';
import { style as typeStyle } from 'typestyle';

export const ButtonGroup: React.FC<unknown> = (props) => {
  return <div className={style}>{props.children}</div>;
};

const style = typeStyle({
  $nest: {
    button: {
      borderRadius: '0',
      $nest: {
        '&:first-child': {
          borderRadius: '5px 0 0 5px',
        },
        '&:last-child': {
          borderRadius: '0 5px 5px 0',
        },
      },
    },
    a: {
      boxSizing: 'border-box',
      borderRadius: '0',
      $nest: {
        '&:first-child': {
          borderRadius: '5px 0 0 5px',
        },
        '&:last-child': {
          borderRadius: '0 5px 5px 0',
        },
      },
    },
    '*:first-child': {
      $nest: {
        button: {
          borderRadius: '5px 0 0 5px !important',
        },
      },
    },
    '*:last-child': {
      $nest: {
        button: {
          borderRadius: '0 5px 5px 0 !important',
        },
      },
    },
  },
});
