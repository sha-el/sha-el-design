import * as React from 'react';
import { createPortal } from 'react-dom';

export class Portal extends React.Component<Props, {}> {

  state = {
    mounted: false,
  };

  dom: HTMLDivElement;

  constructor(props: Props) {
    super(props);
  }

  componentDidMount() {
    this.setState({ mounted: true });
  }

  componentWillMount() {
    this.dom = document.createElement('div');
    document.body.appendChild(this.dom);
  }

  componentWillUnmount() {
    this.dom.remove();
  }

  render() {
    return this.state.mounted && createPortal(this.props.children, this.dom);
  }
}

interface Props {
  children: React.ReactNode;
}