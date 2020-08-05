import { TextProps } from '../components/Text';
import { Theme } from '../components/Theme/Theme';
import { style } from 'typestyle';

export function format(props: TextProps, theme: Theme) {

  let fontWeight: 'bold' | 'normal' = 'normal';
  let fontStyle: 'normal' | 'italic' = 'normal';
  const fontFamily = props.fontFamily;
  let fontSize: string = '';
  const color = theme[props.color] || props.color;
  const padding: string = props.padding;
  const margin: string = props.margin;
  let textDecoration: string = '';

  if (props.fontSize) {
    fontSize = `${props.fontSize}px`;
  }

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
