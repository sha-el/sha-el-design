import * as React from 'react';
import { classes } from 'typestyle';
import { ThemeConsumer } from '../Theme/Theme';
import { style } from './style';

export interface ListProps {
  children?: React.ReactNode;
  style?: React.CSSProperties;
  elevation?: number;
  className?: string;
}

export const List: React.FC<ListProps> = (props) => {
  const { elevation = 2 } = props;

  return (
    <ThemeConsumer>
      {(theme) => {
        const css = style(theme);
        return (
          <div className={classes(css[`elevation${elevation}`], props.className)}>
            <ul className={css.list} style={props.style}>
              {props.children}
            </ul>
          </div>
        );
      }}
    </ThemeConsumer>
  );
};
