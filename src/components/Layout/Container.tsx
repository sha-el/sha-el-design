import React from 'react';
import { classes } from '../../helpers';
import { useWindowSize } from '../../helpers/Grid';
import { container as style } from './style';

export const ContainerContext = React.createContext<{ width: number; updateWidth: (e: number) => void }>({
  width: 50,
  updateWidth: undefined,
});

export const Container: React.FC<ContainerProps> = (props) => {
  const [width, updateWidth] = React.useState(props.sidePanelInitialWidth || 50);
  const { width: windowWidth } = useWindowSize();

  return (
    <ContainerContext.Provider value={{ width: windowWidth < 1200 ? 0 : width, updateWidth }}>
      <div
        style={{
          position: 'fixed',
          top: '0',
          width: `calc(100% - ${width === 0 ? 0 : width + 20}px)`,
          zIndex: 1,
          left: width === 0 ? 0 : width + 20,
        }}
      >
        {props.navBar}
      </div>
      <div className={classes(style(props), 'sha-el-conatiner')}>{props.children}</div>
    </ContainerContext.Provider>
  );
};

export interface ContainerProps {
  children: React.ReactNode;
  sidePanelInitialWidth?: number;
  navBar?: React.ReactNode;
}
