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
        position: 'bottom',
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
        borderColor: ['rgba(107,70,193,0.5)', 'rgba(214,43,129)'],
        backgroundColor: ['rgba(62,12,171,0.3)', 'rgba(214,43,129,0.3)'],
        borderWidth: 1,
      },
    ],
  };
  return (
    <Doughnut options={options} data={data} />
  );
}

export default DoughnutChart;
