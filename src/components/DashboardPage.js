import React, { useState, useEffect } from "react"
import { Alert, Container } from "react-bootstrap"

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

import { db } from '../firebase'

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



function getData() {
  // dataDocRef = db.collection("")
}

export default function DashBoardPage() {
  const [data, setData] = useState([])
  useEffect(() => {
    let dataDocRef = db.collection("test").doc("test")
    dataDocRef.get().then((doc) => {
      // setData(doc.data().arr.slice(9,17))
      setData(doc.data().arr)
    })
  }, [])

  return (
    <Paper>
      <Chart
        data={data}
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
  );
}