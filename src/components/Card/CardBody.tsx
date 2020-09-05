import * as React from 'react';
import { Text } from '../Text';

export const CardBody: React.FunctionComponent<CardBodyProps> = (props) => {
  return <Text {...props}>{props.children}</Text>;
};

type CardBodyProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
