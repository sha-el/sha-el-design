import { css } from '@emotion/css';
import { disabledText } from '../../helpers/color';
import { Theme } from '../Theme/Theme';
import { RatingProps } from './Rating';

export const style = (theme: Theme, props: RatingProps) => {
  return {
    container: css({
      display: 'inline-flex',
      position: 'relative',
      cursor: props.disabled ? 'not-allowed' : 'pointer',
      textAlign: 'left',
      color: disabledText(theme),
    }),
    backgroundDiv: css({
      position: 'relative',
      cursor: 'pointer',
    }),
    ratingDiv: css({
      overflow: 'hidden',
      position: 'absolute',
    }),
  };
};
