import * as React from 'react';
import { Theme, ThemeService } from '../../helpers/theme';
import { css } from './style';
import { SidePanelContext } from '../Layout/SidePanel';

export class MenuItem extends React.Component<ItemProps, State> {
  themeService = new ThemeService();

  constructor(props: ItemProps) {
    super(props);

    this.state = {
      theme: this.themeService.selectedTheme$.getValue(),
    };
  }

  componentDidMount() {
    this.themeService.selectedTheme$.subscribe(theme => this.setState({ theme }));
  }

  render() {
    return (
      <SidePanelContext.Consumer>
        {(context => {
          const isBarOpen = context.width > 200;
          const { nested, icon, name, children, onClick } = this.props;
          const style = css(this.props, this.state, isBarOpen);
          return (
            <li
              key={name}
              className={`${style.flex} ${style.menuItem}`}
              onClick={() => onClick && onClick()}
            >
              {icon
                && <div
                  className={`${style.icon}`}
                  style={{
                    padding: isBarOpen || nested ? '0 20px 0 0' : '0',
                  }}
                >
                  {icon}
                </div>
              }
              {(isBarOpen || nested) && <div className={`${style.flex_1}`}>
                {children}
              </div>}
            </li>
          );
        })}
      </SidePanelContext.Consumer>
    );
  }
}

export interface ItemProps {
  name: string;
  children: React.ReactNode;
  active?: boolean;
  icon?: React.ReactElement<any>;
  nested?: boolean;
  onClick?: () => void;
}

export interface State {
  theme: Theme;
}
