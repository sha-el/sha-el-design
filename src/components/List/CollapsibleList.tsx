import * as React from 'react';
import { ListItem, ListItemProps } from './ListItem';
import { ThemeConsumer } from '../Theme/Theme';
import { style } from './style';
import { MdExpandMore, MdExpandLess } from 'react-icons/md';

export interface CollapseProps extends ListItemProps {
  header: React.ReactNode;
  open?: boolean;
  onChange?: (open: boolean) => void;
}

export const CollapsibleList: React.FC<CollapseProps> = (props) => {
  const [listOpen, toggleList] = React.useState(props.open || false);
  const open = props.open === undefined && !props.onChange ? listOpen : props.open;

  return (
    <ThemeConsumer>
      {(theme) => {
        const css = style(theme);

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
              className={css.nestedItem}
              style={{
                maxHeight: open ? '100vh' : '0',
              }}
            >
              {props.children}
            </div>
          </div>
        );
      }}
    </ThemeConsumer>
  );
};
