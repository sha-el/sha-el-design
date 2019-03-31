import * as React from 'react';
import { initialize } from '../helpers';
import { CheckBox } from './CheckBox';
import { Input } from './Input';
import { Row, Col } from './Grid';

export class App extends React.Component {

  data = [{ name: 'FULL_TIME', id: 1 }, { name: 'A', id: 2 }, { name: 'B', id: 2 }];

  state = {
    value: true,
    data: this.data,
  };

  onChange = (e) => {
    this.setState({ value: e });
  }

  render() {
    initialize();

    return (
      <div>
        <Row>
          <Col span={12}>
            <CheckBox
              label='Hello'
              checked={this.state.value}
              onChange={e => this.setState({ value: e.target.checked })}
            />
          </Col>
          <Col span={12}>
            <Input label='Yes?' />
          </Col>
        </Row>
      </div>
    );
  }
}
