import { useEffect, useState } from 'react'
import DataManager from './data-manager'
import NivoRealtimeLineExample from './charts/NivoRealtimeLineExample'
import RechartsExample from './charts/RechartsExample'
import VictoryExample from './charts/VictoryExample'
import './App.css'

const dataManager = new DataManager()
let timeout
function App () {
  const [data, setData] = useState(dataManager.dataset)

  const updateData = () => {
    dataManager.add()

    timeout = null
    setData(dataManager.getLatest())
  }

  useEffect(() => {
    if (timeout) return
    timeout = setTimeout(() => updateData(), 1000)
  }, [data])

  return (
    <div className='App'>
      <div className='charts'>
        <div className='chart'>
          <VictoryExample data={data} />
        </div>
        <div className='chart'>
          <RechartsExample data={data} />
        </div>
        <div className='chart'>
          <NivoRealtimeLineExample data={data} />
        </div>
      </div>
    </div>
  )
}

export default App
