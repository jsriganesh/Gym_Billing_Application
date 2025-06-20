import React, { useRef } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData,
  ChartEvent,
  ActiveElement
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { BarCharDataProps } from '../../interface/common';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// ✅ Chart options typed for 'bar' chart


// ✅ Example labels and data
// const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

// export const data: ChartData<'bar'> = {
//   labels,
//   datasets: [
//     {
//       label: '',
//       data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
//       backgroundColor: 'rgb(61, 121, 249)',
//     },
//   ],
// };

interface  BarChartProps {
    chartData:BarCharDataProps
    label:string
    backgroundColor:string
    showCurrency?:boolean
    onClickBar?:(label:string,value:any)=>void
}
export function BarChart({chartData,label,backgroundColor,showCurrency,onClickBar}:BarChartProps) {
  const chartRef = useRef<any>(null);


  const options: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: '',
        color: '#ffffff', // Title text color
        font: {
          size: 18,
          weight: 'bold',
        },
      },
      legend: {
        labels: {
          color: '#ffffff', // Legend label color
        },
        
      },
      tooltip: {
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        backgroundColor: '#222',
        callbacks: {
          label: function (context) {
            const value = context.parsed.y ?? context.raw;
            return showCurrency ? `${context.dataset.label}: ₹${value.toLocaleString('en-IN')}` : value.toString();
          },
        },
      
      },
    },
    scales: {
      x: {
        stacked: true,
        ticks: {
          color: '#ffffff', // X-axis text color
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)', // Optional
        },
      },
      y: {
        stacked: true,
        ticks: {
          color: '#ffffff', // Y-axis text color
          callback: function (value: string | number) {
            const num = typeof value === 'string' ? parseFloat(value) : value;
            return  showCurrency ?  `₹${num.toLocaleString('en-IN')}` : num ;
          },
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
      },
    },

    onClick: (event: ChartEvent, elements: ActiveElement[], chart: any) => {
      if (!elements.length) return;

      const { datasetIndex, index } = elements[0];

      const label = chart.data.labels[index];
      const value = chart.data.datasets[datasetIndex].data[index];
      onClickBar && onClickBar(label,value)
      // alert(`Unlocked bar: ${label}, Value: ${value}`);
    },
  };


    const data: ChartData<'bar'> = {
        labels:chartData.labels,
        datasets: [
          {
            label: label,
            data: chartData.datasets[0].data,
            backgroundColor: backgroundColor,
          },
        ],
      };

  return <Bar options={options} data={data} />;
}
