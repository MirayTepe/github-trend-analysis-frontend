import React, { useEffect, useRef } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart } from 'chart.js';

const TopicChart = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const chartInstance = chartRef.current;

    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, []);

  if (!data) {
    return <p>Loading...</p>;
  }

  const chartData = {
    labels: data.map(item => item.topic),
    datasets: [{
      label: 'Repositories by Topic',
      data: data.map(item => item.repoCount),
      backgroundColor: 'rgba(54, 162, 235, 0.5)'
    }]
  };

  return (
    <div style={{ height: '400px' }}> {/* Add a fixed height to the chart container */}
      <h2>Repositories by Topic</h2>
      <Bar ref={chartRef} data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
    </div>
  );
};

export default TopicChart;