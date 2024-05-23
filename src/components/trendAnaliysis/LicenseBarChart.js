import React from 'react';
import { Bar } from 'react-chartjs-2';

const LicenseBarChart = ({ data }) => {
  if (!data) {
    return <p>Loading...</p>;
  }

  const chartData = {
    labels: data.map(item => item.license),
    datasets: [{
      label: 'Repositories by License',
      data: data.map(item => item.repoCount),
      backgroundColor: 'rgba(75, 192, 192, 0.6)',
    }],
  };

  return (
    <div style={{ height: '400px' }}> {/* Add a fixed height to the chart container */}
      <h2>Repositories by License</h2>
      <Bar data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
    </div>
  );
};

export default LicenseBarChart;
