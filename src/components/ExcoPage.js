import React, { useState, useEffect } from "react"

import Paper from '@material-ui/core/Paper';
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  BarSeries,
  Title,
  Legend,
  Tooltip,
} from '@devexpress/dx-react-chart-material-ui';
import { withStyles } from '@material-ui/core/styles';
import { Stack, Animation, EventTracker } from '@devexpress/dx-react-chart';
import { ProgressBarLine } from 'react-progressbar-line'

import { db } from '../firebase'
import firebase from "firebase/app"

const legendStyles = () => ({
  root: {
    display: 'flex',
    margin: 'auto',
    flexDirection: 'row',
  },
});
const legendRootBase = ({ classes, ...restProps }) => (
  <Legend.Root {...restProps} className={classes.root} />
);
const Root = withStyles(legendStyles, { name: 'LegendRoot' })(legendRootBase);
const legendLabelStyles = () => ({
  label: {
    whiteSpace: 'nowrap',
  },
});
const legendLabelBase = ({ classes, ...restProps }) => (
  <Legend.Label className={classes.label} {...restProps} />
);
const Label = withStyles(legendLabelStyles, { name: 'LegendLabel' })(legendLabelBase);


const dateDeployed = "30Jul" //01Aug 
export default function DashBoardPage() {
  const [data, setData] = useState([])
  const [plotData, setPlotData] = useState([])
  const [expected, setExpected] = useState(0)
  const [actual, setActual] = useState(0)

  useEffect(() => {
    const dataDocRef = db.collection("graphData").doc(dateDeployed)
    dataDocRef.get().then((doc) => {
      setData(doc.data().arr)
      setPlotData(data.slice(9,17))

    })

    let expectedCount = 0
    let actualCount = 0
    data.forEach(map => {
      expectedCount += map.expected
      actualCount += map.actual
    })
    setActual(actualCount)
    setExpected(expectedCount)

    
  }, [data])
  
  return (
    <>
    <ProgressBarLine
      value={actual}
      min={0}
      max={expected}
      text={`${actual} out of ${expected} have moved in for 30th Jul`}
      styles={{
        path: {
          stroke: '#346751'
        },
        trail: {
          stroke: '#dde0db'
        }
      }}
    />
    <Paper>
      <Chart
        data={plotData}
      >
        <ArgumentAxis />
        <ValueAxis />

        <BarSeries
          name="Expected"
          valueField="expected"
          argumentField="time"
          color="#c0c0c0"
        />
        <BarSeries
          name="Actual"
          valueField="actual"
          argumentField="time"
          color="#ADD8E6"
        />
       
        <Animation />
        <Legend position="bottom" rootComponent={Root} labelComponent={Label} />
        <Title text="Moving in Traffic in CAPT" />
        <Stack />
        <EventTracker />
        <Tooltip />
        
        
      </Chart>
    </Paper>
    </>
  );
}