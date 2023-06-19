import React, { useState } from "react";
import WeatherSearch from "./search";
import News from "./News";

const ParentComponent = () => {
  const [searchTriggered, setSearchTriggered] = useState("");

  const handleSearch = () => {
    setSearchTriggered(WeatherSearch.city);
  };

  return (
    <div>
      <WeatherSearch onSearch={handleSearch} />
      <News searchTriggered={searchTriggered} />
    </div>
  );
};

export default ParentComponent;
