import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";

function LineChart({ chartData, refreshChart }) {
  useEffect(() => {
    console.log("refresh");
  }, [refreshChart]);

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
