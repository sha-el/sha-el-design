import * as React from 'react';
import { ListItem, ListItemProps } from './ListItem';
import { nestedItem as style } from './style';
import { MdExpandMore, MdExpandLess } from 'react-icons/md';

export interface CollapsibleListProps extends ListItemProps {
  header: React.ReactNode;
  expandable?: boolean;
  open?: boolean;
  onChange?: (open: boolean) => void;
}

export const CollapsibleList: React.FC<CollapsibleListProps> = (props) => {
  const [listOpen, toggleList] = React.useState(props.open || false);
  const open = props.open === undefined && !props.onChange ? listOpen : props.open;

  const css = style;

  return (
    <div>
      <ListItem
        {...props}
        action={open ? <MdExpandLess /> : <MdExpandMore />}
        onClick={() => {
          toggleList(!open);
          props.onChange && props.onChange(!open);
        }}
      >
        {props.header}
      </ListItem>
      <div
        className={css}
        style={{
          maxHeight: open ? '100vh' : '0',
        }}
      >
        {props.children}
      </div>
    </div>
  );
};
