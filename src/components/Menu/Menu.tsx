import * as React from 'react';
import { List } from '../..';

export const Menu: React.FunctionComponent<React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>> = (props) => {
  return <List>{props.children}</List>;
};
