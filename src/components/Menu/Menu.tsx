import * as React from 'react';
import { List } from '../..';
import { ListProps } from '../List/List';

export const Menu: React.FC<ListProps> = (props) => {
  return <List {...props}>{props.children}</List>;
};
