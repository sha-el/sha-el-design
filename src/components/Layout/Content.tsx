import * as React from 'react';
import { style } from 'typestyle';

export const Content: React.StatelessComponent<ContentProps> = (props) => {
  return (
    <div className={css}>
      {props.children}
    </div>
  );
};

const css = style({
  position: 'relative',
  zIndex: 1,
  minWidth: 0,
  flex: '1 1 auto',
  margin: '0 5px',
});

export interface ContentProps {
  children: any;
}