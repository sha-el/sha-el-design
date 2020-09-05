import * as React from 'react';
import { stylesheet } from 'typestyle';
import { lightText } from '../../helpers/color';

import { List, CollapsibleList } from '../List';
import { Text } from '../Text';
import { ThemeConsumer } from '../Theme/Theme';

export const Collapse: React.FunctionComponent<CollapseProps> = (props) => {
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

const style = () =>
  stylesheet({
    content: {
      overflow: 'hidden',
      boxSizing: 'border-box',
      padding: '20px 0 30px',
    },
  });

interface CollapseProps {
  isOpen?: boolean;
  header?: React.ReactNode;
  onChange?: (isOpen: boolean) => void;
}
