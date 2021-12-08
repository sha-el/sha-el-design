import * as React from 'react';
import { MarginClassNameInput } from '../../helpers/margin';
import { PaddingClassNameInput } from '../../helpers/padding';
import { ListItem } from '../List';

export const MenuItem = React.forwardRef<unknown, MenuItemProps>((props, ref) => {
  const { icon, children, onClick, element, close, active, action, padding, margin, ...rest } = props;
  return (
    <ListItem
      ref={ref}
      onClick={(e) => {
        onClick && onClick(e);
        close && close();
      }}
      avatar={icon}
      element={element}
      selected={active}
      action={action}
      padding={padding}
      margin={margin}
      {...rest}
    >
      {children}
    </ListItem>
  );
});

export interface MenuItemProps {
  children: React.ReactNode;
  active?: boolean;
  icon?: React.ReactElement;
  nested?: boolean;
  onClick?: (e: React.MouseEvent) => void;
  element?: React.ReactElement;
  close?: () => void;
  action?: React.ReactNode;
  padding?: PaddingClassNameInput;
  margin?: MarginClassNameInput;
}
