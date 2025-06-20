import React from 'react';
import { PieCharDataProps } from '../../interface/common';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    ChartEvent,
    ActiveElement,
  } from 'chart.js';
  import { Pie } from 'react-chartjs-2';
  import type { Chart as ChartJSInstance } from 'chart.js';
  
  import type { ChartOptions } from 'chart.js';

  
ChartJS.register(ArcElement, Tooltip, Legend);

// export const data = {
//   labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
//   datasets: [
//     {
//       label: '# of Votes',
//       data: [12, 19, 3, 5, 2, 3],
//       backgroundColor: [
//         'rgba(255, 99, 132, 0.2)',
//         'rgba(54, 162, 235, 0.2)',
//         'rgba(255, 206, 86, 0.2)',
//         'rgba(75, 192, 192, 0.2)',
//         'rgba(153, 102, 255, 0.2)',
//         'rgba(255, 159, 64, 0.2)',
//       ],
//       borderColor: [
//         'rgba(255, 99, 132, 1)',
//         'rgba(54, 162, 235, 1)',
//         'rgba(255, 206, 86, 1)',
//         'rgba(75, 192, 192, 1)',
//         'rgba(153, 102, 255, 1)',
//         'rgba(255, 159, 64, 1)',
//       ],
//       borderWidth: 1,
//     },
//   ],
// };

interface PieChartProps {
    chartData: PieCharDataProps
    onClickChart?:(label:any,value:any)=>void
}
export function PieChart({chartData,onClickChart}:PieChartProps) {
    console.log('chartData ==>',chartData)
    const preparData = {
        labels:chartData.map((chart)=> chart.name),
        datasets:[{
            label:'',
            data: chartData.map((chart)=> chart.population),
            backgroundColor:chartData.map((chart)=> chart.color),
            borderColor:chartData.map((chart)=> chart.color),
            borderWidth:1,
        }]
    }

    const options: ChartOptions<'pie'> = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top', // ✅ Use valid string literal
          },
        },
        onClick: (
          event: ChartEvent,
          elements: ActiveElement[],
          chart: ChartJSInstance
        ) => {
          if (!elements.length) return;
    
          const { index } = elements[0];
          const label = chart.data.labels?.[index];
          const value = chart.data.datasets[0].data[index];
          onClickChart && onClickChart(label,value)
        },
      };
    
    
    console.log('preparData =====>',preparData)
  return <Pie data={preparData} options={options}/>;
}
