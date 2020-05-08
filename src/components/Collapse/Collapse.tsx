import * as React from 'react';
import { stylesheet } from 'typestyle';
import { MdExpandMore } from 'react-icons/md';
import posed from 'react-pose';

import { flex1, flex } from 'csstips';
import { Button } from '../Button';
import { Theme, ThemeConsumer } from '../Theme/Theme';
import { shadow } from '../../helpers/style';
import { borderColor } from '../../helpers/color';

export const Collapse: React.FunctionComponent<CollapseProps> = (props) => {
  const {
    header,
    children,
    isOpen,
    onChange,
  } = props;

  return (
    <ThemeConsumer>
      {(theme) => {
        const css = style(props, theme);
        return (
          <div className={css.container}>
            <Content
              pose={isOpen ? 'open' : 'closed'}
              className={css.content}
            >
              <div className={css.header} onClick={() => onChange(!isOpen)}>
                <div className={css.headerTitle}>{header}</div>
                <Rotate
                  className={css.icon}
                  pose={isOpen ? 'open' : 'closed'}
                >
                  <Button shape='circle' flat type={isOpen ? 'primary' : 'default'} icon={<MdExpandMore />} />
                </Rotate>
              </div>
              {children}
            </Content>
          </div>
        );
      }}
    </ThemeConsumer>
  );
};

const style = (props: CollapseProps, theme: Theme) => stylesheet({
  container: {
    margin: props.isOpen && '20px 0',
    boxShadow: props.isOpen && shadow('DEFAULT', theme),
    borderBottom: '1px solid ' + borderColor,
  },
  header: {
    display: 'flex',
    cursor: 'pointer',
    color: props.isOpen ? theme.primary : '#A8A8A8',
    fontWeight: 700,
    paddingBottom: '30px',
  },
  headerTitle: {
    ...flex1,
  },
  icon: {
    ...flex,
    alignSelf: 'flex-start',
    marginTop: '-12px',
    flex: 0,
  },
  content: {
    overflow: 'hidden',
    boxSizing: 'border-box',
    padding: '20px 30px',
    borderLeft: props.isOpen && '3px solid ' + theme.primary,
  },
});

const Content = posed.div({
  closed: {
    height: 55,
  },
  open: {
    height: 'auto',
  },
});

const Rotate = posed.div({
  closed: {
    rotate: -90,
  },
  open: {
    rotate: 0,
  },
});

interface CollapseProps {
  isOpen?: boolean;
  header?: React.ReactNode;
  onChange?: (isOpen: boolean) => void;
}
