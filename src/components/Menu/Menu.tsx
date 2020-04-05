import * as React from 'react';
import { SidePanelContext } from '../Layout/SidePanel';
import { css } from './style';
import { ThemeService } from '../../helpers/theme';
import { classes } from 'typestyle';

export const Menu: React.FunctionComponent<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>> = (props) => {
  const themeService = new ThemeService();
  const { className, ...rest } = props;

  return (
    <SidePanelContext.Consumer>
      {(context) => {
        const isBarOpen = context.width > 200;
        const { children } = props;
        const style = css(
          { active: false },
          { theme: themeService.selectedTheme$.getValue() },
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
    </SidePanelContext.Consumer>
  );
};