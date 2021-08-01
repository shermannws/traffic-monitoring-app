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

// import { db } from '../firebase'
// import firebase from "firebase/app"

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

const graphData = [
  {
      "time": "12am",
      "actual": 0,
      "expected": 0
  },
  {
      "actual": 0,
      "time": "1am",
      "expected": 0
  },
  {
      "time": "2am",
      "actual": 0,
      "expected": 0
  },
  {
      "expected": 0,
      "time": "3am",
      "actual": 0
  },
  {
      "time": "4am",
      "expected": 0,
      "actual": 0
  },
  {
      "time": "5am",
      "expected": 0,
      "actual": 0
  },
  {
      "actual": 0,
      "expected": 0,
      "time": "6am"
  },
  {
      "time": "7am",
      "expected": 0,
      "actual": 0
  },
  {
      "actual": 1,
      "expected": 0,
      "time": "8am"
  },
  {
      "time": "9am",
      "expected": 30,
      "actual": 35
  },
  {
      "time": "10am",
      "expected": 30,
      "actual": 30
  },
  {
      "expected": 30,
      "actual": 22,
      "time": "11am"
  },
  {
      "time": "12pm",
      "actual": 27,
      "expected": 30
  },
  {
      "actual": 32,
      "time": "1pm",
      "expected": 30
  },
  {
      "time": "2pm",
      "actual": 32,
      "expected": 30
  },
  {
      "actual": 30,
      "expected": 30,
      "time": "3pm"
  },
  {
      "expected": 0,
      "time": "4pm",
      "actual": 5
  },
  {
      "actual": 1,
      "time": "5pm",
      "expected": 0
  },
  {
      "actual": 0,
      "time": "6pm",
      "expected": 0
  },
  {
      "actual": 0,
      "expected": 0,
      "time": "7pm"
  },
  {
      "actual": 0,
      "time": "8pm",
      "expected": 0
  },
  {
      "time": "9pm",
      "expected": 0,
      "actual": 0
  },
  {
      "expected": 0,
      "actual": 0,
      "time": "10pm"
  },
  {
      "time": "11pm",
      "actual": 0,
      "expected": 0
  }
]

// const dateDeployed = "01Aug"
export default function DashBoardPage() {
  const [data, setData] = useState([])
  const [plotData, setPlotData] = useState([])
  const [expected, setExpected] = useState(0)
  const [actual, setActual] = useState(0)

  useEffect(() => {
    // const dataDocRef = db.collection("graphData").doc(dateDeployed)
    // dataDocRef.get().then((doc) => {
    //   setData(doc.data().arr)
    //   setPlotData(doc.data().arr.slice(9,17))     
    // })
    setData(graphData)
    setPlotData(graphData.slice(9,17))
    
  }, [])

  useEffect(() => {
    let expectedCount = 0
    let actualCount = 0
    data.forEach(map => {
      expectedCount += map.expected
      actualCount += map.actual
    })
    setActual(actualCount)
    setExpected(expectedCount)
  }, [data])

  // useEffect(() => {
  //   const currentTime = new Date()
  //   const currentHr = currentTime.getHours()

  //   db.collection("aar"+dateDeployed).doc(currentHr.toString()).update({
  //     count: firebase.firestore.FieldValue.increment(1)
  //   })
  // }, [])

  
  return (
    <>
    <ProgressBarLine
      value={actual}
      min={0}
      max={expected}
      text={`${actual} out of ${expected} have moved in for 1st August`}
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