import * as React from 'react';
import RCTooltip from 'rc-tooltip';
import { classes, isBrowser } from '../../helpers';
import { useTheme } from '../Theme/Theme';
import { style } from './style';

export class Popover extends React.Component<PopoverProps, State> {
  public static defaultProps: Partial<PopoverProps> = {
    trigger: 'onClick',
    position: 'bottom',
    style: {},
    elevation: 12,
  };

  child = React.createRef<HTMLDivElement>();

  constructor(props: PopoverProps) {
    super(props);

    this.state = {
      childWidth: 0,
      childHeight: 0,
      isBrowser: false,
      visible: false,
    };
  }

  componentDidMount() {
    const childRect = this.child.current?.getBoundingClientRect();
    this.setState({
      childWidth: childRect?.width || 0,
      childHeight: childRect?.height || 0,
    });
    this.isBrowser();
  }

  static getDerivedStateFromProps(props: PopoverProps, state: State): Partial<State> {
    if (props.visible !== state.visible && props.visible !== undefined) {
      return {
        visible: props.visible,
      };
    }
    return {};
  }

  isBrowser = () => {
    if (isBrowser()) {
      return this.setState({ isBrowser: true });
    }
    setTimeout(this.isBrowser, 500);
  };

  renderContent = () => {
    const { hideArrow } = this.props;
    return (
      <div>
        <div className="rc-tooltip-arrow" style={{ display: !hideArrow ? 'block' : 'none' }} />
        <div>
          <div style={this.props.style?.content}>{this.props.content}</div>
        </div>
      </div>
    );
  };

  render() {
    return (
      <Container
        {...this.props}
        childWidth={this.state.childHeight}
        isBrowser={this.state.isBrowser}
        child={this.child}
        renderContent={this.renderContent}
        visible={this.state.visible}
      />
    );
  }
}

const Container: React.FC<ContainerProps> = (props) => {
  const theme = useTheme();
  const css = style({ expand: props.expand || false, childWidth: props.childWidth, theme });

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
    isBrowser,
    child,
    renderContent,
    visible,
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
      trigger={[triggers(trigger)]}
      overlay={renderContent()}
      destroyTooltipOnHide={!preserveOnClose}
      overlayClassName={classes(css.container, css[`elevation${elevation}`])}
      overlayStyle={containerStyle}
      onVisibleChange={(v) => {
        setState({ visible: v, childWidth: child.current?.getBoundingClientRect().width || 0 });
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

const triggers = (t: PopoverProps['trigger']) =>
  ({
    onClick: 'click',
    onHover: 'hover',
    onFocus: 'focus',
  }[t || 'onClick']);

export interface PopoverProps {
  children: React.ReactElement;
  trigger?: 'onClick' | 'onHover' | 'onFocus';
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
  elevation: number;
  cover?: boolean;
  animation?: string;
}

interface State {
  childWidth: number;
  isBrowser: boolean;
  visible: boolean;
  childHeight: number;
}

type ContainerProps = PopoverProps &
  State & {
    renderContent: () => JSX.Element;
  };
