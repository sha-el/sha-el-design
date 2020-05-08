import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import { Radio, RadioButton, RadioGroup } from '.';

const stories = storiesOf('Radio', module);

stories.add(
  'Basic',
  withInfo({ inline: true })(() => {
    return (
      <Radio label='Radio' />
    );
  }),
);

stories.add(
  'Radio Group',
  withInfo({ inline: true })(() => {
    return (
      <RadioGroup name='sex'>
        <Radio label='Male' />
        <Radio label='Female' />
      </RadioGroup>
    );
  }),
);

stories.add(
  'Radio Button',
  withInfo({ inline: true })(() => {
    const [sex, updateSex] = React.useState('male');
    return (
      <RadioGroup name='sex' value={sex} onChange={(e) => updateSex(e.target.value)}>
        <RadioButton label='Male' value='male' />
        <RadioButton label='Female' value='female' />
        <RadioButton disabled label='Disabled' value='other' />
      </RadioGroup>
    );
  }),
);

stories.add(
  'Error',
  withInfo({ inline: true })(() => {
    return (
      <>
        <Radio label='Radio' error='Error' />
        <RadioButton label='Radio' error='Error' />
      </>
    );
  }),
);