import * as React from 'react';
import { classes } from '../../helpers';
import { cardMediaStyle } from './style';

export const CardMedia: React.FC<CardMediaProps> = (props) => {
  const css = cardMediaStyle({ props });

  const { className, image: __image, height: __height, ...rest } = props;
  return (
    <div className={classes(className, css.image)} {...rest}>
      {props.children}
    </div>
  );
};

interface CardMediaProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  image?: string;
  height?: string;
}
