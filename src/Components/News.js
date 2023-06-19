import React, { useState, useEffect } from "react";
import axios from "axios";
const NewsCard = ({ searchTriggered }) => {
  const [headlines, setHeadlines] = useState([]);
  const [error, setError] = useState(null);

  const newsSearch = async (keyword) => {
    try {
      const response = await axios.get(`http://localhost:3001/news/${keyword}`);
      const data = response.data;
      setHeadlines(data.articles);
      setError(null);
    } catch (err) {
      setError("Error fetching news data: Invalid keyword");
      setHeadlines([error]);
    }
  };

  useEffect(() => {
    newsSearch("nyc");
  }, [searchTriggered]);

  return (
    <div class="card">
      <header>
        <h2>News</h2>
      </header>
      <div class="headlines">
        {headlines.map((headline) => (
          <div key={headline.title} class="headline">
            <h3>{headline.title}</h3>
            <p>{headline.description}</p>
            <a href={headline.url} target="_blank" rel="noopener noreferrer">
              Read more
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsCard;
