import * as React from 'react';
import { Popover } from './Popover';
import { Calendar } from './Calendar';
import { Page } from './Page/Page';
import { MdArrowBack } from 'react-icons/md';
import { Tag } from './Tag';

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
      <Page
        title='Calendar'
        subtitle='sub title'
        breadcrumbs={{
          seperator: '/',
          paths: ['home', 'calendar'].map(v => ({ render: () => v })),
        }}
        backIcon={<MdArrowBack size={25} />}
        tags={[<Tag color='red' key={'calendar'}>Calendar</Tag>, <Tag color='blue' key='blue'>Blue</Tag>]}
      >
        <Popover content={'adad'} trigger='onClick' ><span>hello</span></Popover>
        <Calendar />
      </Page>
    );
  }
}
