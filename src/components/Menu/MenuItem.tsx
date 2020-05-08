import * as React from 'react';
import { css } from './style';
import { SidePanelContext } from '../Layout/SidePanel';
import { ThemeConsumer } from '../Theme/Theme';

export const MenuItem: React.FunctionComponent<MenuItemProps> = (props) => {
  return (
    <SidePanelContext.Consumer>
      {(context => (
        <ThemeConsumer>
          {(theme) => {
            const isBarOpen = context.width > 200;
            const { nested, icon, name, children, onClick } = props;
            const style = css(props.active, theme, isBarOpen);
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

          }}
        </ThemeConsumer>
      ))}
    </SidePanelContext.Consumer>
  );
};

export interface MenuItemProps {
  name: string;
  children: React.ReactNode;
  active?: boolean;
  icon?: React.ReactElement<any>;
  nested?: boolean;
  onClick?: () => void;
}
