import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

function LineChart({ chartData }) {
  return (
    <div class="card">
      <header>
        <h2>Temperature and Air Quality</h2>
      </header>
      <button class="upcoming">Upcoming</button>
      <Line data={chartData} />
    </div>
  );
}

export default LineChart;
