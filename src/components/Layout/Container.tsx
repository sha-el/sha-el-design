import * as React from 'react';
import { classes } from '../../helpers';
import { useWindowSize } from '../../helpers/Grid';
import { container as style } from './style';

const ctx = React.createContext<{ width: number; updateWidth: (e: number) => void }>({
  width: 50,
  updateWidth: undefined,
});

export const SidePanelContext = ctx;

export const Container: React.FC<ContainerProps> = (props) => {
  const [width, updateWidth] = React.useState(props.sidePanelInitialWidth || 50);
  const { width: windowWidth } = useWindowSize();

  return (
    <SidePanelContext.Provider value={{ width: windowWidth < 1200 ? 0 : width, updateWidth }}>
      <div className={classes(style, 'sha-el-conatiner')}>{props.children}</div>
    </SidePanelContext.Provider>
  );
};

export interface ContainerProps {
  children: React.ReactNode;
  sidePanelInitialWidth?: number;
}
