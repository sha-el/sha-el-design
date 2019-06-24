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
    },
    a: {
      boxSizing: 'border-box',
      display: 'inline-block',
    },
  },
});