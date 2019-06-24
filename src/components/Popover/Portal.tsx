import * as React from 'react';
import { createPortal } from 'react-dom';

export class Portal extends React.Component<Props, {}> {

  state = {
    dom: null,
  };

  constructor(props: Props) {
    super(props);
  }

  createPortalDom = () => {
    const dom = document.createElement('div');
    document.body.appendChild(dom);
    return this.setState({ dom });
  }

  componentDidMount() {
    if (document) {
      return this.createPortalDom();
    }
    setTimeout(this.componentDidMount, 500);
  }

  componentWillUnmount() {
    this.state.dom.remove();
  }

  render() {
    return this.state.dom && createPortal(this.props.children, this.state.dom);
  }
}

interface Props {
  children: React.ReactNode;
}