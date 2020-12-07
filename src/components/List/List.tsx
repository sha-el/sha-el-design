import * as React from 'react';
import { classes } from 'typestyle';
import { ThemeConsumer } from '../Theme/Theme';
import { style } from './style';

export interface ListProps {
  children?: React.ReactElement | React.ReactElement[];
  style?: React.CSSProperties;
  elevation?: number;
  className?: string;
  densed?: boolean;
  inline?: boolean;
  backgroundColor?: string;
}

export const List: React.FC<ListProps> = (props) => {
  const { elevation = 2 } = props;

  return (
    <ThemeConsumer>
      {(theme) => {
        const css = style(theme, props.backgroundColor, props.densed, props.inline);
        return (
          <div className={classes(css[`elevation${elevation}`], props.className)}>
            <ul className={css.list} style={props.style}>
              {Array.isArray(props.children)
                ? (props.children as React.ReactElement[])?.map(
                    (v, i) =>
                      v &&
                      React.cloneElement(v, {
                        key: `item-${i}`,
                        gutter: (props.densed && [0, '6px 8px 6px 9px']) || v.props.gutter,
                      }),
                  )
                : React.cloneElement(props.children || <div />, {
                    gutter: (props.densed && [0, '6px 8px 6px 9px']) || props.children?.props.gutter,
                  })}
            </ul>
          </div>
        );
      }}
    </ThemeConsumer>
  );
};
