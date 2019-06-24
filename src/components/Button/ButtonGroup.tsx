import * as React from 'react';
import { style } from 'typestyle';

export const ButtonGroup: React.StatelessComponent<{}> = (props) => {
  return (
    <div className={style({$nest: {'button, a': {display: 'inline-block'}}})}>
      {props.children}
    </div>
  );
};