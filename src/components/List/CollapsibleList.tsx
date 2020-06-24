import * as React from 'react';
import { ListItem, ListItemProps } from './ListItem';
import { ThemeConsumer } from '../Theme/Theme';
import { style } from './style';
import { MdExpandMore, MdExpandLess } from 'react-icons/md';

export interface CollapseProps extends ListItemProps {
  header: React.ReactNode;
}

export const CollapsibleList: React.FC<CollapseProps> = (props) => {
  const [listOpen, toggleList] = React.useState(false);

  return (
    <ThemeConsumer>
      {(theme) => {
        const css = style(theme);

        return (
          <div>
            <ListItem
              {...props}
              action={(
                listOpen ? <MdExpandLess /> : <MdExpandMore />
              )}
              onClick={() => toggleList(!listOpen)}
            >
              {props.header}
            </ListItem>
            <div
              className={css.nestedItem}
              style={{
                maxHeight: listOpen ? '100vh' : '0',
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