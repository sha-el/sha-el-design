import * as React from 'react';
import { stylesheet, classes } from 'typestyle';
import { styleEnum } from '../../helpers/constants';

export const Card: React.FunctionComponent<CardProps> = (props) => {
  const style = css();

  const { className, ...rest } = props;

  return (
    <div className={classes(className, style.container)} {...rest}>
        {props.children}
    </div>
  );
};

const css = () => stylesheet({
  container: {
    boxShadow: styleEnum.shadow_bot_2x,
    background: 'white',
    boxSizing: 'border-box',
    padding: '16px',
  },
});

interface CardProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>{
  children?: React.ReactNode;
}
