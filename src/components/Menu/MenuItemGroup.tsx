import * as React from 'react';
import posed from 'react-pose';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

import { css } from './style';
import { Theme, ThemeService } from '../../helpers/theme';
import { SidePanelContext } from '../Layout/SidePanel';
import { Popover } from '../Popover';

export class MenuItemGroup extends React.Component<MenuItemGroupProps, State> {
  themeService = new ThemeService();

  constructor(props: MenuItemGroupProps) {
    super(props);

    this.state = {
      theme: this.themeService.selectedTheme$.getValue(),
      active: this.props.defaultActive,
    };
  }

  static defaultProps = {
    inline: true,
  };

  toggle = () => {
    this.setState({ active: !this.state.active });
  }

  renderChilden = () => {
    if (Array.isArray(this.props.children)) {
      return this.props.children.map(el => {
        if (['string', 'number', 'boolean'].indexOf(typeof (el)) < 0) {
          return React.cloneElement(el as React.ReactElement<any>, { nested: true });
        }
      });
    }
    return (
      React.cloneElement(this.props.children as React.ReactElement<any>, { nested: true })
    );
  }

  renderPopup = (isBarOpen: boolean) => {
    const { icon, title } = this.props;
    const style = css({ active: false }, this.state, isBarOpen);

    if (isBarOpen) {
      return (
        <>
          {icon
            && <div
              className={`${style.icon}`}
              style={{
                padding: isBarOpen ? '0 20px 0 0' : '0',
              }}
            >
              {icon}
            </div>
          }
          {isBarOpen && <div className={`${style.flex_1}`}>
            <span className={style.groupTitle}>{title}</span>
          </div>}
          {isBarOpen && <div className={style.flexEnd}>
            {this.state.active ? <FaChevronDown key='1' /> : <FaChevronUp key='2' />}
          </div>}
        </>
      );
    }

    return (
      <Popover
        content={
          <div
            className={`${style.groupContainer} ${style.popoverContent}`}
          >
            {this.renderChilden()}
          </div>
        }
        trigger='onClick'
        position='right'
        style={{
          content: {
            padding: '0',
          },
        }}
      >
        <div
          className={`${style.icon}`}
          style={{
            padding: isBarOpen ? '0 20px 0 0' : '0',
          }}
        >
          {icon}
        </div>
      </Popover>
    );
  }

  render() {
    return (
      <SidePanelContext.Consumer>
        {context => {
          const isBarOpen = this.props.inline && context.width > 200;
          const style = css({ active: false }, this.state, false);
          return (
            <>
              <li
                key={name}
                className={`${style.flex} ${style.menu}`}
                onClick={this.toggle}
              >
                {this.renderPopup(isBarOpen)}
              </li>
              {isBarOpen && <Content
                className={`${style.groupContainer}`}
                pose={this.state.active ? 'open' : 'closed'}
              >
                {this.props.children}
              </Content>}
            </>
          );
        }}
      </SidePanelContext.Consumer>
    );
  }
}

const Content = posed.div({
  closed: { height: 0 },
  open: { height: 'auto' },
});

interface MenuItemGroupProps {
  title: React.ReactNode;
  icon?: React.ReactNode;
  name?: string;
  defaultActive?: boolean;
  inline?: boolean;
}

interface State {
  theme: Theme;
  active?: boolean;
}