import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import { Button, ButtonGroup } from './';
import { MdEmail, MdFilter } from 'react-icons/md';

const stories = storiesOf('Button', module);

stories.add(
  'Button Type',
  withInfo({ inline: true })(() => (
    <>
      <Button>Default</Button>
      <Button type='primary'>Primary</Button>
      <Button type='secondary'>Secondary</Button>
      <Button type='danger'>Danger</Button>
      <Button type='link'>Link</Button>
    </>
  )),
);

stories.add(
  'Flat Buttons',
  withInfo({ inline: true })(() => (
    <>
      <Button flat>Button</Button>
      <Button flat type='primary'>Primary</Button>
      <Button flat type='secondary'>Secondary</Button>
      <Button flat type='danger'>Danger</Button>
    </>
  )),
);

stories.add(
  'With Icons',
  withInfo({ inline: true })(() => (
    <>
      <Button type='primary' size='big' icon={<MdEmail />}>Button</Button>
      <Button type='primary' icon={<MdEmail />}>Button</Button>
      <Button type='primary' icon={<MdFilter />} />
      <Button type='primary' shape='circle' icon={<MdFilter />} />
    </>
  )),
);

stories.add(
  'Disabled Button',
  withInfo({ inline: true })(() => (
    <>
      <div>
        <Button disabled>Button Disabled</Button>
      </div>
      <div>
        <Button flat disabled>Flat Button Disabled</Button>
      </div>
      <div>
        <Button type='link' disabled>Link Disabled</Button>
      </div>
    </>
  )),
);

stories.add(
  'Block Button',
  withInfo({ inline: true })(() => (
    <>
      <div>
        <Button displayBlock>Button</Button>
      </div>
      <div>
        <Button flat displayBlock>Flat Button</Button>
      </div>
      <div>
        <Button type='link' displayBlock>Link</Button>
      </div>
    </>
  )),
);