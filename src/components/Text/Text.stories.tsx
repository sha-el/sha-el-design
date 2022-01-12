import React from 'react';
import { Story, Meta } from '@storybook/react';

import { Text, TextProps } from './Text';

export default {
  title: 'Display/Text',
  component: Text,
  argTypes: {
    // backgroundColor: { control: 'color' },
  },
} as Meta;

export const Basic: Story<TextProps> = (args) => <Text {...args} />;
Basic.args = {
  variant: 'h1',
  children: 'Content',
};

export const Variants = () => (
  <>
    <Text margin="12px 0" variant="h1">
      This is a h1 Heading.
    </Text>
    <Text margin="12px 0" variant="h2">
      This is a h2 Heading.
    </Text>
    <Text margin="12px 0" variant="h3">
      This is a h3 Heading.
    </Text>
    <Text margin="12px 0" variant="h4">
      This is a h4 Heading.
    </Text>
    <Text margin="12px 0" variant="h5">
      This is a h5 Heading.
    </Text>
    <Text margin="12px 0" variant="h6">
      This is a h6 Heading.
    </Text>
    <Text margin="12px 0" variant="p">
      This is a paragraph.
    </Text>
  </>
);

export const Styling = () => (
  <>
    <Text underline fontWeight="bold" padding="5px" variant="p" textAlign="center">
      The quick brown fox jumps over the lazy dog
    </Text>
    <Text strikeThrough italicize padding="5px" variant="p">
      The quick brown fox jumps over the lazy dog
    </Text>
    <Text underline strikeThrough fontSize="20px" padding="5px" variant="p">
      The quick brown fox jumps over the lazy dog
    </Text>
    <Text color="green" padding="5px" variant="p">
      The quick brown fox jumps over the lazy dog
    </Text>
    <Text fontFamily="cursive" padding="5px" variant="p">
      The quick brown fox jumps over the lazy dog
    </Text>
    <Text padding="5px" variant="p">
      The quick brown fox jumps over the lazy dog
    </Text>
    <Text padding="5px" variant="p" monoFont>
      The quick brown fox jumps over the lazy dog
    </Text>
  </>
);

export const HeadingAndParagraph = () => (
  <>
    <Text variant="h3" padding="5px">
      What is Lorem Ipsum?
    </Text>
    <Text variant="p" padding="5px">
      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys
      standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a
      type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting,
      remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing
      Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions
      of Lorem Ipsum.
    </Text>
  </>
);
