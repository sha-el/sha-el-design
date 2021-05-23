import React from 'react';
import { Story, Meta } from '@storybook/react';

import { Row, Col } from '.';
import { RowProps } from './Row';
import { ColProps } from './Col';
import { Card } from '../Card';
import { useTheme } from '../Theme/Theme';

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
  style: { textAlign: 'center', color: 'white' },
};

export const Span: Story<ColProps> = (args) => {
  const theme = useTheme();
  return (
    <Row {...RowTemplate.args}>
      <Col span={24} {...args}>
        <Card elevation={0} style={{ borderRadius: '0', background: theme.primary }}>
          Span 24
        </Card>
      </Col>
      <Col span={12}>
        <Card elevation={0} style={{ borderRadius: '0', background: theme.info }}>
          Span 12
        </Card>
      </Col>
      <Col span={12}>
        <Card elevation={0} style={{ borderRadius: '0', background: theme.primary }}>
          Span 12
        </Card>
      </Col>
      <Col span={6}>
        <Card elevation={0} style={{ borderRadius: '0', background: theme.info }}>
          Span 6
        </Card>
      </Col>
      <Col span={6}>
        <Card elevation={0} style={{ borderRadius: '0', background: theme.primary }}>
          Span 6
        </Card>
      </Col>
      <Col span={6}>
        <Card elevation={0} style={{ borderRadius: '0', background: theme.info }}>
          Span 6
        </Card>
      </Col>
      <Col span={6}>
        <Card elevation={0} style={{ borderRadius: '0', background: theme.primary }}>
          Span 6
        </Card>
      </Col>
    </Row>
  );
};

export const FlexBox: Story<ColProps> = (args) => {
  const theme = useTheme();
  return (
    <Row {...RowTemplate.args}>
      <Col flex="1 0 100px" {...args}>
        <Card elevation={0} style={{ borderRadius: '0', background: theme.primary }}>
          flex=1 0 100px
        </Card>
      </Col>
      <Col flex="0 1 150px">
        <Card elevation={0} style={{ borderRadius: '0', background: theme.info }}>
          flex=0 1 150px
        </Card>
      </Col>
    </Row>
  );
};

export const JustifyContent: Story<ColProps> = (args) => {
  const theme = useTheme();
  return (
    <Row {...RowTemplate.args} justifyContent="flex-end">
      <Col flex="0 1 200px" {...args}>
        <Card elevation={0} style={{ borderRadius: '0', background: theme.primary }}>
          flex=0 1 200px
        </Card>
      </Col>
      <Col flex="0 1 400px">
        <Card elevation={0} style={{ borderRadius: '0', background: theme.info }}>
          flex=0 1 400px
        </Card>
      </Col>
    </Row>
  );
};

export const Responsive: Story<ColProps> = () => {
  const theme = useTheme();
  return (
    <Row {...RowTemplate.args}>
      <Col spanXs={24} spanSm={20} spanMd={16} spanLg={12} spanXl={8}>
        <Card elevation={0} style={{ borderRadius: '0', background: theme.primary }}>
          1
        </Card>
      </Col>
      <Col spanXs={24} spanSm={20} spanMd={16} spanLg={12} spanXl={8}>
        <Card elevation={0} style={{ borderRadius: '0', background: theme.info }}>
          2
        </Card>
      </Col>
      <Col spanXs={24} spanSm={20} spanMd={16} spanLg={12} spanXl={8}>
        <Card elevation={0} style={{ borderRadius: '0', background: theme.primary }}>
          3
        </Card>
      </Col>
      <Col spanXs={24} spanSm={20} spanMd={16} spanLg={12} spanXl={8}>
        <Card elevation={0} style={{ borderRadius: '0', background: theme.info }}>
          4
        </Card>
      </Col>
      <Col spanXs={24} spanSm={20} spanMd={16} spanLg={12} spanXl={8}>
        <Card elevation={0} style={{ borderRadius: '0', background: theme.primary }}>
          5
        </Card>
      </Col>
      <Col spanXs={24} spanSm={20} spanMd={16} spanLg={12} spanXl={8}>
        <Card elevation={0} style={{ borderRadius: '0', background: theme.info }}>
          6
        </Card>
      </Col>
      <Col spanXs={24} spanSm={20} spanMd={16} spanLg={12} spanXl={8}>
        <Card elevation={0} style={{ borderRadius: '0', background: theme.primary }}>
          7
        </Card>
      </Col>
    </Row>
  );
};

export const Gutter: Story<ColProps> = (args) => {
  const theme = useTheme();
  return (
    <Row {...RowTemplate.args} gutter={[{ xs: 10, sm: 20, md: 35, xl: 70 }, 40]}>
      <Col span={24} {...args}>
        <Card elevation={0} style={{ borderRadius: '0', background: theme.primary }}>
          Span 24
        </Card>
      </Col>
      <Col span={12}>
        <Card elevation={0} style={{ borderRadius: '0', background: theme.info }}>
          Span 12
        </Card>
      </Col>
      <Col span={12}>
        <Card elevation={0} style={{ borderRadius: '0', background: theme.primary }}>
          Span 12
        </Card>
      </Col>
      <Col span={6}>
        <Card elevation={0} style={{ borderRadius: '0', background: theme.info }}>
          Span 6
        </Card>
      </Col>
      <Col span={6}>
        <Card elevation={0} style={{ borderRadius: '0', background: theme.primary }}>
          Span 6
        </Card>
      </Col>
      <Col span={6}>
        <Card elevation={0} style={{ borderRadius: '0', background: theme.info }}>
          Span 6
        </Card>
      </Col>
      <Col span={6}>
        <Card elevation={0} style={{ borderRadius: '0', background: theme.primary }}>
          Span 6
        </Card>
      </Col>
    </Row>
  );
};

export const Nested: Story<ColProps> = (args) => {
  const theme = useTheme();
  return (
    <Row {...RowTemplate.args}>
      <Col flex="1 0 200px" {...args}>
        <Card elevation={0} style={{ borderRadius: '0', background: theme.primary }}>
          <Row>
            <Col span={12}>
              <Card elevation={0} style={{ borderRadius: '0', background: '#57A0D3' }}>
                a
              </Card>
            </Col>
            <Col span={12}>
              <Card elevation={0} style={{ borderRadius: '0', background: '#89CFF0' }}>
                b
              </Card>
            </Col>
          </Row>
        </Card>
      </Col>
      <Col flex="0 1 400px">
        <Card elevation={0} style={{ borderRadius: '0', background: theme.info }}>
          flex=0 1 400px
        </Card>
      </Col>
    </Row>
  );
};
