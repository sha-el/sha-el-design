import { css } from '@emotion/css';
import { CardMediaProps } from './CardMedia';
import { ColorChoices } from '../../typings/color';
import { colorFromChoices } from '../../helpers/color';

export const cardStyle = (colors: ColorChoices) =>
  css({
    // background: themeVar.neutral.neutralKeyColor.surface,
    // color: themeVar.neutral.neutralKeyColor.onSurface,
    boxSizing: 'border-box',
    borderRadius: '16px',
    ...colorFromChoices(colors),
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
    borderRadius: '16px',
  });
