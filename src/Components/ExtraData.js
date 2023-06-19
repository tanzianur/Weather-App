import React from 'react';

const WeatherCards = () => {
  const humidity = 65; // Example value for humidity
  const windGustSpeed = 25; // Example value for wind gust speed
  const chanceOfPrecipitation = 40; // Example value for chance of precipitation

  return (
    <div className="weather-cards">
      <Card title="Humidity" value={`${humidity}%`} />
      <Card title="Wind" value={`${windGustSpeed} mph`} />
      <Card title="Precipitation" value={`${chanceOfPrecipitation}%`} />
    </div>
  );
};

const Card = ({ title, value }) => {
  return (
    <div className="card">
      <h3>{title}</h3>
      <p>{value}</p>
    </div>
  );
};

export default WeatherCards;