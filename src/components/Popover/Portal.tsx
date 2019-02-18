import * as React from 'react';
import { createPortal } from 'react-dom';

export class Portal extends React.Component<Props, {}> {

  dom: HTMLDivElement;

  constructor(props: Props) {
    super(props);
  }

  componentWillMount() {
    this.dom = document.createElement('div');
    document.body.appendChild(this.dom);
  }

  componentWillUnmount() {
    this.dom.remove();
  }

  render() {
    return createPortal(this.props.children, this.dom);
  }
}

interface Props {
  children: React.ReactNode;
}