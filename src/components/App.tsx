import * as React from 'react';
import { Button, ButtonGroup, Input, Row, Col } from '../';

const Link = ({ to, children }) => <a href={to}>{children}</a>;

export class App extends React.Component {

  state = {
    value: true,
  };

  render() {
    return (
      <Row>
        <Col span={12}><Input style={{ width: '50%' }} /></Col>
        <Col span={12}><Button href='#'>heelo</Button></Col>
      </Row>
    );
  }
}
