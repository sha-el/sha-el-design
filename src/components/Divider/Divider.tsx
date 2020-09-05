import * as React from 'react';
import { style as typeStyle, classes } from 'typestyle';
import { NestedCSSProperties } from 'typestyle/lib/types';
import { Theme, ThemeConsumer } from '../Theme/Theme';

export const Divider: React.FC<DividerProps> = (props) => {
  return (
    <ThemeConsumer>
      {(theme) => (
        <div
          style={props.style}
          className={classes(
            style(props.color, theme),
            props.children ? psuedoWithChild : psuedoWithoutChild,
            props.className,
          )}
        >
          {props.children}
        </div>
      )}
    </ThemeConsumer>
  );
};

Divider.defaultProps = {
  className: '',
};

export interface DividerProps {
  style?: React.CSSProperties;
  className?: string;
  color?: string;
}

const commonStyle = (color: string, theme: Theme): NestedCSSProperties => {
  return {
    content: '" "',
    background: color || theme.bodyBg,
    height: '1px',
    zIndex: -1,
    display: 'block',
    position: 'absolute',
    top: 'calc(50% - 2px)',
  };
};

const psuedoWithChild = typeStyle({
  $nest: {
    '&::before': {
      width: 'calc(50% - 20px)',
    },
    '&::after': {
      width: 'calc(50% - 20px)',
    },
  },
});

const psuedoWithoutChild = typeStyle({
  $nest: {
    '&::before': {
      width: '50%',
    },
    '&::after': {
      width: '50%',
    },
  },
});

const style = (color: string, theme: Theme) =>
  typeStyle({
    width: '100%',
    textAlign: 'center',
    position: 'relative',
    zIndex: 2,
    margin: '5px 0',
    background: theme.background,
    display: 'inline-block',
    $nest: {
      '& svg': {
        display: 'inline-block',
      },
      '&::before': {
        left: 0,
        ...commonStyle(color, theme),
      },
      '&::after': {
        right: 0,
        ...commonStyle(color, theme),
      },
    },
  });
