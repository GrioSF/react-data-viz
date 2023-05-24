import { useEffect, useState } from 'react'
import { Line } from '@nivo/line'
import * as time from 'd3-time'
import { timeFormat } from 'd3-time-format'
import _ from 'lodash'

const date = new Date()
date.setMinutes(0)
date.setSeconds(0)
date.setMilliseconds(0)

let timeout
const formatTime = timeFormat('%Y %b %d')
export default function NivoRealtimeLineExample ({ data }) {
  const commonProperties = {
    width: 900,
    height: 400,
    margin: { top: 20, right: 20, bottom: 60, left: 80 },
    data,
    animate: true,
    enableSlices: 'x'
  }

  const [dataA, setDataA] = useState(_.range(100).map(i => ({
    x: time.timeMinute.offset(date, i * 30),
    y: 10 + Math.round(Math.random() * 20)
  })))

  const [dataB, setDataB] = useState(_.range(100).map(i => ({
    x: time.timeMinute.offset(date, i * 30),
    y: 30 + Math.round(Math.random() * 20)
  })))

  const [dataC, setDataC] = useState(_.range(100).map(i => ({
    x: time.timeMinute.offset(date, i * 30),
    y: 60 + Math.round(Math.random() * 20)
  })))

  const updateData = (dA, dB, dC) => {
    timeout = null

    const dataA = dA.slice(1)
    dataA.push({
      x: time.timeMinute.offset(_.last(dataA).x, 30),
      y: 10 + Math.round(Math.random() * 20)
    })

    const dataB = dB.slice(1)
    dataB.push({
      x: time.timeMinute.offset(_.last(dataB).x, 30),
      y: 30 + Math.round(Math.random() * 20)
    })
    const dataC = dC.slice(1)
    dataC.push({
      x: time.timeMinute.offset(_.last(dataC).x, 30),
      y: 60 + Math.round(Math.random() * 20)
    })

    setDataA(dataA)
    setDataB(dataB)
    setDataC(dataC)
  }

  useEffect(() => {
    if (timeout) return
    timeout = setTimeout(() => updateData(dataA, dataB, dataC), 1000)
  }, [dataA, dataB, dataC])

  return (
    <Line
      {...commonProperties}
      margin={{ top: 30, right: 50, bottom: 60, left: 50 }}
      data={[
        { id: 'A', data: dataA },
        { id: 'B', data: dataB },
        { id: 'C', data: dataC }
      ]}
      xScale={{ type: 'time', format: 'native' }}
      yScale={{ type: 'linear', max: 100 }}
      axisTop={{
        format: '%H:%M',
        tickValues: 'every 4 hours'
      }}
      axisBottom={{
        format: '%H:%M',
        tickValues: 'every 4 hours',
        legend: `${formatTime(dataA[0].x)} ——— ${formatTime(_.last(dataA).x)}`,
        legendPosition: 'middle',
        legendOffset: 46
      }}
      axisRight={{}}
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
