import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import { Timeline } from './index';
import { TimelineItem } from './TimelineItem';
import { Card } from '../Card';
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
      <TimelineItem position='right' iconBgColor='#F44336'>
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
    <Timeline position='altranate'>
      <TimelineItem iconBgColor='#2196F3'>
        <Card subtitle='2010-10-10'>
          SMS
        </Card>
      </TimelineItem>
      <TimelineItem position='right' iconBgColor='#F44336'>
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
)