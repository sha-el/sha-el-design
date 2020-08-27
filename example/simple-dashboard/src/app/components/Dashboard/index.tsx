import React from 'react';
import { Page, Row, Col, Card, CardHeader, Table, Tag, CardBody } from 'sha-el-design';
import { Colums } from 'sha-el-design/lib/components/Table/Table';
import { FcCalendar } from 'react-icons/fc';
import { CardDropDown } from '@components/Dashboard/CardDropDown';
import campaignData from '@/assets/campaignData.json';
import { LineChartExample } from '@components/Dashboard/LineChart';
import { TicketCounter } from './TicketCounter';
import { CampaignAnalysis } from './CampaignAnalysis';
import { ClientReach } from './ClientReach';

const tableColumns: Colums<unknown>[] = [
  {
    header: 'Name',
    key: 'name',
    dataIndex: 'name',
  },
  {
    header: 'Mode',
    key: 'mode',
    dataIndex: 'campaignMode',
    render: (value) => {
      switch (value) {
        case 'call':
          return <Tag color="#2196f3">{value}</Tag>;
        case 'sms':
          return <Tag color="#1de9b6">{value}</Tag>;
        case 'email':
          return <Tag color="#ffc400">{value}</Tag>;
        default:
          return value;
      }
    },
  },
  {
    header: <div>Sent</div>,
    key: 'sent',
    render: (_v, obj) => (
      <>
        <div style={{ color: '#00e676' }}>{obj.sent}</div>
        <div style={{ color: 'rgba(0, 0, 0, 0.54)' }}>{((obj.sent * 100) / (obj.sent + obj.pending)).toFixed(2)}%</div>
      </>
    ),
  },
  {
    header: <div>Pending</div>,
    key: 'pending',
    render: (_v, obj) => (
      <>
        <div style={{ color: '#ff9100' }}>{obj.pending}</div>
        <div style={{ color: 'rgba(0, 0, 0, 0.54)' }}>
          {((obj.pending * 100) / (obj.sent + obj.pending)).toFixed(2)}%
        </div>
      </>
    ),
  },
  {
    header: 'Status',
    key: 'status',
    dataIndex: 'status',
    render: (value) => {
      switch (value) {
        case 'sent':
          return <Tag color="#76ff03">{value}</Tag>;
        case 'active':
          return <Tag color="#ff9100">{value}</Tag>;
        default:
          return value;
      }
    },
  },
];

export const Dashboard: React.FC<null> = () => {
  return (
    <Page
      title="Dashboard"
      extra={
        <Row>
          <Col span={2}>
            <FcCalendar />
          </Col>
          <Col offset={1} span={21}>
            21st Jul 2020, Tuesday
          </Col>
        </Row>
      }
      bottom={
        <Row>
          <Col></Col>
        </Row>
      }
    >
      <Row>
        <Col style={{ paddingLeft: '0' }} span={8}>
          <TicketCounter />
        </Col>
        <Col span={8}>
          <CampaignAnalysis />
        </Col>
        <Col style={{ paddingRight: '0' }} span={8}>
          <ClientReach />
        </Col>
      </Row>
      <Card>
        <CardHeader action={<CardDropDown />} subtitle="Daily Communication" />
        <CardBody>
          <LineChartExample />
        </CardBody>
      </Card>
      <Row gutter={['10px 0', '0']}>
        <Col>
          <Table header="Campaign List" data={campaignData} columns={tableColumns} />
        </Col>
      </Row>
    </Page>
  );
};
