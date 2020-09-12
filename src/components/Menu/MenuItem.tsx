import * as React from 'react';
import { SidePanelContext } from '../Layout/Container';
import { ListItem } from '../List';

export const MenuItem: React.FunctionComponent<MenuItemProps> = (props) => {
  return (
    <SidePanelContext.Consumer>
      {(context) => {
        const isBarOpen = context.width > 200;
        const { nested, icon, name, children, onClick, element } = props;
        return (
          <ListItem key={name} onClick={onClick} avatar={icon} element={element}>
            {(isBarOpen || nested) && children}
          </ListItem>
        );
      }}
    </SidePanelContext.Consumer>
  );
};

export interface MenuItemProps {
  name: string;
  children: React.ReactNode;
  active?: boolean;
  icon?: React.ReactElement;
  nested?: boolean;
  onClick?: () => void;
  element?: React.ReactElement;
}
