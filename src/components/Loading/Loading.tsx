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
        <div {...rest} className={style(theme).loader} />
      )}
    </ThemeConsumer>
  );
};

const style = (theme: Theme) => {
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
      borderTopColor: theme.error,
    },
    '25%': {
      borderTopColor: theme.warning,
    },
    '50%': {
      borderTopColor: theme.info,
    },
    '100%': {
      borderTopColor: theme.secondary,
    },
  });

  return stylesheet({
    loader: {
      margin: '0px auto',
      borderRadius: '50%',
      border: `4px solid ${borderColor(theme.bodyBg)}`,
      borderTop: '4px solid red',
      width: '50px',
      height: '50px',
      animation: `1.5s ${animation} infinite linear, 6s ${animation2} infinite linear`,
    },
  });
};

export interface LoadingProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  isLoading: boolean;
  render?: () => React.ReactElement;
  style?: React.CSSProperties;
}

interface State {
  theme: Theme;
}
