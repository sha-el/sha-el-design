import * as React from 'react';
import { SidePanelContext } from './Container';
import { content as style } from './style';

export const Content: React.FC<ContentProps> = (props) => {
  return <SidePanelContext.Consumer>{({ width }) => <Inner {...props} width={width} />}</SidePanelContext.Consumer>;
};

const Inner: React.FC<InnerProps> = (props) => {
  const { width } = props;
  return <main className={style(width)}>{props.children}</main>;
};

export interface ContentProps {
  children: React.ReactNode;
}

interface InnerProps extends ContentProps {
  width: number;
}
