import * as React from 'react';
import { style } from 'typestyle';

export const Col: React.StatelessComponent<ColProps> = (props) => {
  return (
    <div style={props.style} children={props.children} className={colStyle(props)} />
  );
};

const colStyle = (props: ColProps) => style({
  maxWidth: !props.flex && 100 / (24 / props.span) + '%',
  flexBasis: !props.flex && 100 / (24 / props.span) + '%',
  boxSizing: 'border-box',
  flex: props.flex || '0 0 auto',
  paddingRight: '.5rem',
  paddingLeft: '.5rem',
  marginLeft: props.offset && 100 / (24 / props.offset) + '%',
  alignSelf: props.alignSelf,
});

export interface ColProps {
  style?: React.CSSProperties;
  children?: React.ReactNode;
  span?: number;
  offset?: number;
  alignSelf?: React.CSSProperties['alignSelf'];
  flex?: React.CSSProperties['flex'];
}

Col.defaultProps = {
  span: 24,
};
