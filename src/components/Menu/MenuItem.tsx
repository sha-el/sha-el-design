import * as React from 'react';
import { Theme, ThemeService } from '../../helpers/theme';
import { css } from './style';
import { MenuContext } from './Menu';

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
    const style = css(this.props, this.state);
    return (
      <MenuContext.Consumer>
        {(context => {
          const isBarOpen = context.width > 200;
          const { nested, icon, name, active, children } = this.props;
          return (
            <div
              key={name}
              className={`${style.flex} ${style.menu} ${active ? style.active : style.menuHover}`}
            >
              <div className={`${style.icon} ${style.flex_1}`}>
                {icon
                  && React.cloneElement(
                    icon,
                    { style: { margin: isBarOpen ? null : 'auto' } },
                  )
                }
              </div>
              {(isBarOpen || nested) && <div className={`${style.flex_1}`}>
                {children}
              </div>}
            </div>
          );
        })}
      </MenuContext.Consumer>
    );
  }
}

export interface ItemProps {
  name: string;
  children: React.ReactNode;
  active?: boolean;
  icon?: React.ReactElement<any>;
  nested?: boolean;
}

export interface State {
  theme: Theme;
}