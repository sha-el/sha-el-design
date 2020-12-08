import { TextProps } from '../components/Text/Text';
import { Theme } from '../components/Theme/Theme';
import { style } from 'typestyle';
import { NestedCSSProperties } from 'typestyle/lib/types';
import { lightText } from './color';

export function format(props: TextProps, theme: Theme) {
  let fontWeight: NestedCSSProperties['fontWeight'] = 'normal';
  let fontStyle: 'normal' | 'italic' = 'normal';
  const fontFamily = props.fontFamily;
  const fontSize = props.fontSize;
  const color = props.color === 'light' ? lightText(theme) : theme[props.color] || props.color;
  const padding: string = props.padding;
  const margin: string = props.margin;
  let textDecoration = '';

  if (props.underline) {
    textDecoration += 'underline';
  }

  if (props.strikeThrough) {
    textDecoration += ' line-through';
  }

  if (props.fontWeight) {
    fontWeight = props.fontWeight;
  }

  if (props.italicize) {
    fontStyle = 'italic';
  }

  return style({
    fontFamily,
    fontSize,
    fontWeight,
    fontStyle,
    color,
    margin,
    textDecoration,
    padding,
    textAlign: props.textAlign,
  });
}
