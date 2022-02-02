import { css } from '@emotion/css';
import { ContainerProps } from './Container';

export const container = (props: ContainerProps) =>
  css({
    display: 'flex',
    position: 'relative',
    marginTop: props.navBar && '90px',
  });

export const content = (width: number) =>
  css({
    position: 'relative',
    minWidth: 0,
    flex: '1',
    minHeight: '100%',
    marginLeft: width + (width === 0 ? 0 : 20) + 'px',
    padding: '0 28px',
    boxSizing: 'border-box',
  });
