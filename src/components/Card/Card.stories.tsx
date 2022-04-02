import React from 'react';
import { Story, Meta } from '@storybook/react';

import { Card, CardHeader, CardMedia, Button } from '../..';
import { IoMdOptions } from 'react-icons/io';
import { CardProps } from './Card';

export default {
  title: 'Display/Card',
  component: Card,
  subcomponents: { CardHeader, CardMedia },
  argTypes: {
    // backgroundColor: { control: 'color' },
  },
} as Meta;

const Template: Story<CardProps> = (args) => <Card {...args} style={{ width: '400px' }} />;

export const ElevatedCard = Template.bind({});
ElevatedCard.args = {
  children: (
    <>
      <CardHeader subtitle="Do you Know Lorem Ipsum?">Lorem Ipsum</CardHeader>
      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the standard dummy
      text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen
      book.
    </>
  ),
};

export const CardMediaAndBody = Template.bind({});
CardMediaAndBody.args = {
  children: (
    <>
      <CardMedia height="300px" image="https://placeholder.com/wp-content/uploads/2019/06/lorem-ipsum.png" />
      <CardHeader subtitle="Do you Know Lorem Ipsum?" action={<Button text icon={<IoMdOptions />} />}>
        Lorem Ipsum
      </CardHeader>
      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the standard dummy
      text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen
      book.
    </>
  ),
};

export const FilledCard = Template.bind({});
FilledCard.args = {
  ...ElevatedCard.args,
  filled: 'primary',
};

export const OutlineCard = Template.bind({});
OutlineCard.args = {
  ...ElevatedCard.args,
  border: 1,
  elevation: 0,
};
