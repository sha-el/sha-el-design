import * as React from 'react';
import { style } from 'typestyle';
import { removeObjectProperties } from '../../helpers';

export const Col: React.StatelessComponent<ColProps> = (props) => {
  const divProps = removeObjectProperties(props, 'offset', 'span');
  return (
    <div {...divProps} className={colStyle(props)} />
  );
};

const colStyle = (props: ColProps) => style({
  width: 100 / (24 / props.span) + '%',
  display: 'inline-block',
  marginLeft: props.offset && 100 / (24 / props.offset) + '%',
  marginBottom: '10px',
});

export interface ColProps {
  style?: React.CSSProperties;
  children: React.ReactNode;
  span?: number;
  offset?: number;
}

Col.defaultProps = {
  span: 24,
};
