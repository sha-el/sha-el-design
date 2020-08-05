import * as React from 'react';
import { stylesheet, keyframes } from 'typestyle';

import { ThemeConsumer, Theme } from '../Theme/Theme';
import { borderColor } from 'csx';

export const Loading: React.FunctionComponent<LoadingProps> = (props) => {
  const {
    render,
    isLoading,
    ...rest
  } = props;

  if (!isLoading) {
    return render();
  }

  return (
    <ThemeConsumer>
      {(theme) => (
        <div {...rest} className={style(theme, props).loader} />
      )}
    </ThemeConsumer>
  );
};

const style = (theme: Theme, props: LoadingProps) => {
  const animation = keyframes({
    '0%': {
      transform: 'rotate(0)',
    },
    '100%': {
      transform: 'rotate(360deg)',
    },
  });

  const animation2 = keyframes({
    '0%': {
      borderTopColor: props.color || theme.error,
    },
    '25%': {
      borderTopColor: props.color || theme.warning,
    },
    '50%': {
      borderTopColor: props.color || theme.info,
    },
    '100%': {
      borderTopColor: props.color || theme.secondary,
    },
  });

  const diameter = {
    small: '20px',
    big: '100px',
  }[props.size] || '50px';

  return stylesheet({
    loader: {
      margin: '0px auto',
      borderRadius: '50%',
      border: `4px solid transparent`,
      borderTop: '4px solid red',
      width: diameter,
      height: diameter,
      background: 'transparent',
      animation: `1.5s ${animation} infinite linear, 6s ${animation2} infinite linear`,
    },
  });
};

export interface LoadingProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  isLoading: boolean;
  render?: () => React.ReactElement;
  style?: React.CSSProperties;
  size?: 'small' | 'default' | 'big';
  color?: string;
}

