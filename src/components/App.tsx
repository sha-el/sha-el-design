import * as React from 'react';
import { Popover } from './Popover';
import { Calendar } from './Calendar';
import { Page } from './Page/Page';
import { MdArrowBack } from 'react-icons/md';
import { Tag } from './Tag';
import { AutoCompleteAsync } from './AutoComplete';
import { Input } from './Input';
import { Card, Button } from '..';
import { Table } from './Table';
import { FaMedal, Fa500Px, FaAccessibleIcon } from 'react-icons/fa';

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
    value: null,
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
        <Card
          title='Login'
          subtitle='Please Enter Username Password'
          style={{
            container: {
              width: '50%',
              margin: 'auto',
            },
          }}
          footer={
            <>
              <Button type='primary' link>Forget Password?</Button>
            </>
          }
        >
          <Input placeholder='Email Sender askda' hint='Add Email' before={<FaMedal />} label='Email' after={<FaAccessibleIcon />} />
          <Input label='Password' defaultValue='Hello?' />
          <Button displayBlock type='primary'>
            Sumbit
          </Button>
        </Card>
        <Table
          data={[{ name: 'name', age: 'age' }]}
          columns={[{
            header: 'name',
            key: 'name',
            dataIndex: 'name',
          }, {
            header: 'age',
            key: 'age',
            dataIndex: 'age',
          }]}
        />
      </>
    );
  }
}
