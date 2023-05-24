import { Line } from '@nivo/line'

const date = new Date()
date.setMinutes(0)
date.setSeconds(0)
date.setMilliseconds(0)

function convertData (data) {
  return data.map((dataGroup, i) => {
    return {
      id: `g${i + 1}`,
      data: dataGroup
    }
  })
}

const NivoRealtimeLineExample = ({ data }) => {
  const convertedData = convertData(data)

  const commonProperties = {
    width: 800,
    height: 450,
    data: convertedData,
    animate: true,
    enableSlices: 'x',
    enableArea: true,
    colors: { scheme: 'nivo' },
    areaOpacity: 1
  }

  return (
    <Line
      {...commonProperties}
      margin={{ top: 30, right: 50, bottom: 60, left: 50 }}
      data={convertedData}
      yScale={{ type: 'linear', stacked: true, min: 'auto', max: 'auto' }}
      enablePoints={false}
      enableGridX
      curve='monotoneX'
      animate={false}
      isInteractive={false}
      enableSlices={false}
      useMesh
      theme={{
        axis: { ticks: { text: { fontSize: 14 } } },
        grid: { line: { stroke: '#ddd', strokeDasharray: '1 2' } }
      }}
    />
  )
}

export default NivoRealtimeLineExample
