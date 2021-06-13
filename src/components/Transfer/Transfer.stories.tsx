import React from 'react';
import { Story, Meta } from '@storybook/react';

import { Transfer } from '../Transfer';
import { TransferProps } from './Transfer';

export default {
  title: 'Inputs/Transfer',
  component: Transfer,
  argTypes: {
    // backgroundColor: { control: 'color' },
  },
} as Meta;

export const Basic: Story<TransferProps<string>> = (args) => {
  const [values, update] = React.useState(['Banner', 'Stark', 'Steve']);

  return (
    <Transfer
      data={['Bruce', 'Clark', 'Arthur', 'Diana', 'Banner', 'Stark', 'Steve']}
      values={values}
      onChange={update}
      listDisplayProp={(e) => e}
      uniqueIdentifier={(e) => e}
      {...args}
    />
  );
};
