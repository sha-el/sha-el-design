import * as React from 'react';
import { style, classes } from 'typestyle';

export const CardMedia: React.FunctionComponent<CardMediaProps> = (props) => {
  const css = style({
    margin: '-16px',
    marginBottom: '12px',
    backgroundImage: `url("${props.image}")`,
    height: props.height || 'auto',
    display: 'block',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  });

  const { className, image: __image, height: __height, ...rest } = props;
  return (
    <div className={classes(className, css)} {...rest}>
      {props.children}
    </div>
  );
};

interface CardMediaProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  image?: string;
  height?: string;
}
