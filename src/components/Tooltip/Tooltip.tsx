import { debounce } from 'debounce';
import React, { useContext, useEffect, useState } from 'react';
import { usePopper } from 'react-popper';
import { classes } from '../../helpers';
import { borderCss } from '../../helpers/border';
import { elevationCss } from '../../helpers/elevations';
import { marginCss } from '../../helpers/margin';
import { paddingCss } from '../../helpers/padding';
import { SurfaceProps } from '../../typings/surface';
import { Portal, PortalContext } from '../Portal/Portal';
import { useTheme } from '../Theme/Theme';
import { style } from './style';

export type ActionType = 'onClick' | 'onFocus' | 'onMouseOver';
export type CloseActionType = 'onClick' | 'onBlur' | 'onMouseLeave';

export type TooltipPlacement =
  | 'auto'
  | 'auto-start'
  | 'auto-end'
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'right'
  | 'right-start'
  | 'right-end'
  | 'left'
  | 'left-start'
  | 'left-end';

export type TooltipStrategy = 'absolute' | 'fixed';

export interface TooltipProps extends SurfaceProps {
  /**
   * reference Element
   */
  children: React.ReactElement;
  /**
   * Content to be displayed
   */
  overlay?: React.ReactNode;
  /**
   * Triggers to open tooltip
   * @default 'onMouseEnter'
   */
  trigger?: ActionType | ActionType[];

  /**
   * Triggers to close tooltip
   * @default 'based on trigger'
   */
  closeTrigger?: CloseActionType | CloseActionType[];

  /**
   * Placement of tooltip
   */
  placement?: TooltipPlacement;

  /**
   * Describes the positioning strategy to use.
   */
  strategy?: TooltipStrategy;
  /**
   * Controlled way to handle tooltip state
   */
  visible?: boolean;
  /**
   * Triggers on tooltip state change
   */
  onVisibleChange?: (visible: boolean) => void;
  /**
   * Hides arrrow
   */
  hideArrow?: boolean;
  /**
   * Refernce dom object
   */
  referenceElement?: (e: HTMLElement) => void;
  /**
   * Overlay classname
   */
  className?: string;
  /**
   * Arrow classname
   */
  arrowClassName?: string;
  /**
   * Style object for overlay
   */
  style?: React.CSSProperties;
  /**
   * Style object for arrow
   */
  arrowStyle?: React.CSSProperties;
}

export const Tooltip: React.FC<TooltipProps> = (props) => {
  const {
    elevation,
    border,
    padding,
    margin,
    placement,
    children,
    overlay,
    trigger,
    closeTrigger,
    visible,
    hideArrow,
    onVisibleChange,
  } = props;

  const [referenceElement, setReferenceElement] = useState<HTMLElement>(null);
  const [popperElement, setPopperElement] = useState<HTMLElement>(null);
  const [arrowElement, setArrowElement] = useState<HTMLElement>(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    modifiers: [{ name: 'arrow', options: { element: arrowElement } }],
    placement,
  });

  const [isOpen, updateTooltipState] = useState(visible || false);

  const onClose = () => {
    updateTooltipState(false);
    onVisibleChange?.(false);
    document.body.removeEventListener('mouseover', handleClose);
    document.body.removeEventListener('click', handleClose);
  };

  const debouncedFn = debounce(onClose, 300);

  useEffect(() => {
    if (visible) {
      attachEvents(Array.isArray(trigger) ? trigger[0] : trigger);
      updateTooltipState(true);
    } else {
      onClose();
    }
    return debouncedFn.flush;
  }, [visible]);

  const handleVisible = (actionType: ActionType) => {
    if (!trigger.includes(actionType)) {
      return;
    }
    if (actionType === 'onClick' && isOpen) {
      debouncedFn();
    }
    updateTooltipState(true);
    onVisibleChange?.(true);
    attachEvents(actionType);
  };

  const attachEvents = (trigger: ActionType) => {
    if ((trigger === 'onMouseOver' && closeTrigger === undefined) || closeTrigger?.includes('onMouseLeave')) {
      document.body.addEventListener('mouseover', handleClose);
    }

    if ((trigger === 'onClick' && closeTrigger === undefined) || closeTrigger?.includes('onClick')) {
      document.body.addEventListener('click', handleClose);
    }

    if ((trigger === 'onFocus' && closeTrigger === undefined) || closeTrigger?.includes('onBlur')) {
      referenceElement.addEventListener('blur', handleClose);
    }
  };

  const dom = useContext(PortalContext);

  function handleClose(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (
      (target.isSameNode(referenceElement) ||
        target.isSameNode(popperElement) ||
        target.isSameNode(arrowElement) ||
        referenceElement?.contains(target) ||
        popperElement?.parentElement?.contains(target) ||
        popperElement?.contains(target)) &&
      event.type !== 'blur'
    ) {
      return;
    }
    debouncedFn();
  }

  const theme = useTheme();
  const css = style(theme, isOpen, attributes.popper?.['data-popper-placement'], hideArrow);

  return (
    <>
      {React.cloneElement(children, {
        ref: (e: HTMLElement) => {
          setReferenceElement(e);
          props.referenceElement?.(e);
        },
        onClick: (e: React.MouseEvent) => {
          e.stopPropagation();
          handleVisible('onClick');
          children.props.onClick?.(e);
        },
        onFocus: (e: React.FocusEvent) => {
          handleVisible('onFocus');
          children.props.onFocus?.(e);
        },
        onMouseOver: (e: React.MouseEvent) => {
          handleVisible('onMouseOver');
          children.props.onMouseEnter?.(e);
        },
        onBlur: (e: React.FocusEvent) => {
          handleVisible('onFocus');
          children.props.onBlur?.(e);
        },
      })}
      <Portal dom={dom.element}>
        <div
          className={classes(css.content, 'sha-el-tooltip')}
          ref={setPopperElement}
          style={styles.popper}
          {...attributes.poppper}
        >
          <div
            className={classes(
              css.inner,
              props.className,
              elevationCss(elevation),
              borderCss(border),
              paddingCss(padding),
              marginCss(margin),
              'sha-el-tooltip-inner',
            )}
            style={props.style}
          >
            {overlay}
            {!hideArrow && (
              <div
                ref={setArrowElement}
                style={{ ...styles.arrow, ...props.arrowStyle }}
                className={classes('arrow', css.arrow)}
              />
            )}
          </div>
        </div>
      </Portal>
    </>
  );
};

Tooltip.defaultProps = {
  padding: [5, 10],
  placement: 'bottom',
  trigger: 'onMouseOver',
  elevation: 12,
  overlay: '',
  style: {},
  arrowStyle: {},
};
