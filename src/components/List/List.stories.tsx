import React from 'react';
import { Story, Meta } from '@storybook/react';

import { List, ListItem, CollapsibleList } from '../List';
import { ListProps } from './List';
import { MdAcUnit, Md3DRotation, MdAccessAlarm, MdCheck } from 'react-icons/md';
import { Divider } from '../Divider';

export default {
  title: 'Display/List',
  component: List,
  subcomponents: { ListItem, CollapsibleList },
  argTypes: {
    // backgroundColor: { control: 'color' },
  },
} as Meta;

export const Basic: Story<ListProps> = (args) => (
  <List {...args}>
    <ListItem avatar={<MdAcUnit />}>Basic Item List</ListItem>
    <ListItem avatar={<Md3DRotation />}>Basic Item List</ListItem>
    <Divider />
    <ListItem avatar={<MdAccessAlarm />}>Basic Item List</ListItem>
    <ListItem>Basic Item List</ListItem>
  </List>
);

export const Subtitle: Story<ListProps> = (args) => (
  <List {...args}>
    <ListItem avatar={<MdAcUnit />} subtitle="Do you Know Lorem Ipsum?">
      Basic Item List
    </ListItem>
    <ListItem avatar={<Md3DRotation />} subtitle="Do you Know Lorem Ipsum?">
      Basic Item List
    </ListItem>
    <ListItem avatar={<MdAccessAlarm />} subtitle="Do you Know Lorem Ipsum?">
      Basic Item List
    </ListItem>
    <ListItem subtitle="Do you Know Lorem Ipsum?">Basic Item List</ListItem>
  </List>
);

export const Collapsible: Story<ListProps> = (args) => (
  <List {...args}>
    <ListItem avatar={<MdAcUnit />} subtitle="Do you Know Lorem Ipsum?">
      Basic Item List
    </ListItem>
    <ListItem avatar={<Md3DRotation />} subtitle="Do you Know Lorem Ipsum?">
      Basic Item List
    </ListItem>
    <ListItem avatar={<MdAccessAlarm />} subtitle="Do you Know Lorem Ipsum?">
      Basic Item List
    </ListItem>
    <CollapsibleList header={'Hello World'} action={<MdCheck />}>
      <List elevation={0}>
        <ListItem subtitle="Do you Know Lorem Ipsum?">Basic Item List</ListItem>
      </List>
    </CollapsibleList>
    <ListItem subtitle="Do you Know Lorem Ipsum?">Basic Item List</ListItem>
  </List>
);

export const Densed: Story<ListProps> = (args) => (
  <List densed {...args}>
    <ListItem avatar={<MdAcUnit />} subtitle="Do you Know Lorem Ipsum?">
      Basic Item List
    </ListItem>
    <ListItem avatar={<Md3DRotation />} subtitle="Do you Know Lorem Ipsum?">
      Basic Item List
    </ListItem>
    <ListItem avatar={<MdAccessAlarm />} subtitle="Do you Know Lorem Ipsum?">
      Basic Item List
    </ListItem>
    <CollapsibleList header={'Hello World'}>
      <List densed elevation={0}>
        <ListItem subtitle="Do you Know Lorem Ipsum?">Basic Item List</ListItem>
      </List>
    </CollapsibleList>
    <ListItem subtitle="Do you Know Lorem Ipsum?">Basic Item List</ListItem>
  </List>
);
