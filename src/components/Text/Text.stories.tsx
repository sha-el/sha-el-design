import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Text } from './Text';

const stories = storiesOf('Text', module);

stories.add(
  'Variants',
  withInfo({ inline: true })(() => {
    return (
      <>
        <Text variant='h1'>This is a h1 Heading.</Text>
        <Text variant='h2'>This is a h2 Heading.</Text>
        <Text variant='h3'>This is a h3 Heading.</Text>
        <Text variant='h4'>This is a h4 Heading.</Text>
        <Text variant='h5'>This is a h5 Heading.</Text>
        <Text variant='h6'>This is a h6 Heading.</Text>
        <Text variant='p'>This is a paragraph.</Text>
      </>
    );
  }),
);

stories.add(
  'Custom Styling',
  withInfo({ inline: true })(() => {
    return (
      <>
        <Text underline bold padding='5px' variant='p'>
          The quick brown fox jumps over the lazy dog
        </Text>
        <Text strikeThrough italicize padding='5px' variant='p'>
          The quick brown fox jumps over the lazy dog
        </Text>
        <Text underline strikeThrough fontSize={20} padding='5px' variant='p'>
          The quick brown fox jumps over the lazy dog
        </Text>
        <Text color='green' padding='5px' variant='p'>The quick brown fox jumps over the lazy dog</Text>
        <Text fontFamily='cursive' padding='5px' variant='p'>
          The quick brown fox jumps over the lazy dog
        </Text>
        <Text padding='5px' variant='p'>
          The quick brown fox jumps over the lazy dog
        </Text>
        <Text padding='5px' variant='p'>The quick brown fox jumps over the lazy dog</Text>
      </>
    );
  }),
);

stories.add(
  'Headings and Paragraph',
  withInfo({ inline: true })(() => {
    return (
      <>
        <Text variant='h3' bold padding='5px'>
          What is Lorem Ipsum?
        </Text>
        <Text variant='p' padding='5px' style={{marginTop: -15}}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </Text>
      </>
    );
  }),
);
