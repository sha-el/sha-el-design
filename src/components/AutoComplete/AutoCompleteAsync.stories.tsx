import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { AutoCompleteAsync } from './index';

const stories = storiesOf('AutoCompleteAsync', module);

stories.add(
  'AutoComplete Async with single mode',
  withInfo({ inline: true })(() => (
    <AutoCompleteAsync
      data={e => new Promise(r => r(['John', 'Mary', 'Gabriel', 'Mark']))}
      label='Select Name'
      value={'John'}
      uniqueIdentifier={e => e}
      displayProp={e => e}
    />
  )),
);

stories.add(
  'AutoComplete Async with multiple mode',
  withInfo({ inline: true })(() => (
    <AutoCompleteAsync<string>
      data={e => new Promise(r => r(['John', 'Mary', 'Gabriel', 'Mark']))}
      label='Select Name'
      value={['John', 'Mary']}
      uniqueIdentifier={e => e}
      displayProp={e => e}
      mode='multiple'
      inputProps={{ placeholder: 'Select Name' }}
    />
  )),
);
