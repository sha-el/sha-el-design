import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import { List, ListItem, CollapsibleList } from '../List';
import { MdAcUnit, Md3DRotation, MdAccessAlarm } from 'react-icons/md';
import { Divider } from '../Divider';

const stories = storiesOf('List', module);

stories.add(
  'Basic',
  withInfo()(() => (
    <div
      style={{
        margin: 'auto',
        maxWidth: '400px',
      }}
    >
      <List>
        <ListItem
          avatar={
            <MdAcUnit />
          }
        >
          Basic Item List
        </ListItem>
        <ListItem
          avatar={
            <Md3DRotation />
          }
        >
          Basic Item List
        </ListItem>
        <Divider />
        <ListItem
          avatar={
            <MdAccessAlarm />
          }
        >
          Basic Item List
        </ListItem>
        <ListItem>
          Basic Item List
        </ListItem>
      </List>
    </div>
  )),
);

stories.add(
  'With subtitle',
  withInfo()(() => (
    <div
      style={{
        margin: 'auto',
        maxWidth: '400px',
      }}
    >
      <List>
        <ListItem
          avatar={
            <MdAcUnit />
          }
          subtitle='Do you Know Lorem Ipsum?'
        >
          Basic Item List
        </ListItem>
        <ListItem
          avatar={
            <Md3DRotation />
          }
          subtitle='Do you Know Lorem Ipsum?'
        >
          Basic Item List
        </ListItem>
        <ListItem
          avatar={
            <MdAccessAlarm />
          }
          subtitle='Do you Know Lorem Ipsum?'
        >
          Basic Item List
        </ListItem>
        <ListItem
          subtitle='Do you Know Lorem Ipsum?'
        >
          Basic Item List
        </ListItem>
      </List>
    </div>
  )),
);

stories.add(
  'Collapsible List',
  withInfo()(() => (
    <div
      style={{
        margin: 'auto',
        maxWidth: '400px',
      }}
    >
      <List>
        <ListItem
          avatar={
            <MdAcUnit />
          }
          subtitle='Do you Know Lorem Ipsum?'
        >
          Basic Item List
        </ListItem>
        <ListItem
          avatar={
            <Md3DRotation />
          }
          subtitle='Do you Know Lorem Ipsum?'
        >
          Basic Item List
        </ListItem>
        <ListItem
          avatar={
            <MdAccessAlarm />
          }
          subtitle='Do you Know Lorem Ipsum?'
        >
          Basic Item List
        </ListItem>
        <CollapsibleList
          header={'Hello World'}
        >
          <ListItem
            subtitle='Do you Know Lorem Ipsum?'
          >
            Basic Item List
          </ListItem>
        </CollapsibleList>
        <ListItem
          subtitle='Do you Know Lorem Ipsum?'
        >
          Basic Item List
        </ListItem>
      </List>
    </div>
  )),
);

stories.add(
  'Collapsible List',
  withInfo()(() => (
    <div
      style={{
        margin: 'auto',
        maxWidth: '400px',
      }}
    >
      <List>
        <ListItem
          avatar={
            <MdAcUnit />
          }
          subtitle='Do you Know Lorem Ipsum?'
        >
          Basic Item List
        </ListItem>
        <ListItem
          avatar={
            <Md3DRotation />
          }
          subtitle='Do you Know Lorem Ipsum?'
        >
          Basic Item List
        </ListItem>
        <ListItem
          avatar={
            <MdAccessAlarm />
          }
          subtitle='Do you Know Lorem Ipsum?'
        >
          Basic Item List
        </ListItem>
        <CollapsibleList
          header={'Hello World'}
        >
          <ListItem
            subtitle='Do you Know Lorem Ipsum?'
          >
            Basic Item List
          </ListItem>
        </CollapsibleList>
        <ListItem
          subtitle='Do you Know Lorem Ipsum?'
        >
          Basic Item List
        </ListItem>
      </List>
    </div>
  )),
);