import * as React from 'react';
import { createPortal } from 'react-dom';
import { classes } from '../../helpers';

export const PortalContext = React.createContext<{ element: HTMLDivElement }>({ element: null });

export class Portal extends React.Component<PortalProps, { dom: HTMLDivElement }> {
  constructor(props: PortalProps) {
    super(props);

    this.state = {
      dom: null,
    };
  }

  static defaultProps = {
    className: '',
  };

  createPortalDom = (element: HTMLDivElement) => {
    if (element) {
      return this.setState({ dom: element });
    }
    const dom = document.createElement('div');
    dom.className = classes(this.props.className, 'sha-el-portal');
    document.body.appendChild(dom);
    return this.setState({ dom });
  };

  componentDidMount() {
    if (!document) {
      setTimeout(this.componentDidMount, 500);
    }
    return this.createPortalDom(this.props.dom);
  }

  componentWillUnmount() {
    this.state.dom.remove();
  }

  render() {
    return (
      <PortalContext.Provider value={{ element: this.state.dom }}>
        {(this.state.dom && createPortal(this.props.children, this.state.dom)) || <div />}
      </PortalContext.Provider>
    );
  }
}

export interface PortalProps {
  children?: React.ReactNode;
  className?: string;
  dom?: HTMLDivElement;
}
