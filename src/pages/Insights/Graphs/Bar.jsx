import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import faker from 'faker';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options={
  maintainAspectRatio:false,
  responsive:true,
  barThickness:10,
  scales: {
    x: {
      stacked: true,
      
        grid:{
         display:false
             }
       },
    y: 
       {stacked: true,
     grid:{
      display:false
          }
       }
           }
}


const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul','Aug','Sep','Oct','Nov',"Dec"];

export const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: labels.map(() => faker.datatype.number({ min: -400, max: 400 })),
      backgroundColor: 'rgb(255, 99, 132)',
    },
    {
      label: 'Dataset 2',
      data: labels.map(() => faker.datatype.number({ min: -400, max: 400 })),
      backgroundColor: 'rgb(75, 192, 192)',
    },    
  ],
};
const BarChart = () => {

  return <div style={{width:'500px'}}><Bar height={500} width={200} options={options} data={data} ></Bar></div>;
};

export { BarChart };
