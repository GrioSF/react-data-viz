import { VictoryArea, VictoryChart, VictoryStack } from 'victory'

export default function VictoryExample ({ data }) {
  return (
    <VictoryChart animate={{ duration: 100 }}>
      <VictoryStack colorScale={['#8884d8', '#82ca9d', '#ffc658', 'red', 'blue', 'green', 'tomato']}>
        {data.map((d, i) => {
          return (
            <VictoryArea
              key={i}
              data={d}
              interpolation='basis'
            />
          )
        })}
      </VictoryStack>
    </VictoryChart>
  )
}
