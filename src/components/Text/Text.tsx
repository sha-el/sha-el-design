import * as React from 'react';
import { ThemeConsumer, Theme } from '../Theme/Theme';
import { format } from '../../helpers/text';
import {classes} from 'typestyle';
/**
 * Text component to style your `Text` effortlessly.
 *
 * **Usage**
 * ```jsx
 * <Text>Hello</Text>
 * ```
 */
export const Text: React.FunctionComponent<TextProps> = (props) => {
  const display = (theme: Theme) => {
    const css = classes(format(props, theme), props.className);

    if (props.variant === 'h1') {
      return (
        <h1 className={css} style={props.style}>
          {props.children}
        </h1>
      );
    }

    if (props.variant === 'h2') {
      return (
        <h2 className={css} style={props.style}>
          {props.children}
        </h2>
      );
    }

    if (props.variant === 'h3') {
      return (
        <h3 className={css} style={props.style}>
          {props.children}
        </h3>
      );
    }

    if (props.variant === 'h4') {
      return (
        <h4 className={css} style={props.style}>
          {props.children}
        </h4>
      );
    }

    if (props.variant === 'h5') {
      return (
        <h5 className={css} style={props.style}>
          {props.children}
        </h5>
      );
    }

    if (props.variant === 'h6') {
      return (
        <h6 className={css} style={props.style}>
          {props.children}
        </h6>
      );
    }

    if (props.variant === 'p') {
      return (
        <p className={css} style={props.style}>
          {props.children}
        </p>
      );
    }

    return (
      <span className={css} style={props.style}>
        {props.children}
      </span>
    );
  };
  return <ThemeConsumer>{(theme) => display(theme)}</ThemeConsumer>;
};

export interface TextProps {
  children: React.ReactNode;
  /**
   *  Defines variant for heading.
   */
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p';
  /**
   * Sets the font style to italics.
   */
  italicize?: boolean;
  /**
   * Sets the font weight to bold.
   */
  bold?: boolean;
  /**
   * Defines the font family.
   */
  fontFamily?: 'mono' | 'cursive' | 'normal' | string;
  /**
   * Size of the font.
   */
  fontSize?: number;
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
  color?: keyof Theme | string;
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

  className?: string;
}

Text.defaultProps = {
  italicize: false,
  bold: false,
  padding: '',
  margin: '',
  style: {},
};
