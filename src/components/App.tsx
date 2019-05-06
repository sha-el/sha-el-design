import * as React from 'react';
import { initialize } from '../helpers';
import { AutoComplete } from './AutoComplete';
import { Button } from './Button';
import { Row, Col, Input } from '../index';
import { FaAbacus, FaAdjust } from 'react-icons/fa';
import { Loading, Skeleton } from './Loading';

export class App extends React.Component {

  data = [{ name: 'FULL_TIME', id: 1 }, { name: 'A', id: 2 }, { name: 'B', id: 2 }];

  state = {
    value: 50,
    data: this.data,
  };

  onChange = (e, f) => {
    this.setState({ value: e });
  }

  render() {
    initialize();

    const error: any = {aadharNumber: 'error', pan: 'error', gender: 'error', accountNumber: 'error'};
    const employeePersonalDetail: any = {};

    return (
      <Row>
        <Loading isLoading={true} />
        <Skeleton isLoading={true} />
      </Row>
    );
  }
}
