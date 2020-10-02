import * as React from 'react';
import { stylesheet, classes } from 'typestyle';
import RCTooltip from 'rc-tooltip';
import { isBrowser } from '../../helpers';
import { ThemeConsumer, Theme } from '../Theme/Theme';
import elevations from '../../helpers/elevations';

export class Popover extends React.Component<PopoverProps, State> {
  public static defaultProps: Partial<PopoverProps> = {
    trigger: 'onClick',
    position: 'bottom',
    style: {},
  };

  child = React.createRef<HTMLDivElement>();

  constructor(props: PopoverProps) {
    super(props);

    this.state = {
      childWidth: 0,
      isBrowser: false,
      visible: false,
    };
  }

  componentDidMount() {
    this.setState({ childWidth: this.child.current.offsetWidth });
    this.isBrowser();
  }

  static getDerivedStateFromProps(props: PopoverProps, state: State): Partial<State> {
    if (props.visible !== state.visible && props.visible !== undefined) {
      return {
        visible: props.visible,
      };
    }
    return null;
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
        <div className="rc-tooltip-arrow" style={{ display: !hideArrow && 'block' }} />
        <div>
          <div style={this.props.style.content}>{this.props.content}</div>
        </div>
      </div>
    );
  };

  render() {
    const {
      trigger,
      children,
      preserveOnClose,
      position,
      style: { container: containerStyle, child: childStyle },
      onVisibleChange,
      elevation = 0,
    } = this.props;

    if (!this.state.isBrowser) {
      return (
        <div ref={this.child} style={childStyle}>
          {React.cloneElement(children)}
        </div>
      );
    }

    return (
      <ThemeConsumer>
        {(theme) => {
          const css = style(this.props.expand, this.state.childWidth, theme);
          return (
            <RCTooltip
              placement={position}
              trigger={[triggers(trigger)]}
              overlay={this.renderContent()}
              destroyTooltipOnHide={!preserveOnClose}
              overlayClassName={classes(css.container, css[`elevation${elevation}`])}
              overlayStyle={containerStyle}
              onVisibleChange={(v) => {
                this.setState({ visible: v });
                onVisibleChange && onVisibleChange(v);
              }}
              visible={this.state.visible}
              align={this.props.align}
            >
              <div ref={this.child} style={{ display: 'inline-block', ...childStyle }}>
                {React.cloneElement(children)}
              </div>
            </RCTooltip>
          );
        }}
      </ThemeConsumer>
    );
  }
}

const triggers = (t: PopoverProps['trigger']) =>
  ({
    onClick: 'click',
    onHover: 'hover',
    onFocus: 'focus',
  }[t]);

function style(expand: boolean, childWidth: number, theme: Theme) {
  return stylesheet({
    container: {
      width: expand ? childWidth : 'auto',
      minWidth: '100px',
      borderRadius: '2px',
      padding: '0',
      background: theme.background,
      color: `${theme.textColor} !important`,
    },
    ...elevations(theme),
  });
}

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
}

interface State {
  childWidth: number;
  isBrowser: boolean;
  visible: boolean;
}
