import * as React from 'react';
import { RowProps } from '../Grid/Row';
import { ListItem } from '../List';

export const MenuItem: React.FC<MenuItemProps> = (props) => {
  const { icon, children, onClick, element, close, active, action, gutter } = props;
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
      gutter={gutter}
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
  gutter?: RowProps['gutter'];
}
