import * as React from 'react';
import { stylesheet } from 'typestyle';
import { styleEnum } from '../helpers/constants';
import { NestedCSSProperties } from 'typestyle/lib/types';
import { nestedAccess } from '../helpers';

export class Popover extends React.Component<PopoverProps, State> {

  public static defaultProps: Partial<PopoverProps> = {
    title: '',
    trigger: 'onClick',
    postion: 'bottom',
    style: {},
  };

  css = css.bind(this);
  parent = React.createRef<HTMLDivElement>();
  container = React.createRef<HTMLDivElement>();

  constructor(props: PopoverProps) {
    super(props);

    this.state = {
      isVisible: false,
      position: {
        left: 0,
        top: 0,
      },
    };
  }

  componentDidMount() {
    const position = this.position();
    this.setState({ position });
  }

  triggerClick = (e: React.MouseEvent) => {
    if (this.props.trigger !== 'onClick') {
      return;
    }
    this.setState({ isVisible: true }, () => this.setState({ position: this.position() }));
    document.documentElement.addEventListener('click', () => {
      this.setState({ isVisible: false });
      document.documentElement.removeEventListener('click', () => { });
    });
  }

  position = () => {
    if (!this.parent.current || !this.container.current) {
      return {left: 0, top: 0};
    }
    const parentRect = this.parent.current.getBoundingClientRect();
    const containerRect = this.container.current.getBoundingClientRect();
    return {
      bottom: {
        left: (parentRect.width / 2) - (containerRect.width / 2) + parentRect.left,
        top: parentRect.height + parentRect.top,
      },
      top: {
        left: (parentRect.width / 2) - (containerRect.width / 2) + parentRect.left,
        top: parentRect.top - containerRect.height,
      },
      left: {
        left: parentRect.left - 10 - containerRect.width,
        top: parentRect.height / 2 - containerRect.height / 2 + parentRect.top,
      },
      right: {
        left: parentRect.width + 10 + parentRect.left,
        top: parentRect.height / 2 - containerRect.height / 2 + parentRect.top,
      },
    }[this.props.postion];
  }

  arrowStyle = (): React.CSSProperties => {
    const common = {
      width: '0',
      height: '0',
      margin: 'auto',
    };
    switch (this.props.postion) {
      case 'bottom': {
        return ({
          ...common,
          borderLeft: '5px solid transparent',
          borderRight: '5px solid transparent',
          borderBottom: '5px solid #f0f0f0',
          marginTop: '-6px',
        });
      }
      case 'top': {
        return ({
          ...common,
          borderLeft: '5px solid transparent',
          borderRight: '5px solid transparent',
          borderTop: '5px solid #f0f0f0',
          left: '0',
          right: '0',
          position: 'absolute',
          bottom: '-5px',
        });
      }
      case 'left': {
        return ({
          borderBottom: '5px solid transparent',
          borderLeft: '5px solid #f0f0f0',
          borderTop: '5px solid transparent',
          position: 'absolute',
          right: '-5px',
          top: 'calc(50% - 5px)',
        });
      }
      case 'right': {
        return ({
          borderBottom: '5px solid transparent',
          borderRight: '5px solid #f0f0f0',
          borderTop: '5px solid transparent',
          position: 'absolute',
          left: '-5px',
          top: 'calc(50% - 5px)',
        });
      }
    }
  }

  renderContent = () => {
    const styleSheet = this.css();
    if (this.state.isVisible) {
      return (
        <div style={this.props.style.container} ref={this.container} className={styleSheet.container}>
          {!this.props.hideArrow && <div style={this.arrowStyle()} />}
          <div style={this.props.style.title} className={styleSheet.title}>
            {this.props.title}
          </div>
          <div style={this.props.style.content} className={styleSheet.content}>
            {this.props.content}
          </div>
        </div>
      );
    }
  }

  triggerMouseEnter = () => {
    if (this.props.trigger !== 'onHover') {
      return;
    }
    this.setState({ isVisible: true }, () => this.setState({ position: this.position() }));
    this.parent.current.addEventListener('mouseleave', () => {
      this.setState({ isVisible: false });
    });
  }

  render() {
    return (
      <div
        onClick={this.triggerClick}
        onMouseEnter={this.triggerMouseEnter}
        ref={this.parent}
      >
        {this.props.children}
        {this.renderContent()}
      </div>
    );
  }
}

function css() {
  return stylesheet({
    container: {
      width: 'auto',
      minWidth: '100px',
      position: 'absolute',
      boxShadow: styleEnum.shadow_2x,
      zIndex: 1000,
      marginTop: this.props.hideArrow ? '2px' : '10px',
      left: this.state.position.left,
      top: this.state.position.top,
      background: 'white',
      borderRadius: '2px',
    },
    title: {
      textAlign: 'center',
      padding: '10px',
      borderBottom: `${styleEnum.borderStyle} ${styleEnum.borderWidth} ${styleEnum.borderColor}`,
      fontWeight: 500,
    },
    content: {
      padding: '10px',
    },
  });
}

interface PopoverProps {
  children: React.ReactNode;
  title?: React.ReactNode;
  trigger?: 'onClick' | 'onHover';
  postion?: 'top' | 'left' | 'bottom' | 'right';
  content?: React.ReactNode;
  hideArrow?: boolean;
  style?: {
    container?: React.CSSProperties;
    title?: React.CSSProperties;
    content?: React.CSSProperties;
  };
}

interface State {
  isVisible: boolean;
  position: {
    left: number;
    top: number;
  };
}