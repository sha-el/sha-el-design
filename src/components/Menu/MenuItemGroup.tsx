import * as React from 'react';
import { SidePanelContext } from '../Layout/Container';
import { Popover } from '../Popover';
import { PopoverProps } from '../Popover/Popover';
import { CollapsibleList, ListItem } from '../List';

export class MenuItemGroup extends React.Component<MenuItemGroupProps, State> {
  constructor(props: MenuItemGroupProps) {
    super(props);

    this.state = {
      active: this.props.defaultActive,
    };
  }

  static defaultProps = {
    inline: true,
    position: 'right',
  };

  toggle = () => {
    this.setState({ active: !this.state.active });
  };

  renderChilden = () => {
    if (Array.isArray(this.props.children)) {
      return this.props.children.map((el) => {
        if (['string', 'number', 'boolean'].indexOf(typeof el) < 0) {
          return React.cloneElement(el as React.ReactElement, { nested: true });
        }
      });
    }
    return React.cloneElement(this.props.children as React.ReactElement, { nested: true });
  };

  renderPopup = (isBarOpen: boolean) => {
    const { icon, title, children } = this.props;

    if (isBarOpen) {
      return (
        <CollapsibleList header={isBarOpen && title} avatar={icon}>
          {children}
        </CollapsibleList>
      );
    }

    return (
      <Popover
        content={this.renderChilden()}
        trigger={this.props.trigger}
        position={this.props.position}
        hideArrow
        style={{
          content: {
            padding: '0',
          },
          child: {
            display: 'inline-block',
          },
        }}
        align={this.props.offset && { offset: this.props.offset }}
      >
        {this.props.anchor || (
          <ListItem avatar={icon} onClick={this.toggle} key={name}>
            {!this.props.inline && title}
          </ListItem>
        )}
      </Popover>
    );
  };

  render() {
    return (
      <SidePanelContext.Consumer>
        {(context) => {
          const isBarOpen = this.props.inline && context.width > 200;
          return this.renderPopup(isBarOpen);
        }}
      </SidePanelContext.Consumer>
    );
  }
}

export interface MenuItemGroupProps {
  title: React.ReactNode;
  icon?: React.ReactNode;
  name?: string;
  defaultActive?: boolean;
  inline?: boolean;
  position?: PopoverProps['position'];
  trigger?: PopoverProps['trigger'];

  /**
   * Custom element to be shown as anchor
   * Applicable only for popover menu.
   */
  anchor?: PopoverProps['children'];

  /**
   * Offset for element popup placement
   * [X, Y]
   */
  offset?: [number, number];
}

interface State {
  active?: boolean;
}
