import React from 'react';
import { Story, Meta } from '@storybook/react';

import { Row, Col } from '.';
import { RowProps } from './Row';
import { ColProps } from './Col';
import { Card } from '../Card';

export default {
  title: 'Layout/Grid',
  component: Col,
  subcomponents: { Row },
  argTypes: {
    // backgroundColor: { control: 'color' },
  },
} as Meta;

const RowTemplate: Story<RowProps> = (args) => <Row {...args} />;

RowTemplate.args = {
  style: { textAlign: 'center', background: 'darkgray' },
};

export const Span: Story<ColProps> = (args) => (
  <Row {...RowTemplate.args}>
    <Col span={24} {...args}>
      <Card>Span 24</Card>
    </Col>
    <Col span={12}>
      <Card>Span 12</Card>
    </Col>
    <Col span={12}>
      <Card>Span 12</Card>
    </Col>
    <Col span={6}>
      <Card>Span 6</Card>
    </Col>
    <Col span={6}>
      <Card>Span 6</Card>
    </Col>
    <Col span={6}>
      <Card>Span 6</Card>
    </Col>
    <Col span={6}>
      <Card>Span 6</Card>
    </Col>
  </Row>
);

export const FlexBox: Story<ColProps> = (args) => (
  <Row {...RowTemplate.args}>
    <Col flex="1 0 200px" {...args}>
      <Card>flex=1 0 200px</Card>
    </Col>
    <Col flex="0 1 400px">
      <Card>flex=0 1 400px</Card>
    </Col>
  </Row>
);

export const JustifyContent: Story<ColProps> = (args) => (
  <Row {...RowTemplate.args} justifyContent="flex-end">
    <Col flex="0 1 200px" {...args}>
      <Card>flex=0 1 200px</Card>
    </Col>
    <Col flex="0 1 400px">
      <Card>flex=0 1 400px</Card>
    </Col>
  </Row>
);

export const Responsive: Story<ColProps> = () => (
  <Row {...RowTemplate.args}>
    <Col spanXs={24} spanSm={20} spanMd={16} spanLg={12} spanXl={8}>
      <Card>1</Card>
    </Col>
    <Col spanXs={24} spanSm={20} spanMd={16} spanLg={12} spanXl={8}>
      <Card>2</Card>
    </Col>
    <Col spanXs={24} spanSm={20} spanMd={16} spanLg={12} spanXl={8}>
      <Card>3</Card>
    </Col>
    <Col spanXs={24} spanSm={20} spanMd={16} spanLg={12} spanXl={8}>
      <Card>4</Card>
    </Col>
    <Col spanXs={24} spanSm={20} spanMd={16} spanLg={12} spanXl={8}>
      <Card>5</Card>
    </Col>
    <Col spanXs={24} spanSm={20} spanMd={16} spanLg={12} spanXl={8}>
      <Card>6</Card>
    </Col>
    <Col spanXs={24} spanSm={20} spanMd={16} spanLg={12} spanXl={8}>
      <Card>7</Card>
    </Col>
  </Row>
);

export const Gutter: Story<ColProps> = (args) => {
  return (
    <Row {...RowTemplate.args} gutter={['10px', '20px']}>
      <Col span={24} {...args}>
        <Card>Span 24</Card>
      </Col>
      <Col span={12}>
        <Card>Span 12</Card>
      </Col>
      <Col span={12}>
        <Card>Span 12</Card>
      </Col>
      <Col span={6}>
        <Card>Span 6</Card>
      </Col>
      <Col span={6}>
        <Card>Span 6</Card>
      </Col>
      <Col span={6}>
        <Card>Span 6</Card>
      </Col>
      <Col span={6}>
        <Card>Span 6</Card>
      </Col>
    </Row>
  );
};

export const Nested: Story<ColProps> = (args) => {
  return (
    <Row {...RowTemplate.args}>
      <Col flex="1 0 200px" {...args}>
        <Card>
          <Row gutter={[0, 0]}>
            <Col span={10}>a</Col>
            <Col span={10}>b</Col>
          </Row>
        </Card>
      </Col>
      <Col flex="0 1 400px">
        <Card>flex=0 1 400px</Card>
      </Col>
    </Row>
  );
};
