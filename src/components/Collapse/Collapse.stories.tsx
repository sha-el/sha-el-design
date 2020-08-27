import React from 'react';
import { Story, Meta } from '@storybook/react';

import { Collapse } from './Collapse';
import { CollapseProps } from '../List/CollapsibleList';

export default {
  title: 'Display/Collapse',
  component: Collapse,
  argTypes: {
    // backgroundColor: { control: 'color' },
  },
} as Meta;

export const Basic: Story<CollapseProps> = () => {
  const [open, updateOpen] = React.useState(false);

  return (
    <Collapse header="Hello" isOpen={open} onChange={updateOpen}>
      Hello world!!
    </Collapse>
  );
};

export const Acordian: Story<CollapseProps> = () => {
  const [open, updateOpen] = React.useState([]);

  const onUpdate = (val: boolean, index: number) => {
    const values = [];
    values[index] = val;
    updateOpen(values);
  };

  return (
    <>
      <Collapse header="First" isOpen={open[0]} onChange={(v) => onUpdate(v, 0)}>
        First Panel
      </Collapse>
      <Collapse header="Second" isOpen={open[1]} onChange={(v) => onUpdate(v, 1)}>
        Second Panel
      </Collapse>
      <Collapse header="Third" isOpen={open[2]} onChange={(v) => onUpdate(v, 2)}>
        Third Panel
      </Collapse>
    </>
  );
};
