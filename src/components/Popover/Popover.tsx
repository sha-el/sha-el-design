import * as React from 'react';
import RCTooltip from 'rc-tooltip';
import { classes, isBrowser } from '../../helpers';
import { useTheme } from '../Theme/Theme';
import { style } from './style';
import { elevationCss } from '../../helpers/elevations';

export const Popover: React.FC<PopoverProps> = (props) => {
  const theme = useTheme();
  const [childWidth, updateChildWidth] = React.useState<number>();
  const [visible, updateVisible] = React.useState<boolean>(props.visible);
  const child = React.useRef<HTMLDivElement>();
  const css = style(theme, props.expand || false, childWidth);

  React.useEffect(() => {
    updateVisible(props.visible);
  }, [props.visible]);

  const renderContent = () => {
    const { hideArrow } = props;
    return (
      <div>
        <div className="rc-tooltip-arrow" style={{ display: !hideArrow ? 'block' : 'none' }} />
        <div>
          <div style={props.style?.content}>{props.content}</div>
        </div>
      </div>
    );
  };

  const {
    trigger,
    children,
    preserveOnClose,
    position,
    cover,
    align,
    animation,
    style: { container: containerStyle = {}, child: childStyle = {} } = {},
    onVisibleChange,
    elevation = 12,
  } = props;

  if (!isBrowser) {
    return (
      <div ref={child} style={childStyle}>
        {React.cloneElement(children)}
      </div>
    );
  }
  return (
    <RCTooltip
      placement={position}
      trigger={triggers(trigger)}
      overlay={renderContent()}
      destroyTooltipOnHide={!preserveOnClose}
      overlayClassName={classes(css, elevationCss(elevation))}
      overlayStyle={containerStyle}
      onVisibleChange={(v) => {
        if (props.visible === undefined) {
          updateVisible(v);
        }
        updateChildWidth(child?.current?.getBoundingClientRect().width || 0);
        onVisibleChange && onVisibleChange(v);
      }}
      visible={visible}
      align={cover ? { points: ['tl', 't'] } : align}
      animation={animation}
    >
      <div ref={child} style={{ display: 'inline-block', ...childStyle }}>
        {React.cloneElement(children)}
      </div>
    </RCTooltip>
  );
};

const triggers = (t: PopoverProps['trigger']) => {
  const obj = {
    onClick: 'click',
    onHover: 'hover',
    onFocus: 'focus',
  };

  if (Array.isArray(t)) {
    return t.map((v) => obj[v]);
  }

  return [obj[t || 'onClick']];
};

type triggers = 'onClick' | 'onHover' | 'onFocus';

export interface PopoverProps {
  children: React.ReactElement;
  trigger?: triggers | triggers[];
  position?: 'left' | 'right' | 'top' | 'bottom' | 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';
  content?: React.ReactNode;
  hideArrow?: boolean;
  style?: {
    container?: React.CSSProperties;
    title?: React.CSSProperties;
    content?: React.CSSProperties;
    child?: React.CSSProperties;
  };
  expand?: boolean;
  preserveOnClose?: boolean;
  visible?: boolean;
  onVisibleChange?: (visible?: boolean) => void;
  align?: Record<string, unknown>;
  elevation?: number;
  cover?: boolean;
  animation?: string;
}

Popover.defaultProps = {
  trigger: 'onClick',
  position: 'bottom',
  style: {},
  elevation: 12,
};
