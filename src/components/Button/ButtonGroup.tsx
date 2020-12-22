import * as React from 'react';
import { createUseStyles } from 'react-jss';

export const ButtonGroup: React.FC<unknown> = (props) => {
  const css = style();
  return <div className={css.buttonGroup}>{props.children}</div>;
};

const style = createUseStyles({
  buttonGroup: {
    button: {
      borderRadius: '0',
      '&:first-child': {
        borderRadius: '5px 0 0 5px',
      },
      '&:last-child': {
        borderRadius: '0 5px 5px 0',
      },
    },
    a: {
      boxSizing: 'border-box',
      borderRadius: '0',
      '&:first-child': {
        borderRadius: '5px 0 0 5px',
      },
      '&:last-child': {
        borderRadius: '0 5px 5px 0',
      },
    },
    '*:first-child': {
      button: {
        borderRadius: '5px 0 0 5px !important',
      },
    },
    '*:last-child': {
      button: {
        borderRadius: '0 5px 5px 0 !important',
      },
    },
  },
});
