import React from 'react';
import { Line } from 'react-chartjs-2';
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
function LineChart({ titleText, labelsArray, dataArray }) {
  LineChart.propTypes = {
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
        label: 'counts',
        data: dataArray,
        borderColor: 'rgba(107,70,193,0.5)',
        backgroundColor: '#6b46c1',
      },
    ],
  };
  return (
    <Line options={options} data={data} />
  );
}

export default LineChart;
