import * as React from 'react';

export const TabPanel: React.FC<TabPanelProps> = (props) => {
  return <div>{props.children}</div>;
};

export interface TabPanelProps {
  title: React.ReactNode;
  key: string;
}
