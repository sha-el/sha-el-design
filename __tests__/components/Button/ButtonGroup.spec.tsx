import { render } from '@testing-library/react';
import React from 'react';
import { Button, ButtonGroup } from '../../../src';

describe('Button Group', () => {
  it('should render button group', () => {
    render(
      <ButtonGroup>
        <Button>Default</Button>
        <Button primary>Primary</Button>
        <Button secondary>Secondary</Button>
        <Button danger>Danger</Button>
      </ButtonGroup>,
    );

    const buttonGroup = document.querySelectorAll('button');

    expect(buttonGroup.length).toBe(4);
  });
});
