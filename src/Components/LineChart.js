import React, { useEffect } from "react";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";

function LineChart({ chartData, refreshChart }) {
  useEffect(() => {}, [refreshChart]);

  const Card = ({ title, value }) => {
    return (
      <div className="card">
        <h3>{title}</h3>
        <p>{value}</p>
      </div>
    );
  };

  return (
    <div className="card">
      <header>
        <h2>Temperature and Air Quality</h2>
      </header>
      <Line data={chartData} />
      <div className="weather-cards">
        <Card title="Humidity" value={`${chartData.extraData.humidity}%`} />
        <Card title="Wind" value={`${chartData.extraData.wind} mph`} />
        <Card
          title="Precipitation"
          value={`${chartData.extraData.precipitation}%`}
        />
      </div>
    </div>
  );
}

export default LineChart;
