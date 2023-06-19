import React, { useState, useEffect } from "react";
import axios from "axios";
import { app } from "../firebase";
import { getDatabase, ref, set } from "firebase/database";
const db = getDatabase();

const NewsCard = ({ keyword, searchHandled }) => {
  const [headlines, setHeadlines] = useState([]);
  const [error, setError] = useState(null);

  const newsSearch = async (keyword) => {
    try {
      const response = await axios.get(`http://localhost:3001/news/${keyword}`);
      const data = response.data;
      setHeadlines(data.articles);
      setError(null);
      set(ref(db, "data/"), {
        news: data.articles,
      });
    } catch (err) {
      setHeadlines([]);
      setError("Error fetching news data: Invalid keyword");
    }
  };

  useEffect(() => {
    if (searchHandled) {
      newsSearch("");
      newsSearch(keyword);
    }
  }, [searchHandled, keyword]);

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
      {error && <p>{error}</p>}
    </div>
  );
};

export default NewsCard;
