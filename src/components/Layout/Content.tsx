import * as React from 'react';
import { ContainerContext } from './Container';
import { content as style } from './style';

export const Content: React.FC<ContentProps> = (props) => {
  const containerContext = React.useContext(ContainerContext);
  const css = style(containerContext.width);
  return <main className={css}>{props.children}</main>;
};

export interface ContentProps {
  children: React.ReactNode;
}
