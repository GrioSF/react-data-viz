import { useEffect, useState } from 'react';
import _ from 'lodash';
import NivoStreamExample from './charts/NivoStreamExample';
import RechartsExample from './charts/RechartsExample';
import VictoryExample from './charts/VictoryExample';
import './App.css';

function createDataPoint (x) {
  return { x, y: _.random(1, 15) }
}

let timeout;
function App() {
  const initialDatapoints = _.range(7).map(() => _.range(0, 10).map(x => ({ x, y: _.random(1, 15) })))
  const [dataPoints, setDataPoints] = useState(initialDatapoints);

  const updateDataPoints = (dp) => {
    const lastPoint = _.last(_.first(dp)).x
    const updatedDataPoints = dp.map((g) => {
      return [...g.slice(1), createDataPoint(lastPoint + 1)];
    })

    timeout = null;
    setDataPoints(updatedDataPoints);
  }

  useEffect(() => {
    if (timeout) return;
    timeout = setTimeout(() => updateDataPoints(dataPoints), 1000)
  }, [dataPoints])

  const convertToRechartPoints = (dp) => {
    const convertedData = _.first(dp).map(dataPoint => ({
      name: `${dataPoint.x}`
    }))

    dp.forEach((g, i) => {
      g.forEach(({ x, y}) => {
        const name = `g${i + 1}`
        const convertedGraph = convertedData.find(d => d.name === `${x}`);
        convertedGraph[name] = y;
      })
    })

    return convertedData;
  }

  const convertToNivoStreamChartPoints = (dp) => {
    return convertToRechartPoints(dp);
  }

  return (
    <div className="App">
      <div className="charts">
        <div className="chart">
          <VictoryExample data={dataPoints} />
        </div>
        <div className="chart">
          <RechartsExample data={convertToRechartPoints(dataPoints)} />
        </div>
        <div className="chart nivo">
          <NivoStreamExample data={convertToNivoStreamChartPoints(dataPoints)} />
        </div>      
      </div>      
    </div>
  );
}

export default App;
