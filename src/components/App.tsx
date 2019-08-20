import * as React from 'react';
import { Input, Row, Col, Radio, Button } from '../';
import { RadioGroup, RadioButton } from '../';
import { Popover } from './Popover';
import { Calendar } from './Calendar';
import { AutoComplete } from './AutoComplete';
import { MdSearch, MdPermIdentity, MdShoppingCart } from 'react-icons/md';

export class App extends React.Component {

  response = [{
    id: '1',
    name: 'abc',
  }, {
    id: '2',
    name: 'xyz',
  }, {
    id: '3',
    name: 'xyz',
  }];

  state = {
    value: '1',
    name: '',
    response: this.response,
  };

  onNameChange = (name: string) => {
    const response = this.response.filter(v => v.name.includes(name));
    this.setState({ name, response });
  }

  render() {
    return (
      <>
        <Popover content={'adad'} trigger='onClick' ><span>hello</span></Popover>
        <Calendar />
      </>
    );
  }
}
