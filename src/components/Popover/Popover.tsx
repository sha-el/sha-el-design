import * as React from 'react';
import { stylesheet } from 'typestyle';
import { styleEnum } from '../../helpers/constants';
import { Portal } from './Portal';
import { findDOMNode } from 'react-dom';

export class Popover extends React.Component<PopoverProps, State> {

  public static defaultProps: Partial<PopoverProps> = {
    title: '',
    trigger: 'onClick',
    postion: 'bottom',
    style: {},
  };

  css = css.bind(this);
  child = React.createRef<HTMLDivElement>();
  container = React.createRef<HTMLDivElement>();

  constructor(props: PopoverProps) {
    super(props);

    this.state = {
      isVisible: props.isVisible,
      position: {
        left: 0,
        top: 0,
        width: 0,
      },
    };
  }

  componentDidMount() {
    const position = this.position();
    this.setState({ position });
  }

  componentWillReceiveProps(nextProps: PopoverProps) {
    if (nextProps.isVisible !== null && nextProps.isVisible !== undefined) {
      this.setState({ isVisible: nextProps.isVisible });
    }
  }

  getContainerWidth = (containerWidth: number) => {
    if (this.props.expand) {
      return (findDOMNode(this.child.current) as Element).getBoundingClientRect().width;
    }
    return containerWidth;
  }

  position = () => {
    const child = findDOMNode(this.child.current);
    const container = findDOMNode(this.container.current);
    if (!child || !container) {
      return { left: 0, top: 0, width: 0 };
    }

    const childRect = (child as Element).getBoundingClientRect();
    const containerRect = (container as Element).getBoundingClientRect();
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return {
      bottom: {
        left: (childRect.width / 2) - (this.getContainerWidth(containerRect.width) / 2) + childRect.left + scrollLeft,
        top: childRect.height + childRect.top + scrollTop,
        width: childRect.width,
      },
      top: {
        left: (childRect.width / 2) - (this.getContainerWidth(containerRect.width) / 2) + childRect.left + scrollLeft,
        top: childRect.top - containerRect.height + scrollTop,
        width: childRect.width,
      },
      left: {
        left: childRect.left - 10 - this.getContainerWidth(containerRect.width),
        top: childRect.height / 2 - containerRect.height / 2 + childRect.top + scrollTop,
        width: childRect.width,
      },
      right: {
        left: childRect.width + 10 + childRect.left,
        top: childRect.height / 2 - containerRect.height / 2 + childRect.top + scrollTop,
        width: childRect.width,
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
    return (this.state.isVisible || this.props.preserveOnClose) && (
      <>
        <div style={this.props.style.container} ref={this.container} className={styleSheet.container}>
          <div>
            {!this.props.hideArrow && <div style={this.arrowStyle()} />}
            {this.props.title && <div style={this.props.style.title} className={styleSheet.title}>
              {this.props.title}
            </div>}
            <div style={this.props.style.content} className={styleSheet.content}>
              {this.props.content}
            </div>
          </div>
        </div>
        <div
          onClick={this.closePopOver}
          onMouseOver={this.closePopOver}
          className='overlay'
          style={{
            position: 'fixed',
            display: 'block',
            width: '100%',
            height: '100%',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: -1,
            cursor: 'pointer',
          }}
        />
      </>
    );
  }

  triggerMouseEnter = () => {
    if (this.props.trigger !== 'onHover') {
      return;
    }
    this.setState({ isVisible: true }, () => this.setState({ position: this.position() }));
  }

  triggerOnFocus = () => {
    const { trigger } = this.props;
    if (trigger !== 'onFocus') {
      return;
    }
    this.setState({ isVisible: true }, () => this.setState({ position: this.position() }));
  }

  triggerClick = (e: React.MouseEvent) => {
    if (
      this.props.trigger !== 'onClick'
      || (e.target as HTMLElement).classList.contains('overlay')
    ) {
      return;
    }
    this.setState({ isVisible: true }, () => this.setState({ position: this.position() }));
  }

  closePopOver = (e: React.MouseEvent | React.FocusEvent) => {
    const { trigger } = this.props;
    if ((
      e.type === 'click' && trigger === 'onClick'
    ) || (
        e.type === 'blur' && trigger === 'onFocus'
      ) || (
        e.type === 'mouseover' && trigger === 'onHover'
        && e.target
        && (e.target as HTMLElement).classList.contains('overlay')
      )) {
      setTimeout(() => this.setState({ isVisible: false }), 250);
    }
  }

  render() {
    return [(
      <div
        onClick={this.triggerClick}
        onMouseEnter={this.triggerMouseEnter}
        key='container'
      >
        {React.cloneElement(this.props.children, {
          onFocus: this.triggerOnFocus,
          onBlur: this.closePopOver,
          ref: this.child,
        })}
        <Portal>
          {this.renderContent()}
        </Portal>
      </div>
    )];
  }
}

function css() {
  const { isVisible } = this.state;
  return stylesheet({
    container: {
      width: this.props.expand ? this.state.position.width : 'auto',
      minWidth: '100px',
      position: 'absolute',
      boxShadow: styleEnum.shadow_2x,
      zIndex: 2001,
      marginTop: this.props.hideArrow ? '2px' : '10px',
      left: this.state.position.left,
      top: this.state.position.top,
      background: 'white',
      borderRadius: '2px',
      visibility: isVisible ? 'visible' : 'hidden',
    },
    title: {
      textAlign: 'center',
      padding: '10px',
      borderBottom: `${styleEnum.borderStyle} ${styleEnum.borderWidth} ${styleEnum.borderColor}`,
      fontWeight: 500,
    },
    content: {
      padding: '4px 0px',
    },
  });
}

interface PopoverProps {
  children: React.ReactElement<any>;
  title?: React.ReactNode;
  trigger?: 'onClick' | 'onHover' | 'onFocus';
  postion?: 'top' | 'left' | 'bottom' | 'right';
  content?: React.ReactNode;
  hideArrow?: boolean;
  style?: {
    container?: React.CSSProperties;
    title?: React.CSSProperties;
    content?: React.CSSProperties;
  };
  isVisible?: boolean;
  expand?: boolean;
  preserveOnClose?: boolean;
}

interface State {
  isVisible: boolean;
  position: {
    left: number;
    top: number;
    width: number;
  };
}