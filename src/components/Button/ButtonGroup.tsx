import * as React from 'react';
import { style as typeStyle } from 'typestyle';

export const ButtonGroup: React.StatelessComponent<{}> = (props) => {
  return (
    <div className={style}>
      {props.children}
    </div>
  );
};

const style = typeStyle({
  $nest: {
    button: {
      display: 'inline-block',
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
      display: 'inline-block',
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
  },
});