import * as React from 'react';
import { lightText } from '../../helpers/color';

import { List, CollapsibleList } from '../List';
import { Text } from '../Text';
import { ThemeConsumer } from '../Theme/Theme';
import { style } from './style';

export const Collapse: React.FC<CollapseProps> = (props) => {
  const { header, children, isOpen, onChange } = props;

  return (
    <List>
      <CollapsibleList
        open={isOpen}
        onChange={onChange}
        header={<ThemeConsumer>{(theme) => <Text color={lightText(theme)}>{header}</Text>}</ThemeConsumer>}
      >
        <div className={style().content}>{children}</div>
      </CollapsibleList>
    </List>
  );
};

interface CollapseProps {
  isOpen?: boolean;
  header?: React.ReactNode;
  onChange?: (isOpen: boolean) => void;
}
