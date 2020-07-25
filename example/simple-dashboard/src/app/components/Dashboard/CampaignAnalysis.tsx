import React from 'react';
import { Card, CardHeader, CardBody } from 'sha-el-design/lib';
import { CardDropDown } from '@components/Dashboard/CardDropDown';
import { Pie, PieChart, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const COLORS = ['#ffc400', '#81de9b', '#2196f3'];

const data = [
  { name: 'Email', value: 400 },
  { name: 'SMS', value: 300 },
  { name: 'Call', value: 300 },
];

export const CampaignAnalysis = () => {
  return (
    <Card>
      <CardHeader action={<CardDropDown />} subtitle="Campaign Analysis" />
      <CardBody>
        <ResponsiveContainer width="100%" height={220}>
          <PieChart width={800} height={400}>
            <Pie
              data={data}
              // cx={120}
              // cy={200}
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
              label
            >
              {data.map((_entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  stroke={COLORS[index % COLORS.length]}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Legend />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </CardBody>
    </Card>
  );
};
