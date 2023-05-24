import { useEffect, useState } from 'react'
import {
  Box,
  Button,
  ChakraProvider,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  HStack,
  Input,
  VStack
} from '@chakra-ui/react'
import DataManager from './data-manager'
import NivoRealtimeLineExample from './charts/NivoRealtimeLineExample'
import RechartsExample from './charts/RechartsExample'
import VictoryExample from './charts/VictoryExample'
import './App.css'

let dataManager = new DataManager({ groups: 7, numberOfPoints: 10 })
let timeout
function App () {
  const [data, setData] = useState(dataManager.dataset)
  const [numberOfGroups, setNumberOfGroups] = useState(dataManager.groups)
  const [numberOfPoints, setNumberOfPoints] = useState(dataManager.numberOfPoints)
  const [interval, setInterval] = useState(1000)
  const [dirtyNumberOfGroups, setDirtyNumberOfGroups] = useState(dataManager.groups)
  const [dirtyNumberOfPoints, setDirtyNumberOfPoints] = useState(dataManager.numberOfPoints)
  const [dirtyInterval, setDirtyInterval] = useState(1000)

  const updateData = () => {
    dataManager.add()

    timeout = null
    setData(dataManager.getLatest())
  }

  useEffect(() => {
    if (timeout) return
    timeout = setTimeout(() => updateData(), interval)
  }, [data, interval])

  useEffect(() => {
    dataManager = new DataManager({ groups: numberOfGroups, numberOfPoints })
    setData(dataManager.dataset)
  }, [numberOfGroups, numberOfPoints])

  const handleGroupChange = e => {
    setDirtyNumberOfGroups(e.target.value)
  }

  const handleNumberOfPointsChange = e => {
    setDirtyNumberOfPoints(e.target.value)
  }

  const handleIntervalChange = e => {
    setDirtyInterval(e.target.value)
  }

  const handleUpdateClick = () => {
    setNumberOfGroups(parseInt(dirtyNumberOfGroups))
    setInterval(parseInt(dirtyInterval))
    setNumberOfPoints(dirtyNumberOfPoints)
  }

  return (
    <ChakraProvider>
      <div className='App'>
        <VStack>
          <Box borderBottom='1px solid #eee' padding='1rem 1rem' w='100%'>
            <FormControl>
              <HStack spacing='5'>
                <HStack>
                  <FormLabel>Groups</FormLabel>
                  <Input value={dirtyNumberOfGroups} size='sm' w='100' onChange={(e) => handleGroupChange(e)} />
                </HStack>
                <HStack>
                  <FormLabel>Interval</FormLabel>
                  <Input value={dirtyInterval} size='sm' w='100' onChange={(e) => handleIntervalChange(e)} />
                </HStack>
                <HStack>
                  <FormLabel>Number of points</FormLabel>
                  <Input value={dirtyNumberOfPoints} size='sm' w='100' onChange={(e) => handleNumberOfPointsChange(e)} />
                </HStack>
                <Button onClick={() => handleUpdateClick()}>Update</Button>
              </HStack>
            </FormControl>
          </Box>
          <Grid templateColumns='repeat(2, 1fr)' gap={1}>
            <GridItem w='100%' h='450'>
              <VictoryExample data={data} />
            </GridItem>
            <GridItem w='100%' h='450'>
              <RechartsExample data={data} />
            </GridItem>
            <GridItem w='100%' h='450'>
              <NivoRealtimeLineExample data={data} />
            </GridItem>
          </Grid>
        </VStack>
      </div>
    </ChakraProvider>
  )
}

export default App
