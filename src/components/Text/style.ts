import { css, CSSObject } from '@emotion/css';
import { lightText } from '../../helpers/color';
import { Theme } from '../Theme/Theme';
import { TextProps } from './Text';

export const style = ({ props, theme }: { props: TextProps; theme: Theme }) => {
  let fontWeight: CSSObject['fontWeight'] = 'normal';
  let fontStyle: 'normal' | 'italic' = 'normal';
  let fontFamily = props.fontFamily;
  const fontSize = props.fontSize;
  const color = props.color === 'light' ? lightText(theme) : theme[props.color] || props.color;
  const padding: string = props.padding;
  const margin: string = props.margin;
  const textDecoration = [];

  if (props.underline) {
    textDecoration.push('underline');
  }

  if (props.strikeThrough) {
    textDecoration.push('line-through');
  }

  if (props.fontWeight) {
    fontWeight = props.fontWeight;
  }

  if (props.italicize) {
    fontStyle = 'italic';
  }

  if (props.monoFont) {
    fontFamily = "'Fira Code', monospace";
  }

  return css({
    fontFamily,
    fontSize,
    fontWeight,
    fontStyle,
    color,
    margin,
    textDecoration: textDecoration.join(' '),
    padding,
    textAlign: props.textAlign,
    background: theme[props.background] || props.background,
  });
};
