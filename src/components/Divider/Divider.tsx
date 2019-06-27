import * as React from 'react';
import { style } from 'typestyle';
import { NestedCSSProperties } from 'typestyle/lib/types';

export const Divider: React.StatelessComponent = (props) => {
  return (
    <div className={`${css} ${props.children ? psuedoWithChild : psuedoWithoutChild}`}>
      {props.children}
    </div>
  );
};

const commonStyle: NestedCSSProperties = {
  content: '" "',
  background: '#ccc',
  height: '1px',
  zIndex: -1,
  display: 'block',
  position: 'absolute',
  top: 'calc(50% - 2px)',
};

const psuedoWithChild = style({
  $nest: {
    '&::before': {
      width: 'calc(50% - 20px)',
    },
    '&::after': {
      width: 'calc(50% - 20px)',
    },
  },
});

const psuedoWithoutChild = style({
  $nest: {
    '&::before': {
      width: '50%',
    },
    '&::after': {
      width: '50%',
    },
  },
});

const css = style({
  width: '100%',
  textAlign: 'center',
  position: 'relative',
  zIndex: 2,
  margin: '20px 0',
  background: 'white',
  display: 'inline-block',
  $nest: {
    '&::before': {
      left: 0,
      ...commonStyle,
    },
    '&::after': {
      right: 0,
      ...commonStyle,
    },
  },
});