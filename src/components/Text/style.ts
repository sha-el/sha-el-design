import { lightText } from '../../helpers/color';
import { createUseStyles } from 'react-jss';
import { theming } from '../Theme/Theme';

export const style = createUseStyles(
  {
    text: ({ props, theme }) => {
      let fontWeight: 'normal';
      let fontStyle: 'normal' | 'italic' = 'normal';
      const fontFamily = props.fontFamily;
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

      return {
        fontFamily,
        fontSize,
        fontWeight,
        fontStyle,
        color,
        margin,
        textDecoration: textDecoration.join(' '),
        padding,
        textAlign: props.textAlign,
      };
    },
  },
  { theming, name: 'sha-el-text' },
);
