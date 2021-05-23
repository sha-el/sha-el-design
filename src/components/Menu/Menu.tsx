import { css } from '@emotion/css';
import * as React from 'react';
import { Col, Row } from '../Grid';
import { CollapsibleList, List } from '../List';
import { Popover } from '../Popover';
import { PopoverProps } from '../Popover/Popover';

const style = (mode: MenuProps['mode']) =>
  css({
    '& > .popover-element': {
      display: mode === 'vertical' && 'block !important',
    },
  });

export const Menu: React.FC<MenuProps> = (props) => {
  const { anchor, trigger, mode, children, position, elevation, border, backgroundColor, height, densed } = props;

  if (mode === 'expand') {
    return <CollapsibleList header={anchor}>{children}</CollapsibleList>;
  }

  if (mode === 'vertical') {
    return (
      <List
        backgroundColor={backgroundColor}
        style={{ width: 'auto' }}
        elevation={elevation}
        border={border}
        densed={densed}
        className={style(mode)}
      >
        {children}
      </List>
    );
  }

  if (mode === 'horizontal') {
    return (
      <Row>
        {(children as React.ReactElement[]).map((e, i) => (
          <Col flex="1 0 auto" key={i}>
            {e}
          </Col>
        ))}
      </Row>
    );
  }

  return (
    <Popover
      cover={!position}
      hideArrow
      content={
        <List densed={densed} style={{ maxHeight: height, overflow: 'auto' }} elevation={elevation}>
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
  border?: number;
  backgroundColor?: string;
  height?: string;
  densed?: boolean;
}

Menu.defaultProps = {
  mode: 'inline',
  trigger: 'onClick',
  height: '500px',
};
