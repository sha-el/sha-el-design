import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Card, CardHeader, CardMedia } from '../../../src';
import { MdImage } from 'react-icons/md';

const CreateCard = () => {
  return (
    <Card>
      <CardMedia height="100px" image="https://miro.medium.com/max/1200/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg" />
      <CardHeader subtitle="Header Subtitle" action={<MdImage id="action" />}>
        Header
      </CardHeader>
    </Card>
  );
};

describe('Card', () => {
  it('should render a simple card with image and header', () => {
    render(CreateCard());

    const cardEl = document.querySelector('.sha-el-card');
    expect(cardEl).not.toBeNull();
    expect(cardEl.querySelector('#action')).not.toBeNull();
    expect(cardEl.querySelector('.sha-el-card-media')).toHaveStyle(`
      height: 100px;
    `);
  });
});
