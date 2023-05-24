import { useEffect, useState } from 'react'
import _ from 'lodash'
import NivoStreamExample from './charts/NivoStreamExample'
import NivoRealtimeLineExample from './charts/NivoRealtimeLineExample'
import RechartsExample from './charts/RechartsExample'
import VictoryExample from './charts/VictoryExample'
import './App.css'

function createDataPoint (x) {
  return { x, y: _.random(1, 15) }
}

const initialDataGroup = _.range(7).map(() => _.range(0, 10).map(x => ({ x, y: _.random(1, 15) })))
let timeout
function App () {
  const [data, setData] = useState(initialDataGroup)

  const updateData = (d) => {
    const lastPoint = _.last(_.first(d)).x
    const updatedData = d.map((group) => {
      return [...group.slice(1), createDataPoint(lastPoint + 1)]
    })

    timeout = null
    setData(updatedData)
  }

  useEffect(() => {
    if (timeout) return
    timeout = setTimeout(() => updateData(data), 1000)
  }, [data])

  const convertToRechartPoints = (d) => {
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

  const convertToNivoStreamChartPoints = (dp) => {
    return convertToRechartPoints(dp)
  }

  return (
    <div className='App'>
      <div className='charts'>
        <div className='chart'>
          <VictoryExample data={data} />
        </div>
        <div className='chart'>
          <RechartsExample data={convertToRechartPoints(data)} />
        </div>
        <div className='chart'>
          <NivoRealtimeLineExample />
        </div>
      </div>
    </div>
  )
}

export default App
