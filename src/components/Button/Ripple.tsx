import * as React from 'react';
import { Portal } from '../Popover/Portal';
import { style, keyframes } from 'typestyle';
import { any } from 'prop-types';

export class Ripple extends React.Component<RippleProps, State> {

  element = React.createRef<HTMLDivElement>();
  timer: any;

  static defaultProps: Partial<RippleProps> = {
    style: {},
  };

  constructor(props: RippleProps) {
    super(props);

    this.state = {
      rippleStyle: {
        position: 'absolute',
        borderRadius: '50%',
        opacity: 0,
        width: 35,
        height: 35,
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
        backgroundColor: props.color,
      },
      shouldShow: false,
    };
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  onClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.stopPropagation) {
      e.stopPropagation();
    }

    const {
      pageX,
      pageY,
      currentTarget: { offsetLeft, offsetTop, offsetWidth, offsetHeight },
    } = e;

    const left = pageX - offsetLeft;
    const top = pageY - offsetTop;
    const size = Math.max(offsetWidth, offsetHeight);

    this.setState({
      rippleStyle: {
        ...this.state.rippleStyle,
        top,
        left,
        opacity: 1,
        transform: 'translate(-50%, -50%)',
        transition: 'initial',
      },
    });

    this.timer = setTimeout(() => {
      this.setState({
        rippleStyle: {
          ...this.state.rippleStyle,
          opacity: 0,
          transform: `scale(${size / 9})`,
          transition: `all ${600}ms`,
        },
      });
    });
  }

  render() {
    return (
      <div
        onClick={this.onClick}
        style={{
          position: 'relative',
          display: 'inline-block',
          overflow: 'hidden',
          ...this.props.style,
        }}
        ref={this.element}
        className={this.props.className}
      >
        {this.props.children}
        <s
          style={this.state.rippleStyle}
        />
      </div>
    );
  }
}

export interface RippleProps {
  color: string;
  style: React.CSSProperties;
  className?: string;
}

interface State {
  rippleStyle: any;
  shouldShow: boolean;
}
