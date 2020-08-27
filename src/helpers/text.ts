import { TextProps } from '../components/Text/Text';
import { Theme } from '../components/Theme/Theme';
import { style } from 'typestyle';

export function format(props: TextProps, theme: Theme) {
  let fontWeight: 'bold' | 'normal' = 'normal';
  let fontStyle: 'normal' | 'italic' = 'normal';
  const fontFamily = props.fontFamily;
  const fontSize = props.fontSize;
  const color = theme[props.color] || props.color;
  const padding: string = props.padding;
  const margin: string = props.margin;
  let textDecoration = '';

  if (props.underline) {
    textDecoration += 'underline';
  }

  if (props.strikeThrough) {
    textDecoration += ' line-through';
  }

  if (props.bold) {
    fontWeight = 'bold';
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
  });
}
