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
  const theme = useTheme();
  const css = classes(style({ props, theme }), props.className);

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
    style: props.style,
    onClick: props.onClick,
    children: props.children,
  });
};

export interface TextProps {
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
   * Add custom styling
   */
  style?: React.CSSProperties;

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

  className?: string;

  onClick?: (e: React.MouseEvent) => void;
}

Text.defaultProps = {
  italicize: false,
  fontWeight: 'normal',
  padding: '',
  margin: '',
  style: {},
  onClick: () => ({}),
};
