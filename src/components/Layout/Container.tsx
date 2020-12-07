import * as React from 'react';
import { style } from 'typestyle';

export const [OPEN_WIDTH, COLLAPSED_WIDTH] = [250, 60];

const ctx = React.createContext<{ width: number; updateWidth: (width: number) => void; toggle: () => void }>({
  width: OPEN_WIDTH,
  updateWidth: (__width: number) => ({}),
  toggle: () => ({}),
});

export const SidePanelContext = ctx;

export const Container: React.FC<ContainerProps> = (props) => {
  const [width, updateWidth] = React.useState(COLLAPSED_WIDTH);

  const toggle = () => {
    updateWidth(width > COLLAPSED_WIDTH ? COLLAPSED_WIDTH : OPEN_WIDTH);
  };

  return (
    <SidePanelContext.Provider value={{ width, updateWidth, toggle }}>
      <div className={css}>{props.children}</div>
    </SidePanelContext.Provider>
  );
};

const css = style({
  display: 'flex',
  position: 'relative',
});

Container.defaultProps = {
  sidePanelWidth: COLLAPSED_WIDTH,
};

export interface ContainerProps {
  children: React.ReactNode;
  sidePanelWidth?: number;
}
