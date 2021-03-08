import * as React from 'react';
import { useTheme } from '../Theme/Theme';
import { loadingStyle as style } from './style';

export const Loading: React.FC<LoadingProps> = (props) => {
  const { render = () => <div />, isLoading, ...rest } = props;

  const theme = useTheme();

  if (!isLoading) {
    return render();
  }

  return <div {...rest} className={style(theme, props)} />;
};

export interface LoadingProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  isLoading: boolean;
  render?: () => React.ReactElement;
  style?: React.CSSProperties;
  size?: 'small' | 'default' | 'big';
  color?: string;
}
