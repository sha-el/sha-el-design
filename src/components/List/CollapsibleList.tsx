import * as React from 'react';
import { ListItem, ListItemProps } from './ListItem';
import { nestedItem as style } from './style';
import { MdExpandMore, MdExpandLess } from 'react-icons/md';
import { Row, Col } from '../Grid';
import { classes } from '../../helpers';
import { useContext } from 'react';
import { SidePanelContext } from '../Sidebar/SidebarContext';

export interface CollapsibleListProps extends ListItemProps {
  header: React.ReactNode;
  expandable?: boolean;
  open?: boolean;
  onChange?: (open: boolean) => void;
}

export const CollapsibleContext = React.createContext({ isCollapsible: false });

export const CollapsibleList: React.FC<CollapsibleListProps> = (props) => {
  const sidebarContext = useContext(SidePanelContext);
  const [listOpen, toggleList] = React.useState(props.open || false);
  const open = props.open === undefined && !props.onChange ? listOpen : props.open;

  const css = style;

  const shouldShow = () => {
    if (!open) {
      return false;
    }

    if (sidebarContext.mobileView) {
      return true;
    }

    if (sidebarContext.sidebarOpen !== false) {
      return true;
    }
  };

  return (
    <div>
      <ListItem
        {...props}
        action={
          <Row gutter={10}>
            <Col flex="0 1 auto">{props.action}</Col>
            <Col flex="0 1 auto">{open ? <MdExpandLess key="2" /> : <MdExpandMore key="3" />}</Col>
          </Row>
        }
        onClick={() => {
          toggleList(!open);
          props.onChange && props.onChange(!open);
        }}
      >
        {props.header}
      </ListItem>
      <div
        className={classes(css, 'collapsible-item')}
        style={{
          maxHeight: shouldShow() ? '100vh' : '0',
        }}
      >
        <CollapsibleContext.Provider value={{ isCollapsible: true }}>
          {shouldShow() && props.children}
        </CollapsibleContext.Provider>
      </div>
    </div>
  );
};
