import * as React from 'react';
import { stylesheet } from 'typestyle';
import { MdExpandMore } from 'react-icons/md';
import posed from 'react-pose';

import { Theme, ThemeService } from '../../helpers/theme';
import { styleEnum } from '../../helpers/constants';
import { flex1, flex } from 'csstips';

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
        <div className={css.header} onClick={() => onChange(!isOpen)}>
          <div className={css.headerTitle}>{header}</div>
          <Rotate
            className={css.icon}
            pose={isOpen ? 'open' : 'closed'}
          >
            <MdExpandMore />
          </Rotate>
        </div>
        <Content
          pose={isOpen ? 'open' : 'closed'}
          className={css.content}
        >
          {children}
        </Content>
      </div>
    );
  }

  css = () => stylesheet({
    container: {
      margin: '10px',
    },
    header: {
      borderBottom: '3px solid',
      borderColor: styleEnum.borderColor,
      display: 'flex',
      cursor: 'pointer',
      marginBottom: '10px',
      $nest: {
        div: {
          fontSize: '20px',
        },
      },
    },
    headerTitle: {
      ...flex1,
    },
    icon: {
      ...flex,
      flex: 0,
    },
    content: {
      overflow: 'hidden',
      boxSizing: 'border-box',
    },
  })
}

const Content = posed.div({
  closed: {
    height: 0,
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
