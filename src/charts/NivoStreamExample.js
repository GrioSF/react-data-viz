import { ResponsiveStream } from '@nivo/stream';

export default function NivoStreamExample ({ data }) {
  return (
    <ResponsiveStream
      data={data}
      keys={[
          'g1',
          'g2',
          'g3',
          'g4',
          'g5',
          'g6',
          'g7'
      ]}
      margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
          orient: 'bottom',
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
      }}
      axisLeft={{
          orient: 'left',
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
      }}
      enableGridX={true}
      enableGridY={false}
      offsetType="silhouette"
      colors={{ scheme: 'nivo' }}
      fillOpacity={0.85}
      borderColor={{ theme: 'background' }}
      dotSize={8}
      dotColor={{ from: 'color' }}
      dotBorderWidth={2}
      dotBorderColor={{
          from: 'color',
          modifiers: [
              [
                  'darker',
                  0.7
              ]
          ]
      }}
    />

  )
}