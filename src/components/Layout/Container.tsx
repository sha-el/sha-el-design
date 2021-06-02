import * as React from 'react';
import { classes } from '../../helpers';
import { container as style } from './style';

export const [OPEN_WIDTH, COLLAPSED_WIDTH] = [250, 60];

const ctx = React.createContext<{ width: number; toggle: () => void }>({
  width: OPEN_WIDTH,
  toggle: () => ({}),
});

export const SidePanelContext = ctx;

export const Container: React.FC<ContainerProps> = (props) => {
  const [width, updateWidth] = React.useState(COLLAPSED_WIDTH);

  const toggle = () => {
    updateWidth(width > COLLAPSED_WIDTH ? COLLAPSED_WIDTH : OPEN_WIDTH);
  };

  return (
    <SidePanelContext.Provider value={{ width, toggle }}>
      <div className={classes(style, 'sha-el-conatiner')}>{props.children}</div>
    </SidePanelContext.Provider>
  );
};

export interface ContainerProps {
  children: React.ReactNode;
}
