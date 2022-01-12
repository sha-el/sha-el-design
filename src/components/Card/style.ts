import { Theme } from '../Theme/Theme';
import { css } from '@emotion/css';
import { CardMediaProps } from './CardMedia';
import { lightText } from '../../helpers/color';

export const cardStyle = (theme: Theme) =>
  css({
    background: theme.background,
    boxSizing: 'border-box',
    borderRadius: '6.5px',
    color: lightText(theme),
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
