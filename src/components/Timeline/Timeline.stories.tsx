import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { State, Store } from '@sambego/storybook-state';

import { Timeline } from './index';
import { TimelineItem } from './TimelineItem';
import { Card } from '../Card';
import { RadioGroup, Radio } from '../Radio';
import { MdEmail } from 'react-icons/md';

const stories = storiesOf('Timeline', module);

stories.add(
  'With custom icons and iconBgColor',
  withInfo({ inline: true })(() => (
    <Timeline>
      <TimelineItem iconBgColor='#2196F3'>
        <Card subtitle='2010-10-10'>
          SMS
        </Card>
      </TimelineItem>
      <TimelineItem iconBgColor='#F44336'>
        <Card subtitle='2010-10-10'>
          SMS
        </Card>
      </TimelineItem>
      <TimelineItem icon={<MdEmail />} iconBgColor='#4CAF50'>
        <Card subtitle='2010-10-10'>
          SMS
        </Card>
      </TimelineItem>
      <TimelineItem>
        <Card subtitle='2010-10-10'>
          SMS
        </Card>
      </TimelineItem>
    </Timeline>
  )),
);

stories.add(
  'Right Position',
  withInfo({ inline: true })(() => (
    <Timeline position='right'>
      <TimelineItem iconBgColor='#2196F3'>
        <Card subtitle='2010-10-10'>
          SMS
        </Card>
      </TimelineItem>
      <TimelineItem iconBgColor='#F44336'>
        <Card subtitle='2010-10-10'>
          SMS
        </Card>
      </TimelineItem>
      <TimelineItem icon={<MdEmail />} iconBgColor='#4CAF50'>
        <Card subtitle='2010-10-10'>
          SMS
        </Card>
      </TimelineItem>
      <TimelineItem>
        <Card subtitle='2010-10-10'>
          SMS
        </Card>
      </TimelineItem>
    </Timeline>
  )),
);

stories.add(
  'Altranate Position',
  withInfo({ inline: true })(() => (
    <Timeline position='alternate'>
      <TimelineItem iconBgColor='#2196F3'>
        <Card subtitle='2010-10-10'>
          SMS
        </Card>
      </TimelineItem>
      <TimelineItem iconBgColor='#F44336'>
        <Card subtitle='2010-10-10'>
          SMS
        </Card>
      </TimelineItem>
      <TimelineItem icon={<MdEmail />} iconBgColor='#4CAF50'>
        <Card subtitle='2010-10-10'>
          SMS
        </Card>
      </TimelineItem>
      <TimelineItem>
        <Card subtitle='2010-10-10'>
          SMS
        </Card>
      </TimelineItem>
    </Timeline>
  )),
);

type positionType = 'left' | 'right' | 'alternate';

const store = new Store<{ position: positionType; value: string }>({ position: 'left', value: 'left' });

stories.add(
  'With extra props',
  withInfo({ inline: true })(() => (
    <State store={store}>
      <RadioGroup
        name='position'
        onChange={(e) => store.set({ position: (e.target.value as positionType), value: e.target.value })}
        value={store.get('position')}
      >
        <Radio label='Left' value='left' />
        <Radio label='Right' value='right' />
        <Radio label='Alternate' value='alternate' />
      </RadioGroup>
      <Timeline position={store.get('position')}>
        <TimelineItem extra='2010-20-20' iconBgColor='#2196F3'>
          <Card>
            SMS
        </Card>
        </TimelineItem>
        <TimelineItem extra='2010-20-20' iconBgColor='#F44336'>
          <Card>
            SMS
        </Card>
        </TimelineItem>
        <TimelineItem extra='2010-20-20' icon={<MdEmail />} iconBgColor='#4CAF50'>
          <Card>
            SMS
        </Card>
        </TimelineItem>
        <TimelineItem extra='2010-20-20'>
          <Card>
            SMS
        </Card>
        </TimelineItem>
      </Timeline>
    </State>
  )),
);