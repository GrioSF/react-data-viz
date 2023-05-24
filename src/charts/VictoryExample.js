import { VictoryArea, VictoryChart, VictoryStack } from 'victory';

export default function VictoryExample({ data }) {
  return (
    <VictoryChart animate={{ duration: 100 }}>
      <VictoryStack colorScale={"blue"}>
        {data.map((d, i) => {
          return (
            <VictoryArea
              key={i}
              data={d}
              interpolation={"basis"}
            />
          );
        })}
      </VictoryStack>
    </VictoryChart>
  )
}