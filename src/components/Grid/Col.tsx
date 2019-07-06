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
  maxWidth: 100 / (24 / props.span) + '%',
  flexBasis: 100 / (24 / props.span) + '%',
  boxSizing: 'border-box',
  flex: '0 0 auto',
  paddingRight: '.5rem',
  paddingLeft: '.5rem',
  marginLeft: props.offset && 100 / (24 / props.offset) + '%',
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
