import * as React from 'react';
import { stylesheet, classes } from 'typestyle';
import { ThemeConsumer, Theme } from '../Theme/Theme';
import { shadow } from '../../helpers/style';

export const Card: React.FunctionComponent<CardProps> = (props) => {
  const { className, ...rest } = props;

  return (
    <ThemeConsumer>
      {(theme) => {
        const css = style(theme);

        return (
          <div className={classes(className, css.container)} {...rest}>
            {props.children}
          </div>
        );
      }}
    </ThemeConsumer>
  );
};

const style = (theme: Theme) => stylesheet({
  container: {
    boxShadow: shadow('2X', theme),
    background: theme.background,
    boxSizing: 'border-box',
    padding: '16px',
  },
});

interface CardProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children?: React.ReactNode;
}
