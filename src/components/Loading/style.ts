import { css, keyframes } from '@emotion/css';
import { themeVar } from '../Theme/helper';
import { LoadingProps } from './Loading';

export const loadingStyle = (props: LoadingProps) => {
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
      borderTopColor: props.color || '#FF1744',
    },
    '25%': {
      borderTopColor: props.color || '#D500F9',
    },
    '50%': {
      borderTopColor: props.color || '#FF6F00',
    },
    '100%': {
      borderTopColor: props.color || '#64DD17',
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

export const skeletonStyle = () => {
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

  return css({
    padding: '0.8rem 0.75rem',
    margin: '0 auto',
    width: '100%',
    boxSizing: 'border-box',
    border: `1px solid ${themeVar.neutral.neutralVariantKeyColor.outline}`,
    overflow: 'hidden',

    '& .skeleton-header': {
      marginTop: '20px',
      transformOrigin: 'bottom',
      animation: `${animation} 1s ease-in-out forwards infinite`,
      animationDirection: 'alternate',
      backgroundColor: themeVar.neutral.neutralKeyColor.surface,
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
        backgroundColor: themeVar.neutral.neutralVariantKeyColor.outline,
        borderRadius: '3px',
        marginBottom: '0.3rem',
      },
    },
    skeleton: {
      background: themeVar.neutral.neutralVariantKeyColor.surfaceVariant,
    },
  });
};
