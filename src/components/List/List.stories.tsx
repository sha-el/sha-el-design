import React from 'react';
import { Meta } from '@storybook/react';

import { List, ListItem, CollapsibleList } from '../List';
import { MdAcUnit, Md3DRotation, MdAccessAlarm } from 'react-icons/md';
import { Divider } from '../Divider';

export default {
  title: 'Display/List',
  component: List,
  subcomponents: { ListItem, CollapsibleList },
  argTypes: {
    // backgroundColor: { control: 'color' },
  },
} as Meta;

export const Basic = () => (
  <List>
    <ListItem avatar={<MdAcUnit />}>Basic Item List</ListItem>
    <ListItem avatar={<Md3DRotation />}>Basic Item List</ListItem>
    <Divider />
    <ListItem avatar={<MdAccessAlarm />}>Basic Item List</ListItem>
    <ListItem>Basic Item List</ListItem>
  </List>
);

export const Subtitle = () => (
  <List>
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

export const Collapsible = () => (
  <List>
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
      <ListItem subtitle="Do you Know Lorem Ipsum?">Basic Item List</ListItem>
    </CollapsibleList>
    <ListItem subtitle="Do you Know Lorem Ipsum?">Basic Item List</ListItem>
  </List>
);
