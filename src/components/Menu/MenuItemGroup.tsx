import * as React from 'react';
import posed from 'react-pose';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

import { css } from './style';
import { Theme, ThemeService } from '../../helpers/theme';
import { MenuContext } from './Menu';
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
  }

  render() {
    const style = css(this.state, this.state);
    return (
      <MenuContext.Consumer>
        {context => {
          const isBoxOpen = context.width > 100;
          return (
            <div
              key={this.props.name}
            >
              <div
                className={`${style.flex} ${style.menu}`}
                onClick={this.toggle}
              >
                <div className={`${style.groupTitle} ${style.flex_1}`}>
                  {isBoxOpen ? this.props.title :
                    <Popover
                      content={
                        <div
                          className={`${style.groupContainer} ${style.popoverContent}`}
                        >
                          {this.renderChilden()}
                        </div>
                      }
                      trigger='onClick'
                      postion='right'
                      style={{
                        content: {
                          padding: '0',
                        },
                      }}
                    >
                      <div>
                        {this.props.title}
                      </div>
                    </Popover>
                  }
                </div>
                {isBoxOpen && <div className={style.flexEnd}>
                  {this.state.active ? <FaChevronDown key='1' /> : <FaChevronUp key='2' />}
                </div>}
              </div>
              {isBoxOpen && <Content
                className={`${style.groupContainer}`}
                pose={this.state.active ? 'open' : 'closed'}
              >
                {this.props.children}
              </Content>}
            </div>
          );
        }}
      </MenuContext.Consumer>
    );
  }
}

const Content = posed.div({
  closed: { height: 0 },
  open: { height: 'auto' },
});

interface MenuItemGroupProps {
  title: React.ReactNode;
  name?: string;
  defaultActive?: boolean;
}

interface State {
  theme: Theme;
  active?: boolean;
}