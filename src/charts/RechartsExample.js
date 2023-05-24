import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function RechartsExample ({ data }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        width={500}
        height={400}
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Area type="monotone" dataKey="g1" stackId="1" stroke="#8884d8" fill="#8884d8" />
        <Area type="monotone" dataKey="g2" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
        <Area type="monotone" dataKey="g3" stackId="1" stroke="#ffc658" fill="#ffc658" />
        <Area type="monotone" dataKey="g4" stackId="1" stroke="red" fill="red" />
        <Area type="monotone" dataKey="g5" stackId="1" stroke="blue" fill="blue" />
        <Area type="monotone" dataKey="g6" stackId="1" stroke="green" fill="green" />
        <Area type="monotone" dataKey="g7" stackId="1" stroke="black" fill="black" />
      </AreaChart>
    </ResponsiveContainer>
  )
}