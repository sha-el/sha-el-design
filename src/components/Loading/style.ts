import { css, keyframes } from '@emotion/css';
import { colorShades } from '../../helpers/color';
import { Theme } from '../Theme/Theme';
import { LoadingProps } from './Loading';

export const loadingStyle = (theme: Theme, props: LoadingProps) => {
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

  const diameter =
    {
      small: '20px',
      big: '100px',
    }[props.size] || '50px';

  return css({
    margin: '0px auto',
    borderRadius: '50%',
    border: `4px solid transparent`,
    borderTop: '4px solid red',
    width: diameter,
    height: diameter,
    background: 'transparent',
    animation: `1.5s ${animation} infinite linear, 6s ${animation2} infinite linear`,
  });
};

export const skeletonStyle = (theme: Theme) => {
  const animation = keyframes({
    '0%': {
      opacity: 0.2,
      transform: 'translateY(6px) scale(0.98)',
    },
    '85%, 100%': {
      opacity: 1,
      transform: 'translateY(0px) scale(1)',
    },
  });

  const [col1, col2] = colorShades(theme.background);

  return css({
    padding: '0.8rem 0.75rem',
    margin: '0 auto',
    width: '100%',
    boxSizing: 'border-box',
    border: `1px solid ${col2}`,
    overflow: 'hidden',

    '& .skeleton-header': {
      marginTop: '20px',
      transformOrigin: 'bottom',
      animation: `${animation} 1s ease-in-out forwards infinite`,
      animationDirection: 'alternate',
      backgroundColor: col1,
      '& .skeleton-line': {
        height: '1rem',
        marginBottom: '0.5rem',
      },
    },
    '& .skeleton-text': {
      animationDelay: '200ms',
      animation: `${animation} 1s ease-in-out forwards infinite`,
      animationDirection: 'alternate',
      '& .skeleton-line': {
        height: '0.7rem',
        backgroundColor: col1,
        borderRadius: '3px',
        marginBottom: '0.3rem',
      },
    },
    skeleton: {
      background: col2,
    },
  });
};
