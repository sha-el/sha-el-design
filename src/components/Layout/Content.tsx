import * as React from 'react';
import { style } from 'typestyle';
import { SidePanelContext } from './Container';

export const Content: React.FC<ContentProps> = (props) => {
  return (
    <SidePanelContext.Consumer>
      {({ width }) => <main className={css(width)}>{props.children}</main>}
    </SidePanelContext.Consumer>
  );
};

const css = (width: number) =>
  style({
    position: 'relative',
    minWidth: 0,
    flex: '1 0 auto',
    margin: '0 0 0 5px',
    zIndex: 0,
    minHeight: '100%',
    width: `calc(100% - ${width + 50}px)`,
    marginLeft: width + 'px',
    padding: '5px 25px',
  });

export interface ContentProps {
  children: React.ReactNode;
}
