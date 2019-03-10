import * as React from 'react';
import { style } from 'typestyle';

export const Container: React.StatelessComponent<ContainerProps> = (props) => {
  return (
    <div className={css}>
      {props.children}
    </div>
  );
};

const css = style({
  display: 'flex',
  flex: '1 1 auto',
});

export interface ContainerProps {
  children: any;
}
