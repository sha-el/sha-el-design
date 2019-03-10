import * as React from 'react';
import { style } from 'typestyle';

export const SidePanel: React.StatelessComponent<SidePanelProps> = (props) => {
  return (
    <div className={css}>
      {props.children}
    </div>
  );
};

const css = style({
  zIndex: 2,
});

export interface SidePanelProps {
  children: any;
}
