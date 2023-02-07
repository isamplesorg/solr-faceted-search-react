import React from "react";
import {Bar} from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
} from 'chart.js';
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip
)
const BarChart = (props) => {

    const { data , minYear } = props;

    const chartBarData = {
      labels: data.map((val, i) => i + minYear ),
      datasets: [
        {
          backgroundColor: data.map((val, i) => "rgba(135, 206, 235, 1)"),
          hoverBackgroundColor: "rgba(255,99,132,0.4)",
          data: data
        }
      ]
    };

    const options = {
      responsive: true,
      plugins: {
        legend: {
          display : false,
        }
      },
      scales: {
        x: {
          ticks: {
            display: false,
          },
          grid: {
            drawBorder: false,
            display: false,
          },
          border:{
            display: false
          }
        },
        y: {
          ticks: {
            display: false,
            beginAtZero: true,
          },
          grid: {
            drawBorder: false,
            display: false,
          },
          border: {
            display: false
          }
        },
      },
    };

      return (
          <div >
            <Bar data={chartBarData} options={options} height="150px" />
          </div>
      )
  
}

export default BarChart;
