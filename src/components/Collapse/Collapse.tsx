import * as React from 'react';

import { List, CollapsibleList } from '../List';
import { Text } from '../Text';
import { style } from './style';

export const Collapse: React.FC<CollapseProps> = (props) => {
  const { header, children, isOpen, onChange } = props;

  return (
    <List style={{ borderRadius: '0' }}>
      <CollapsibleList open={isOpen} onChange={onChange} header={<Text color="light">{header}</Text>}>
        <div className={style}>{children}</div>
      </CollapsibleList>
    </List>
  );
};

interface CollapseProps {
  isOpen?: boolean;
  header?: React.ReactNode;
  onChange?: (isOpen: boolean) => void;
}
