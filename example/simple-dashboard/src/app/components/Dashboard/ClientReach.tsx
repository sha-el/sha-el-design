import React from 'react';
import { Card, CardHeader } from 'sha-el-design/lib';
import { CardDropDown } from '@components/Dashboard/CardDropDown';
import { ResponsiveContainer, BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const data = [
  {
    name: 'Integration',
    android: 4000,
    iphone: 2400,
  },
  {
    name: 'Abacus',
    android: 3000,
    iphone: 1398,
  },
  {
    name: 'Pioneer',
    android: 2000,
    iphone: 9800,
  },
];

export const ClientReach = () => {
  return (
    <Card>
      <CardHeader action={<CardDropDown />} subtitle="Client Reach" />
      <ResponsiveContainer width="100%" height={220}>
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <XAxis dataKey="name" />
          <Tooltip />
          <Legend />
          <Bar dataKey="iphone" stackId="a" fill="#ef6c00" />
          <Bar dataKey="android" stackId="a" fill="#5e35b1" />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};
