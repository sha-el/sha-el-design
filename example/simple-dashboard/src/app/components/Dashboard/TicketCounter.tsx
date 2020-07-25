import React from 'react';
import { Card, CardHeader, Row, Col } from 'sha-el-design';
import { CardDropDown } from '@components/Dashboard/CardDropDown';
import { Pie, Cell, ResponsiveContainer, PieChart, Label } from 'recharts';

const data = [{ name: 'Completed', value: 560 }];

export const TicketCounter = () => {
  return (
    <Card>
      <CardHeader action={<CardDropDown />} subtitle="Ticket Tracker" />
      <Row gutter={[0, '10px']} alignItems="center">
        <Col span={4}>
          <CardHeader subtitle="Total">676</CardHeader>
        </Col>
        <Col span={20}>
          <ResponsiveContainer width="100%" height={100}>
            <PieChart width={800} height={400}>
              <Pie
                data={data}
                dataKey="value"
                innerRadius={40}
                outerRadius={50}
                startAngle={0}
                endAngle={270}
              >
                {data.map((_entry, index) => (
                  <Cell key={`cell-${index}`} fill="#EE266D" stroke="#EE266D" />
                ))}
                <Label
                  position="center"
                  content={({ viewBox: { cx, cy } }) => {
                    // console.log(x, y, z);
                    const RADIAN = Math.PI / 180;
                    const radius = 40 + (50 - 40) * 0.5;
                    const x = cx + radius * Math.cos(-125 * RADIAN);
                    const y = cy + radius * Math.sin(0 * RADIAN);
                    return (
                      <text x={x} y={y} fill="#EE266D">{(56000/676).toFixed(2)}%</text>
                    );
                  }}
                />
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </Col>
      </Row>
      <Row gutter={['0', '0']}>
        <Col style={{ color: '#EE266D' }} span={8}>
          <CardHeader subtitle="Open" />
          140
        </Col>
        <Col style={{ color: '#2196f3' }} span={8}>
          <CardHeader subtitle="Closed" />
          560
        </Col>
        <Col style={{ color: "#ab003c" }} span={8}>
          <CardHeader subtitle="New" />
          49
        </Col>
      </Row>
    </Card>
  );
};
