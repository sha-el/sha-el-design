import * as React from 'react';
import { Input, Row, Col, Radio, Button } from '../';
import { RadioGroup, RadioButton } from '../';

export class App extends React.Component {

  state = {
    value: '1',
  };

  render() {
    return (
      <Row>
        <Col span={12}><Input style={{ width: '50%' }} /></Col>
        <Col span={8}>
          <RadioGroup
            name='abacus'
            value={this.state.value}
            onChange={(e) => this.setState({ value: e.target.value })}
          >
            <Radio disabled label='HEllo' value='1' />
            <Radio label='ola' value='2' />
          </RadioGroup>
        </Col>
      </Row>
    );
  }
}
