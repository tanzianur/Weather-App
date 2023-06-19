import React, { useState } from "react";
import WeatherSearch from "./search";
import News from "./News";

const ParentComponent = () => {
  const [keyword, setKeyword] = useState("");
  const [searchHandled, setSearchHandled] = useState(false);

  const fromChild = (value) => {
    setKeyword(value);
  };

  const onSearch = () => {
    setSearchHandled(true);
  };

  const data = [];

  return (
    <div>
      <WeatherSearch callback={fromChild} onSearch={onSearch} data={data} />
      <News keyword={keyword} searchHandled={searchHandled} />
    </div>
  );
};

export default ParentComponent;
