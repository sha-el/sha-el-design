import * as React from 'react';
import { MarginClassNameInput } from '../../helpers/margin';
import { PaddingClassNameInput } from '../../helpers/padding';
import { ListItem } from '../List';

export const MenuItem: React.FC<MenuItemProps> = (props) => {
  const { icon, children, onClick, element, close, active, action, padding, margin } = props;
  return (
    <ListItem
      onClick={() => {
        onClick && onClick();
        close && close();
      }}
      avatar={icon}
      element={element}
      selected={active}
      action={action}
      padding={padding}
      margin={margin}
    >
      {children}
    </ListItem>
  );
};

export interface MenuItemProps {
  children: React.ReactNode;
  active?: boolean;
  icon?: React.ReactElement;
  nested?: boolean;
  onClick?: () => void;
  element?: React.ReactElement;
  close?: () => void;
  action?: React.ReactNode;
  padding?: PaddingClassNameInput;
  margin?: MarginClassNameInput;
}
