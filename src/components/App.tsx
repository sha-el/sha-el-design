import * as React from 'react';
import { Popover } from './Popover';
import { Calendar } from './Calendar';
import { Page } from './Page/Page';
import { MdArrowBack } from 'react-icons/md';
import { Tag } from './Tag';
import { AutoCompleteAsync } from './AutoComplete';

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
        <AutoCompleteAsync<{name: string, id: string}>
          mode='single'
          value={this.state.value}
          uniqueIdentifier={(v) => v.id}
          displayProp={(v) => v.name}
          data={(v: string) => new Promise((resolve, reject) => {
            resolve(this.response.filter(s => s.name.includes(v)));
          })}
          onChange={(value) => this.setState({ value })}
          label='Hello'
        />
      </Page>
    );
  }
}
