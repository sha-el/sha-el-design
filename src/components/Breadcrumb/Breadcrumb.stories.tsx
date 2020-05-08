import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import { MdHome, MdMenu, MdNavigateNext } from 'react-icons/md';
import { Breadcrumb } from './Breadcrumb';
import { MenuItemGroup, MenuItem } from '../Menu';

const stories = storiesOf('Breadcrumb', module);

stories.add(
  'Basic',
  withInfo({ inline: true })(() => (
    <Breadcrumb
      seperator='>'
      paths={[
        () => <a href='#'>Home</a>,
        () => <a href='#'>Breadcrumb</a>,
      ]}
    />
  )),
);

stories.add(
  'With icons',
  withInfo({ inline: true })(() => (
    <Breadcrumb
      seperator={<MdNavigateNext />}
      paths={[
        () => <a href='#'><MdHome /></a>,
        () => <a href='#'><MdMenu /> Breadcrumb</a>,
      ]}
    />
  )),
);

stories.add(
  'With menu',
  withInfo({ inline: true })(() => (
    <Breadcrumb
      seperator='/'
      paths={[
        () => <a href='#'><MdHome /></a>,
        () => (
          <MenuItemGroup title='hello' inline={false}>
            <MenuItem name='1'>Option 1</MenuItem>
          </MenuItemGroup>
        ),
      ]}
    />
  )),
);
