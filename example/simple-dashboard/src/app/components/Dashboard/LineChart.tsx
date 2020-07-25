import React, { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: '2020-01-01',
    email: 4000,
    sms: 2400,
    call: 2400,
  },
  {
    name: '2020-01-02',
    email: 3000,
    sms: 1398,
    call: 2210,
  },
  {
    name: '2020-01-03',
    email: 2000,
    sms: 9800,
    call: 2290,
  },
  {
    name: '2020-01-04',
    email: 2780,
    sms: 3908,
    call: 2000,
  },
  {
    name: '2020-01-05',
    email: 1890,
    sms: 4800,
    call: 2181,
  },
  {
    name: '2020-01-06',
    email: 2390,
    sms: 3800,
    call: 2500,
  },
  {
    name: '2020-01-07',
    email: 3490,
    sms: 4300,
    call: 2100,
  },
];

export class LineChartExample extends PureComponent {
  static jsfiddleUrl = 'https://jsfiddle.net/alidingling/xqjtetw0/';

  render() {
    return (
      <ResponsiveContainer width="100%" height={500}>
        <LineChart
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend verticalAlign="top" />
          <Line type="monotone" dataKey="email" stroke="#ffc400" strokeWidth={3} dot={false} />
          <Line type="monotone" dataKey="sms" stroke="#81de9b" strokeWidth={3} dot={false} />
          <Line type="linear" dataKey="call" stroke="#2196f3" strokeWidth={3} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    );
  }
}
