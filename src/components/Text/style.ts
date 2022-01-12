import { css, CSSObject } from '@emotion/css';
import { lightText } from '../../helpers/color';
import { Theme } from '../Theme/Theme';
import { TextProps } from './Text';

export const style = ({ props, theme }: { props: TextProps; theme: Theme }) => {
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

  const style: CSSObject = {
    fontSize,
    color,
    margin,
    textDecoration: textDecoration.join(' '),
    padding,
    textAlign: props.textAlign,
    background: theme[props.background] || props.background,
  };

  if (props.fontWeight) {
    style.fontWeight = props.fontWeight;
  }

  if (props.italicize) {
    style.fontStyle = 'italic';
  }

  if (props.fontFamily) {
    style.fontFamily = props.fontFamily;
  }

  if (props.monoFont) {
    style.fontFamily = "'Fira Code', monospace";
  }

  if (props.lineHeight) {
    style.lineHeight = props.lineHeight;
  }

  return css(style);
};
