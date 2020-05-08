import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import { MenuItemGroup, MenuItem } from '.';
import { Button } from '../Button';
import { IoMdOptions } from 'react-icons/io';

const stories = storiesOf('Menu', module);

stories.add(
  'Collapsible Menu',
  withInfo({ inline: true })(() => (
    <MenuItemGroup title='Options'>
      <MenuItem name='1'>Option 1</MenuItem>
      <MenuItem name='2'>Option 2</MenuItem>
      <MenuItem name='2'>Option 3</MenuItem>
    </MenuItemGroup>
  )),
);

stories.add(
  'Popup Menu',
  withInfo({ inline: true })(() => (
    <MenuItemGroup title='Options' inline={false}>
      <MenuItem name='1'>Option 1</MenuItem>
      <MenuItem name='2'>Option 2</MenuItem>
      <MenuItem name='2'>Option 3</MenuItem>
    </MenuItemGroup>
  )),
);

stories.add(
  'With Custom Anchor and offset',
  withInfo({ inline: true })(() => (
    <MenuItemGroup
      title='Options'
      inline={false}
      position='bottom'
      anchor={<span><Button icon={<IoMdOptions />} /></span>}
      offset={[0, -40]}
    >
      <MenuItem name='1'>Option 1</MenuItem>
      <MenuItem name='2'>Option 2</MenuItem>
      <MenuItem name='2'>Option 3</MenuItem>
    </MenuItemGroup>
  )),
);