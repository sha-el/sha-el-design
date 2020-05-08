import * as React from 'react';
import { SidePanelContext } from '../Layout/SidePanel';
import { css } from './style';
import { classes } from 'typestyle';
import { ThemeConsumer } from '../Theme/Theme';

export const Menu: React.FunctionComponent<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>> = (props) => {
  const { className, ...rest } = props;

  return (
    <SidePanelContext.Consumer>
      {(context) => {
        const isBarOpen = context.width > 200;
        const { children } = props;

        return (
          <ThemeConsumer>
            {(theme) => {
              const style = css(
                false,
                theme,
                isBarOpen,
              );

              return (
                <div
                  className={classes(className, style.menu)}
                  {...rest}
                >
                  {children}
                </div>
              );
            }}
          </ThemeConsumer>
        );
      }}
    </SidePanelContext.Consumer>
  );
};