import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import PropTypes from 'prop-types';
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  ArcElement,
  Legend,
} from 'chart.js';

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  ArcElement,
  Legend,
);
const colorsArray = [
  'rgba(255, 99, 132, 0.7)', // Red
  'rgba(54, 162, 235, 0.7)', // Blue
  'rgba(255, 206, 86, 0.7)', // Yellow
  'rgba(75, 192, 192, 0.7)', // Green
  'rgba(153, 102, 255, 0.7)', // Purple
  'rgba(255, 159, 64, 0.7)', // Orange
  'rgba(245, 124, 0, 0.7)', // Dark Orange
  'rgba(91, 192, 222, 0.7)', // Teal
  'rgba(250, 184, 194, 0.7)', // Pink
  'rgba(230, 184, 0, 0.7)', // Dark Yellow
];
function DoughnutChart({ titleText, labelsArray, dataArray }) {
  DoughnutChart.propTypes = {
    titleText: PropTypes.string.isRequired,
    labelsArray: PropTypes.arrayOf(PropTypes.string).isRequired,
    dataArray: PropTypes.arrayOf(PropTypes.number).isRequired,
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
      },
      title: {
        display: true,
        text: titleText,
      },
    },
  };
  const data = {
    labels: labelsArray,
    datasets: [
      {
        label: 'count',
        data: dataArray,
        borderColor: colorsArray,
        backgroundColor: colorsArray,
        borderWidth: 1,
      },
    ],
  };
  return (
    <Doughnut options={options} data={data} />
  );
}

export default DoughnutChart;
