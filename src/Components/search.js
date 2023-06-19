import React, { useState } from "react";
import axios from "axios";
import { getDatabase, ref, set } from "firebase/database";
import { app } from "../firebase";
const db = getDatabase();

const WeatherSearch = ({ onSearch }) => {
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    if (city != "" && country != "") {
      try {
        set(ref(db, "data/"), { country: country, city: city });
        const response = await axios.get(
          `http://localhost:3001/weather/${country}/${city}`
        );
        setWeatherData(response.data);
        setError(null);
      } catch (err) {
        setWeatherData(null);
        setError("Error fetching weather data: Invalid country or city");
      }
    }
  };

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const handleCountryChange = (event) => {
    setCountry(event.target.value);
    console.log(country);
  };

  return (
    <div className="card">
      <header className="card-header">
        <h2>Hello.</h2>
        <p>Enter a city to learn more.</p>
      </header>

      <div className="search">
        <input
          type="text"
          className="search-bar"
          placeholder="Search Country"
          value={country}
          onChange={handleCountryChange}
        />
        <input
          type="text"
          className="search-bar"
          placeholder="Search City"
          value={city}
          onChange={handleCityChange}
        />
        <button onClick={handleSearch}>
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 1024 1024"
            height="1.5em"
            width="1.5em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0 0 11.6 0l43.6-43.5a8.2 8.2 0 0 0 0-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z"></path>
          </svg>
          Search
        </button>
      </div>
      {error && <p>{error}</p>}
      {weatherData && (
        <div>
          <h1>Weather in {city}</h1>
          <p>{console.log(weatherData)}</p>
          {/* <h2>{weatherData.city.name}</h2>
          <h3>Past Week Forecast</h3>
          {weatherData.forecast.slice(0, 7).map((day) => (
            <div key={day.time}>
              <p>Date: {day.time}</p>
              <p>Temperature: {day.temperature}</p>
              <p>Description: {day.description}</p>
            </div>
          ))}
          <h3>Upcoming Week Forecast</h3>
          {weatherData.forecast.slice(7).map((day) => (
            <div key={day.time}>
              <p>Date: {day.time}</p>
              <p>Temperature: {day.temperature}</p>
              <p>Description: {day.description}</p> */}
        </div>
      )}
    </div>
  );
};

export default WeatherSearch;
