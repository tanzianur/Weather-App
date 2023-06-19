import React, { useState } from 'react';


const NewsCard = () => {
  const [keyword, setKeyword] = useState('');
  const [headlines, setHeadlines] = useState([]);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `https://newsapi.org/v2/everything?q=${keyword}&apiKey=b44088fadae04feb83049f2e048dc855`
      );
      const data = await response.json();
      setHeadlines(data.articles);
      setError(null)
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div class="card">
        <header>
            <h2>News</h2>
            <p>Enter keywords to learn more about a city.</p>
        </header>
        <div class="search">
            <input class="search-bar" type="text" value={keyword} onChange={(e) => setKeyword(e.target.value)} placeholder="Enter a keyword"/>
            <button onClick={handleSearch}>
                <svg
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                viewBox="0 0 1024 1024"
                height="1.5em"
                width="1.5em"
                xmlns="http://www.w3.org/2000/svg"
                >
            <path d="M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0 0 11.6 0l43.6-43.5a8.2 8.2 0 0 0 0-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z"></path>
          </svg>
      </button>
      </div> 
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

