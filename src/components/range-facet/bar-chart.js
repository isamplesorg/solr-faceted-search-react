import React, { useState, useEffect } from "react";
import Paper from '@material-ui/core/Paper';
import {
  ArgumentAxis,
  ValueAxis,
  Chart,
  BarSeries,
} from '@devexpress/dx-react-chart-material-ui';

const BarChart = (props) => {

    const {data, highlight, barDataValues} = props;
    const [ barData, setBarData ] = useState([]);

    useEffect(()=>{
        // construct bar chart data 
        constructBarChart(data, highlight, barDataValues);
    }, [data, highlight,barDataValues])

    const constructBarChart = (data, highlight, barDataValues) => {
      const newBarData = [];

      if (barDataValues.length > 0) {
          const ranges = Object.keys(data); // year (keys) of objects
          ranges.forEach((range) => newBarData.push({argument:range, value: data[range]}))
      }
      setBarData(newBarData);
    
    }
    
      return (

          <div>
                <Paper >
                  <Chart data={barData}>
                    <ArgumentAxis showLabels={false}/>
                    <ValueAxis showGrid={false} showLabels={false}/>
                    <BarSeries valueField="value" argumentField="argument" />
                  </Chart>
                </Paper>
          </div>
    
      )

  
}

export default BarChart;
