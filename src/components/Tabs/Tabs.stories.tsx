import React from 'react';
import { Story, Meta } from '@storybook/react';

import { Tabs } from '../Tabs';
import { TabPanel, TabHeader } from '.';
import { TabsProps } from './Tabs';

export default {
  title: 'Navigation/Tabs',
  component: Tabs,
  subcomponents: { TabPanel, TabHeader },
  argTypes: {
    // backgroundColor: { control: 'color' },
  },
} as Meta;

export const Basic: Story<TabsProps> = (args) => (
  <Tabs {...args}>
    <TabPanel key="1" title="Tab 1">
      Tab 1
    </TabPanel>
    <TabPanel key="2" title="Tab 2">
      Tab 2
    </TabPanel>
  </Tabs>
);

Basic.args = {
  defaultActiveKey: '1',
};

export const UnmountOnChange = Basic.bind({});
UnmountOnChange.args = {
  defaultActiveKey: '1',
  UnmountOnChange: true,
};
