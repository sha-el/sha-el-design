import * as React from 'react';
import { createPortal } from 'react-dom';

export const PortalContext = React.createContext<{ element: HTMLDivElement }>({ element: null });

export class Portal extends React.Component<Props, { dom: HTMLDivElement }> {
  constructor(props: Props) {
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
    dom.className = this.props.className + ' sha-el-portal';
    document.body.appendChild(dom);
    return this.setState({ dom });
  };

  componentDidMount() {
    if (document) {
      return this.createPortalDom(this.props.dom);
    }
    setTimeout(this.componentDidMount, 500);
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

interface Props {
  className?: string;
  dom?: HTMLDivElement;
}
