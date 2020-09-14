import * as React from 'react';
import { stylesheet, classes } from 'typestyle';
import { ThemeConsumer, Theme } from '../Theme/Theme';
import { shadow } from '../../helpers/style';
import elevations from '../../helpers/elevations';

export const Card: React.FunctionComponent<CardProps> = (props) => {
  const { className, elevation = 1, ...rest } = props;

  return (
    <ThemeConsumer>
      {(theme) => {
        const css = style(theme);

        return (
          <div className={classes(className, css.container, css[`elevation${elevation}`])} {...rest}>
            {props.children}
          </div>
        );
      }}
    </ThemeConsumer>
  );
};

const style = (theme: Theme) => {
  return stylesheet({
    container: {
      boxShadow: shadow('2X', theme),
      background: theme.background,
      boxSizing: 'border-box',
      padding: '16px',
    },
    ...elevations,
  });
};

export interface CardProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children?: React.ReactNode;
  elevation?: number;
}
