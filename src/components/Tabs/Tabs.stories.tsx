import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import { Tabs } from '../Tabs';
import { TabPanel } from './TabPanel';

const stories = storiesOf('Tabs', module);

stories.add(
  'Basic',
  withInfo()(() => (
    <Tabs defaultActiveKey='1'>
      <TabPanel key='1' title='Tab 1'>
        Tab 1
      </TabPanel>
      <TabPanel key='2' title='Tab 2'>
        Tab 2
      </TabPanel>
    </Tabs>
  )),
);
