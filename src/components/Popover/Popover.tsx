import * as React from 'react';
import { stylesheet } from 'typestyle';
import RCTooltip from 'rc-tooltip';
import { styleEnum } from '../../helpers/constants';

export class Popover extends React.Component<PopoverProps, State> {

  public static defaultProps: Partial<PopoverProps> = {
    title: '',
    trigger: 'onClick',
    position: 'bottom',
    style: {},
  };

  css = css.bind(this);
  child = React.createRef<HTMLElement>();

  constructor(props: PopoverProps) {
    super(props);

    this.state = {
      childWidth: 0,
    };
  }

  componentDidMount() {
    this.setState({ childWidth: this.child.current.offsetWidth });
  }

  renderContent = () => {
    const styleSheet = this.css();
    const { hideArrow } = this.props;
    return (
      <>
        <div>
          <div className='rc-tooltip-arrow' style={{ display: !hideArrow && 'block' }} />
          <div>
            {this.props.title && <div style={this.props.style.title} className={styleSheet.title}>
              {this.props.title}
            </div>}
            <div style={this.props.style.content}>
              {this.props.content}
            </div>
          </div>
        </div>
      </>
    );
  }

  render() {
    const { trigger, children, preserveOnClose, position,
      style: { container: containerStyle }, onVisibleChange, visible } = this.props;
    const style = this.css();
    return (
      <RCTooltip
        placement={position}
        trigger={[triggers(trigger)]}
        transitionName='rc-tooltip-zoom'
        overlay={this.renderContent()}
        destroyTooltipOnHide={!preserveOnClose}
        overlayClassName={style.container}
        overlayStyle={containerStyle}
        onVisibleChange={(v) => {
          v && this.setState({ childWidth: this.child.current.offsetWidth });
          onVisibleChange(v);
        }}
        visible={visible}
      >
        {React.cloneElement(children, { ref: this.child })}
      </RCTooltip>
    );
  }
}

const triggers = (t: PopoverProps['trigger']): any => ({
  onClick: 'click',
  onHover: 'hover',
  onFocus: 'focus',
}[t]);

function css() {
  return stylesheet({
    container: {
      width: this.props.expand ? this.state.childWidth : 'auto',
      minWidth: '100px',
      boxShadow: styleEnum.shadow_2x,
      background: 'white',
      borderRadius: '2px',
      padding: '0',
    },
    title: {
      textAlign: 'center',
      padding: '10px',
      borderBottom: `${styleEnum.borderStyle} ${styleEnum.borderWidth} ${styleEnum.borderColor}`,
      fontWeight: 500,
    },
  });
}

interface PopoverProps {
  children: React.ReactElement<any>;
  title?: React.ReactNode;
  trigger?: 'onClick' | 'onHover' | 'onFocus';
  position?: 'left' | 'right' | 'top' | 'bottom' |
  'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';
  content?: React.ReactNode;
  hideArrow?: boolean;
  style?: {
    container?: React.CSSProperties;
    title?: React.CSSProperties;
    content?: React.CSSProperties;
  };
  expand?: boolean;
  preserveOnClose?: boolean;
  visible?: boolean;
  onVisibleChange?: (visible?: boolean) => void;

}

interface State {
  childWidth: number;
}