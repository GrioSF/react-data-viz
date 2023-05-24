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
        {
          _.first(data).map((g, i) => {
            return (
              <Area key={`g${i + 1}`} type='monotone' dataKey={`g${i + 1}`} stackId='1' />
            )
          })
        }
      </AreaChart>
    </ResponsiveContainer>
  )
}
