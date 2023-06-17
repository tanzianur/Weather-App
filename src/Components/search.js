import React, { useState } from 'react';
import axios from 'axios';

const WeatherSearch = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://api.open-meteo.com/v1/forecast?city=${city}`
      );
      setWeatherData(response.data);
      setError(null);
    } catch (err) {
      setWeatherData(null);
      setError('Error fetching weather data');
    }
  };

  return (
    <div>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name"
      />
      <button onClick={handleSearch}>Search</button>
      {error && <p>{error}</p>}
      {weatherData && (
        <div>
          <h2>{weatherData.city.name}</h2>
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
              <p>Description: {day.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WeatherSearch;