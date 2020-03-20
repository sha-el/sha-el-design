import * as React from 'react';
import { classes, style } from 'typestyle';

export const CardBody: React.FunctionComponent<CardBodyProps> = (props) => {
  const { className, ...rest } = props;

  const css = style({
    fontSize: '0.875rem',
    fontWeight: 400,
    lineHeight: 1.43,
    letterSpacing: '0.01071em',
  });

  return (
    <div className={classes(className, css)} {...rest}>
      {props.children}
    </div>
  );
};

interface CardBodyProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}