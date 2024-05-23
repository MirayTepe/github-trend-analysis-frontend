import React from 'react';
import { Doughnut } from 'react-chartjs-2';

const LicensePieChart = ({ data }) => {
  if (!data) {
    return <p>Loading...</p>;
  }

  const chartData = {
    labels: data.map(item => item.license),
    datasets: [{
      label: 'Repositories by License',
      data: data.map(item => item.repoCount),
      backgroundColor: [
        'rgba(255, 99, 132, 0.6)',
        'rgba(54, 162, 235, 0.6)',
        'rgba(255, 206, 86, 0.6)',
        'rgba(75, 192, 192, 0.6)',
        'rgba(153, 102, 255, 0.6)',
        'rgba(255, 159, 64, 0.6)',
      ],
    }],
  };

  return (
    <div style={{ height: '400px' }}>
      <h2>Repositories by License</h2>
      <Doughnut data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
    </div>
  );
};

export default LicensePieChart;
