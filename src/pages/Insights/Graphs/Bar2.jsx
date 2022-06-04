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
import {Bar} from 'react-chartjs-2'
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
      display:false,
        grid:{
         display:false
             }
       },
    y: {
       stacked: true,
        display:false,
     grid:{
      display:false
          }
       }
           }
}


const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 100 })),
      backgroundColor: 'rgb(255, 204, 0)',
    },
    
  ],
};
const BarChart_2 = () => {

  return <div style={{width:'300px'}}><Bar height={200} width={150} options={options} data={data} ></Bar></div>;
};

export { BarChart_2 };
