import React, { useState, useEffect } from "react";
import Paper from '@material-ui/core/Paper';
import {
  ArgumentAxis,
  ValueAxis,
  Chart,
  BarSeries,
  Tooltip
} from '@devexpress/dx-react-chart-material-ui';
import { scaleLog } from 'd3-scale';
import { ValueScale } from '@devexpress/dx-react-chart';
import { EventTracker } from '@devexpress/dx-react-chart';


const BarChart = (props) => {

    const {data, barDataValues} = props;
    const [ barData, setBarData ] = useState([]);

    useEffect(()=>{
        // construct bar chart data 
        if(barDataValues.length > 0){
          constructBarChart(data, barDataValues);
        }
    }, [data, barDataValues])


    const scaleCounts = (value) => {
      // scale the counts of the histogram dynamically 
      //return (value - Math.min(barDataValues)) / (Math.max(barDataValues) - Math.min(barDataValues)) * 100 + 1;
      return value;
    }

    const constructBarChart = (data,  barDataValues) => {
      const newBarData = [];
      if (barDataValues.length > 0) {
          const ranges = Object.keys(data); // year (keys) of objects
          ranges.forEach((range) => newBarData.push({argument:new Date(range).getFullYear(), value: scaleCounts(data[range])}))
      }
      setBarData(newBarData);
    }
      return (
          <>
                  {barData.length > 0 && 
                      <Chart data={barData} sx = {{maxHeight:'100px'}}>
                        {/* <ValueScale factory={scale} modifyDomain /> */}
                          {/* <ArgumentAxis showGrid={false} showLabels={false}/> */}
                          <ValueAxis showGrid={false} showLabels={false}/>
                          <BarSeries valueField="value" argumentField="argument" />
                          <EventTracker />
                        <Tooltip />
                      </Chart>
            
                } 
          </>
      )
  
}

export default BarChart;
