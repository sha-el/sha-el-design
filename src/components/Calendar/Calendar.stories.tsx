import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import { Calendar } from '../..';
import { weeksEnum } from './Calendar';

const stories = storiesOf('Calendar', module);

stories.add(
  'Basic Calendar',
  withInfo({ inline: true })(() => (
    <Calendar />
  )),
);

stories.add(
  'With Cell Append',
  withInfo({ inline: true })(() => (
    <Calendar
      cellRender={([year, month, day], week) => {
        if (week === weeksEnum.SUNDAY) {
          return <div style={{ background: 'red', color: 'white' }}>{day}</div>;
        }
      }}
    />
  )),
);

stories.add(
  'With Calendar Events',
  withInfo({ inline: true })(() => (
    <Calendar
      callendarEvents={[{
        startDate: [2020, 2, 5],
        endDate: [2020, 2, 20],
        eventName: 'Event 1',
        color: '#fcf',
      }, {
        startDate: [2020, 2, 15],
        endDate: [2020, 4, 22],
        eventName: 'Event 2',
      }]}
      isDateDisabled={
        ([year, month, day]) => day === 5
      }
    />
  )),
);