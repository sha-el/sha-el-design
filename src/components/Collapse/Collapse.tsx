import * as React from 'react';
import { stylesheet } from 'typestyle';
import { MdExpandMore } from 'react-icons/md';
import posed from 'react-pose';

import { Theme, ThemeService } from '../../helpers/theme';
import { flex1, flex } from 'csstips';
import { Button } from '../Button';
import { styleEnum } from '../../helpers/constants';

export class Collapse extends React.Component<Props, State> {

  theme = new ThemeService();

  constructor(props) {
    super(props);

    this.state = {
      theme: this.theme.selectedTheme$.value,
    };
  }

  render() {
    const {
      header,
      children,
      isOpen,
      onChange,
    } = this.props;

    const css = this.css();

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
              <Button shape='circle' type={isOpen ? 'primary' : 'default'}>
                <MdExpandMore />
              </Button>
            </Rotate>
          </div>
          {children}
        </Content>
      </div>
    );
  }

  css = () => stylesheet({
    container: {
      margin: this.props.isOpen && '20px 0',
      boxShadow: this.props.isOpen && styleEnum.shadow,
      borderBottom: '1px solid #eeeeee',
    },
    header: {
      display: 'flex',
      cursor: 'pointer',
      color: this.props.isOpen ? this.state.theme.primary : '#A8A8A8',
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
      borderLeft: this.props.isOpen && '3px solid ' + this.state.theme.primary,
    },
  })
}

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

interface Props {
  isOpen?: boolean;
  header?: React.ReactNode;
  onChange?: (isOpen: boolean) => void;
}

interface State {
  theme: Theme;
}
