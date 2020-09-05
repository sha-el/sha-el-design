import * as React from 'react';
import { ThemeConsumer } from '../Theme/Theme';
import { style } from './style';
import { PaperProps } from '../Paper';

export interface ListProps<T> extends PaperProps {
  data?: T[];
  children?: React.ReactNode;
  render?: (data: T) => React.ReactNode;
  style?: React.CSSProperties;
}

export const List: React.FC<ListProps<unknown>> = (props) => {
  return (
    <ThemeConsumer>
      {(theme) => {
        const css = style(theme, props);
        return (
          <div>
            <ul className={css.list} style={props.style}>
              {props.children || props.data.map((v) => props.render(v))}
            </ul>
          </div>
        );
      }}
    </ThemeConsumer>
  );
};
