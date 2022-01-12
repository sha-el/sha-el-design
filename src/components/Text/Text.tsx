import * as React from 'react';
import { Theme, useTheme } from '../Theme/Theme';
import { style } from './style';
import { classes } from '../../helpers';
/**
 * Text component to style your `Text` effortlessly.
 *
 * **Usage**
 * ```jsx
 * <Text>Hello</Text>
 * ```
 */
export const Text: React.FunctionComponent<TextProps> = (props) => {
  const {
    variant: __variant,
    italicize: __italicize,
    fontFamily: __fontFamily,
    fontSize: __fontSize,
    padding: __padding,
    margin: __margin,
    color: __color,
    underline: __underline,
    strikeThrough: __strikethrough,
    fontWeight: __fontWeight,
    textAlign: __textAlign,
    background: __background,
    monoFont: __monoFont,
    className,
    ...rest
  } = props;

  const theme = useTheme();
  const css = classes(style({ props, theme }), className);

  const element = {
    h1: <h1 />,
    h2: <h2 />,
    h3: <h3 />,
    h4: <h4 />,
    h5: <h5 />,
    h6: <h6 />,
    p: <p />,
    label: <label />,
  }[props.variant] || <span />;

  return React.cloneElement(element, {
    className: css,
    ...rest,
  });
};

export interface TextProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode;
  /**
   *  Defines variant for heading.
   */
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'label';
  /**
   * Sets the font style to italics.
   */
  italicize?: boolean;
  /**
   * Defines the font family.
   */
  fontFamily?: 'mono' | 'cursive' | 'normal' | string;
  /**
   * Size of the font.
   */
  fontSize?: string;
  /**
   * Padding for the font.
   */
  padding?: string;
  /**
   * Margin for the font.
   */
  margin?: string;
  /**
   * Sets color of the font.
   */
  color?: keyof Theme | string | 'light';
  /**
   * Underlines the text
   */
  underline?: boolean;
  /**
   * Strikes a line through the text.
   */
  strikeThrough?: boolean;
  /**
   * Add font weight
   */
  fontWeight?: React.CSSProperties['fontWeight'];

  /**
   * Add text align
   */
  textAlign?: React.CSSProperties['textAlign'];

  /**
   * Set Background
   */
  background?: keyof Theme | React.CSSProperties['background'];

  /*
   * Set monospace font.
   */
  monoFont?: boolean;

  /**
   * line height
   */
  lineHeight?: string;
}

Text.defaultProps = {
  italicize: false,
  padding: '',
  margin: '',
  style: {},
  onClick: () => ({}),
};
