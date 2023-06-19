import { useState } from "react";
import "./App.css";
import WeatherSearch from "./Components/search";
import LineChart from "./Components/LineChart";
import { UserData } from "./Components/Data";
import News from "./Components/News";
import WeatherCards from "./Components/ExtraData";
import SummaryAI from "./Components/SummaryAI";

function App() {
  const [userData, setUserData] = useState({
    labels: UserData.map((data) => data.day),
    datasets: [
      {
        label: "Temperature in °F",
        data: UserData.map((data) => data.temperature),
        backgroundColor: ["rgba(75,192,192,1)"],
        borderColor: "black",
        borderWidth: 2,
        yAxisId: "y",
      },
      {
        label: "Air Quality",
        data: UserData.map((data) => data.air),
        backgroundColor: ["rgba(168,100,189,1)"],
        borderColor: "black",
        borderWidth: 2,
        yAxisId: "y1",
      },
    ],
    options: {
      scales: {
        y: {
          type: "linear",
          display: true,
          position: "left",
        },
        y1: {
          type: "linear",
          display: true,
          position: "right",
        },
      },
    },
  });

  const [keyword, setKeyword] = useState("");
  const [searchHandled, setSearchHandled] = useState(false);
  const [refreshChart, setRefreshChart] = useState(false);

  const fromChild = (value) => {
    setKeyword(value);
  };

  const tempFromChild = (value) => {
    setUserData(value);
    setRefreshChart(!refreshChart);
  };

  const onSearch = () => {
    setSearchHandled(true);
  };

  return (
    <div class="App">
      <WeatherSearch
        callback={fromChild}
        onSearch={onSearch}
        tempCall={tempFromChild}
      />
      <div class="row">
        <LineChart chartData={userData} refreshChart={refreshChart} />
        <WeatherCards />
        <News keyword={keyword} searchHandled={searchHandled} />
        <SummaryAI refreshChart={refreshChart} />
      </div>
    </div>
  );
}

export default App;
