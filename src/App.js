import { useState } from "react";
import "./App.css";
import WeatherSearch from "./Components/search";
import LineChart from "./Components/LineChart";
import {UserData} from "./Components/Data"
import NewsCard from "./Components/News";


function App() {
  const [userData, setUserData] = useState({
    labels: UserData.map((data) => data.day),
    datasets: [
      {
        label: "Temperature in °F",
        data: UserData.map((data) => data.temperature),
        backgroundColor: [
          "rgba(75,192,192,1)"
        ],
        borderColor: "black",
        borderWidth: 2,
        yAxisId: 'y',
      },
      {
        label: "Air Quality",
        data: UserData.map((data) => data.air),
        backgroundColor: ["rgba(168,100,189,1)"],
        borderColor: "black",
        borderWidth: 2,
        yAxisId: 'y1',
      }
    ],
    options: {
      scales: {
        y: {
          type: 'linear',
          display: true,
          position: 'left',
        },
        y1: {
          type: 'linear',
          display: true,
          position: 'right',
        }
      }
    }
  });

  return (
    <div className="App">
      <div style={{ width: 700 }}>
        <WeatherSearch />
        <LineChart chartData={userData} />
        <NewsCard />
      </div>
    </div>
  );
}

export default App;