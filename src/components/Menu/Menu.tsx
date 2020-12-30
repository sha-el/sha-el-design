import * as React from 'react';
import { CollapsibleList, List } from '../List';
import { Popover } from '../Popover';
import { PopoverProps } from '../Popover/Popover';

export const Menu: React.FC<MenuProps> = (props) => {
  const { anchor, trigger, mode, children, position, elevation, backgroundColor, height } = props;

  if (mode === 'expand') {
    return <CollapsibleList header={anchor}>{children}</CollapsibleList>;
  }

  if (mode === 'horizontal' || mode === 'vertical') {
    return (
      <List
        backgroundColor={backgroundColor}
        style={{ width: 'auto' }}
        inline={mode === 'horizontal'}
        elevation={elevation}
      >
        {children}
      </List>
    );
  }

  return (
    <Popover
      cover={!position}
      hideArrow
      content={
        <List style={{ maxHeight: height, overflow: 'auto' }} elevation={elevation}>
          {children}
        </List>
      }
      position={position}
      trigger={trigger}
    >
      {anchor}
    </Popover>
  );
};

Menu.displayName = 'Menu';

export interface MenuProps {
  anchor: React.ReactElement;
  children?: React.ReactElement | React.ReactElement[];
  mode?: 'vertical' | 'horizontal' | 'inline' | 'expand';
  trigger?: PopoverProps['trigger'];
  position?: PopoverProps['position'];
  elevation?: number;
  backgroundColor?: string;
  height?: string;
}

Menu.defaultProps = {
  mode: 'inline',
  trigger: 'onClick',
  height: '500px',
};
