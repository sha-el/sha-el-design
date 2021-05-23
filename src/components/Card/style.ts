import { Theme } from '../Theme/Theme';
import { css } from '@emotion/css';
import { CardMediaProps } from './CardMedia';

export const cardStyle = (theme: Theme) =>
  css({
    background: theme.background,
    boxSizing: 'border-box',
    borderRadius: '6.5px',
  });

export const cardMediaStyle = (props: CardMediaProps) =>
  css({
    margin: '-16px',
    marginBottom: '12px',
    backgroundImage: `url("${props.image}")`,
    height: props.height || 'auto',
    display: 'block',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    borderRadius: '5px 5px 0 0',
  });
