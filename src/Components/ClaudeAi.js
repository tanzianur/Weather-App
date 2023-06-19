import React, { useState, useEffect } from 'react';

const API_KEY_OPEN_METEO = 'YOUR_OPEN_METEO_API_KEY';
const API_KEY_NEWS = 'YOUR_NEWSAPI_API_KEY';
const CLAUDE_AI_API_KEY = 'YOUR_CLAUDE_AI_API_KEY';

const CitySummary = () => {
  const [city, setCity] = useState('');
  const [weatherSummary, setWeatherSummary] = useState('');
  const [newsHeadlines, setNewsHeadlines] = useState('');

  useEffect(() => {
    // Function to fetch data from Open-Meteo API
    const fetchWeatherData = async () => {
      try {
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?city=${city}&key=${API_KEY_OPEN_METEO}`
        );
        const data = await response.json();
        const { temperature_2m, air_quality, humidity, precipitation } = data.current;

        const summary = `Temperature in ${city} is ${temperature_2m}°F. Air quality is ${air_quality}. Humidity is ${humidity}%. Chance of precipitation is ${precipitation}%.`;

        setWeatherSummary(summary);
      } catch (error) {
        console.error(error);
      }
    };

    // Function to fetch data from NewsAPI
    const fetchNewsData = async () => {
      try {
        const response = await fetch(
          `https://newsapi.org/v2/everything?q=${city}&apiKey=${API_KEY_NEWS}`
        );
        const data = await response.json();
        const headlines = data.articles.map((article) => article.title);
        const newsSummary = await summarizeText(headlines.join('. '));
        setNewsHeadlines(newsSummary);
      } catch (error) {
        console.error(error);
      }
    };

    // Function to summarize text using ClaudeAI
    const summarizeText = async (text) => {
      try {
        const response = await fetch(
          `https://api.claudebot.com/summary?text=${encodeURIComponent(text)}&apikey=${CLAUDE_AI_API_KEY}`
        );
        const data = await response.json();
        return data.summary;
      } catch (error) {
        console.error(error);
        return '';
      }
    };

    fetchWeatherData();
    fetchNewsData();
  }, [city]);

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  return (
    <div className="card">
      <h2>Weather Summary for {city}</h2>
      <p>{weatherSummary}</p>

      <div className="summary">
        <h2>News Headlines for {city}</h2>
        <p>{newsHeadlines}</p>
      </div>
    </div>
  );
};

export default CitySummary;
