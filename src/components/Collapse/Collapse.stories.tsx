import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import { Collapse } from './Collapse';

const stories = storiesOf('Collapse', module);

stories.add(
  'Basic',
  withInfo({ inline: true })(() => {
    const [open, updateOpen] = React.useState(false);

    return (
      <Collapse
        header='Hello'
        isOpen={open}
        onChange={updateOpen}
      >
        Hello world!!
      </Collapse>
    );
  }),
);

stories.add(
  'As an Accorian',
  withInfo({ inline: true })(() => {
    const [open, updateOpen] = React.useState([]);

    const onUpdate = (val: boolean, index: number) => {
      const values = [];
      values[index] = val;
      updateOpen(values);
    };

    return (
      <>
        <Collapse
          header='First'
          isOpen={open[0]}
          onChange={(v) => onUpdate(v, 0)}
        >
          First Panel
        </Collapse>
        <Collapse
          header='Second'
          isOpen={open[1]}
          onChange={(v) => onUpdate(v, 1)}
        >
          Second Panel
        </Collapse>
        <Collapse
          header='Third'
          isOpen={open[2]}
          onChange={(v) => onUpdate(v, 2)}
        >
          Third Panel
        </Collapse>
      </>
    );
  }),
);