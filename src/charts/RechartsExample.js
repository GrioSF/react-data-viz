import _ from 'lodash'
import { AreaChart, Area, YAxis, ResponsiveContainer } from 'recharts'

const width = 450
const height = 300

const convertData = (d) => {
  const convertedData = _.first(d).map(group => ({
    name: `${group.x}`
  }))

  d.forEach((group, i) => {
    group.forEach(({ x, y }) => {
      const name = `g${i + 1}`
      const convertedGroup = convertedData.find(d => d.name === `${x}`)
      convertedGroup[name] = y
    })
  })

  console.log(convertedData)

  return convertedData
}

export default function RechartsExample ({ data }) {
  return (
    <ResponsiveContainer width='100%' height='100%'>
      <AreaChart
        width={width}
        height={height}
        data={convertData(data)}
      >
        <YAxis />
        <Area type='monotone' dataKey='g1' stackId='1' stroke='#8884d8' fill='#8884d8' />
        <Area type='monotone' dataKey='g2' stackId='1' stroke='#82ca9d' fill='#82ca9d' />
        <Area type='monotone' dataKey='g3' stackId='1' stroke='#ffc658' fill='#ffc658' />
        <Area type='monotone' dataKey='g4' stackId='1' stroke='red' fill='red' />
        <Area type='monotone' dataKey='g5' stackId='1' stroke='blue' fill='blue' />
        <Area type='monotone' dataKey='g6' stackId='1' stroke='green' fill='green' />
        <Area type='monotone' dataKey='g7' stackId='1' stroke='tomato' fill='tomato' />
      </AreaChart>
    </ResponsiveContainer>
  )
}
