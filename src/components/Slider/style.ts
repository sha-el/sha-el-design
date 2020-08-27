import { cssRule } from 'typestyle';
import { colorShades } from '../../helpers/color';
import { shadow } from '../../helpers/style';
import { Theme } from '../Theme/Theme';

export const rcSliderStyle = (theme: Theme) => {
  const railColor = colorShades(theme.primary)[4];

  cssRule('.rc-slider', {
    position: 'relative',
    height: '14px',
    padding: '5px 0',
    width: '100%',
    borderRadius: '6px',
    touchAction: 'none',
    boxSizing: 'border-box',
    '-webkit-tap-highlight-color': 'rgba(0, 0, 0, 0)',
  });
  cssRule('.rc-slider *', {
    boxSizing: 'border-box',
    '-webkit-tap-highlight-color': 'rgba(0, 0, 0, 0)',
  });
  cssRule('.rc-slider-rail', {
    position: 'absolute',
    width: '100%',
    backgroundColor: railColor,
    height: '4px',
    borderRadius: '6px',
  });
  cssRule('.rc-slider-track', {
    position: 'absolute',
    left: 0,
    height: '4px',
    borderRadius: '6px',
    backgroundColor: theme.primary,
  });
  cssRule('.rc-slider-handle', {
    position: 'absolute',
    width: '14px',
    height: '14px',
    cursor: ['pointer', '-webkit-grab', 'grab'],
    marginTop: '-5px',
    borderRadius: '50%',
    border: 'solid 2px ' + theme.primary,
    backgroundColor: theme.primary,
    touchAction: 'pan-x',
  });
  cssRule('.rc-slider-handle-dragging.rc-slider-handle-dragging.rc-slider-handle-dragging', {
    boxShadow: shadow('2X', theme),
    width: '20px',
    height: '20px',
    marginTop: '-7px',
  });
  cssRule('.rc-slider-handle:focus', {
    outline: 'none',
  });
  cssRule('.rc-slider-handle-click-focused:focus', {
    boxShadow: 'unset',
  });
  cssRule('.rc-slider-handle:hover', {
    transform: 'scale(2)',
    width: '20px',
    height: '20px',
    marginTop: '-7px',
  });
  cssRule('.rc-slider-handle:active', {
    boxShadow: shadow('2X', theme),
    width: '20px',
    height: '20px',
    marginTop: '-7px',
    cursor: ['-webkit-grabbing', 'grabbing'],
  });
  cssRule('.rc-slider-mark', {
    position: 'absolute',
    top: '18px',
    left: 0,
    width: '100%',
    fontSize: '12px',
  });
  cssRule('.rc-slider-mark-text', {
    position: 'absolute',
    display: 'inline-block',
    verticalAlign: 'middle',
    textAlign: 'center',
    cursor: 'pointer',
    color: '#999',
  });
  cssRule('.rc-slider-mark-text-active', {
    color: '#666',
  });
  cssRule('.rc-slider-step', {
    position: 'absolute',
    width: '100%',
    height: '4px',
    background: 'transparent',
  });
  cssRule('.rc-slider-dot', {
    position: 'absolute',
    bottom: '-2px',
    marginLeft: '-4px',
    width: '8px',
    height: '8px',
    border: '2px solid #e9e9e9',
    backgroundColor: '#fff',
    cursor: 'pointer',
    borderRadius: '50%',
    verticalAlign: 'middle',
  });
  cssRule('.rc-slider-dot-active', {
    borderColor: '#96dbfa',
  });
  cssRule('.rc-slider-dot-reverse', {
    marginRight: '-4px',
  });
  cssRule('.rc-slider-disabled', {
    backgroundColor: '#e9e9e9',
  });
  cssRule('.rc-slider-disabled .rc-slider-track', {
    backgroundColor: '#ccc',
  });
  cssRule('.rc-slider-disabled .rc-slider-handle, .rc-slider-disabled .rc-slider-dot', {
    borderColor: '#ccc',
    boxShadow: 'none',
    backgroundColor: '#fff',
    cursor: 'not-allowed',
  });
  cssRule('.rc-slider-disabled .rc-slider-mark-text, .rc-slider-disabled .rc-slider-dot', {
    cursor: 'not-allowed',
  });
  cssRule('.rc-slider-vertical', {
    width: '14px',
    height: '100%',
    padding: '0 5px',
  });
  cssRule('.rc-slider-vertical .rc-slider-rail', {
    height: '100%',
    width: '4px',
  });
  cssRule('.rc-slider-vertical .rc-slider-track', {
    left: '5px',
    bottom: 0,
    width: '4px',
  });
  cssRule('.rc-slider-vertical .rc-slider-handle', {
    marginLeft: '-5px',
    touchAction: 'pan-y',
    $nest: {
      '&:hover': {
        marginLeft: '-7px',
      },
      '&:active': {
        marginLeft: '-7px',
      },
    },
  });
  cssRule('.rc-slider-vertical .rc-slider-mark', {
    top: 0,
    left: '18px',
    height: '100%',
  });
  cssRule('.rc-slider-vertical .rc-slider-step', {
    height: '100%',
    width: '4px',
  });
  cssRule('.rc-slider-vertical .rc-slider-dot', {
    left: '2px',
    marginBottom: '-4px',
  });
  cssRule('.rc-slider-vertical .rc-slider-dot:first-child', {
    marginBottom: '-4px',
  });
  cssRule('.rc-slider-vertical .rc-slider-dot:last-child', {
    marginBottom: '-4px',
  });
  cssRule('.rc-slider-tooltip-zoom-down-enter, .rc-slider-tooltip-zoom-down-appear', {
    transform: 'scale(0, 0)',
    animationTimingFunction: 'cubic-bezier(0.23, 1, 0.32, 1)',
  });
  cssRule('.rc-slider-tooltip-zoom-down-leave', {
    animationTimingFunction: 'cubic-bezier(0.755, 0.05, 0.855, 0.06)',
  });
  cssRule(
    '.rc-slider-tooltip-zoom-down-enter.rc-slider-tooltip-zoom-down-enter-active, .rc-slider-tooltip-zoom-down-appear.rc-slider-tooltip-zoom-down-appear-active',
    {
      animationName: 'rcSliderTooltipZoomDownIn',
      animationPlayState: 'running',
    },
  );
  cssRule('.rc-slider-tooltip-zoom-down-leave.rc-slider-tooltip-zoom-down-leave-active', {
    animationName: 'rcSliderTooltipZoomDownOut',
    animationPlayState: 'running',
  });
  cssRule('.rc-slider-tooltip', {
    position: 'absolute',
    left: '-9999px',
    top: '-9999px',
    visibility: 'visible',
    boxSizing: 'border-box',
    '-webkit-tap-highlight-color': 'rgba(0, 0, 0, 0)',
  });
  cssRule('.rc-slider-tooltip *', {
    boxSizing: 'border-box',
    '-webkit-tap-highlight-color': 'rgba(0, 0, 0, 0)',
  });
  cssRule('.rc-slider-tooltip-hidden', {
    display: 'none',
  });
  cssRule('.rc-slider-tooltip-placement-top', {
    padding: '4px 0 8px 0',
  });
  cssRule('.rc-slider-tooltip-inner', {
    padding: '6px 2px',
    minWidth: '24px',
    height: '24px',
    fontSize: '12px',
    lineHeight: 1,
    color: '#fff',
    textAlign: 'center',
    textDecoration: 'none',
    backgroundColor: '#6c6c6c',
    borderRadius: '6px',
    boxShadow: '0 0 4px #d9d9d9',
  });
  cssRule('.rc-slider-tooltip-arrow', {
    position: 'absolute',
    width: 0,
    height: 0,
    borderColor: 'transparent',
    borderStyle: 'solid',
  });
  cssRule('.rc-slider-tooltip-placement-top .rc-slider-tooltip-arrow', {
    bottom: '4px',
    left: '50%',
    marginLeft: '-4px',
    borderWidth: '4px 4px 0',
    borderTopColor: '#6c6c6c',
  });
  cssRule('@keyframes rcSliderTooltipZoomDownIn', {
    $nest: {
      '0%': {
        opacity: 0,
        transformOrigin: '50% 100%',
        transform: 'scale(0, 0)',
      },
      '100%': {
        transformOrigin: '50% 100%',
        transform: 'scale(1, 1)',
      },
    },
  });
  cssRule('@keyframes rcSliderTooltipZoomDownOut', {
    $nest: {
      '0%': {
        transformOrigin: '50% 100%',
        transform: 'scale(1, 1)',
      },
      '100%': {
        opacity: 0,
        transformOrigin: '50% 100%',
        transform: 'scale(0, 0)',
      },
    },
  });
};
