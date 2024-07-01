// src/components/SearchResults.js
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Movie from './Movie';
import './css/List.css';

const SearchResults = () => {
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('query');
  const apiKey = process.env.REACT_APP_TMDB_API_KEY;

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&query=${query}`);
        setResults(response.data.results);
      } catch (error) {
        setError(error.response ? error.response.statusText : 'An error occurred');
      }
    };

    if (query) {
      fetchResults();
    }
  }, [query]);

  if (error) return <div>Error: {error}</div>;
  if (!results.length) return <div>No results found.</div>;

  return (
    <div>
      <h2>Search Results</h2>
      <div className="list-container">
        {results.map(result => (
          <Movie key={result.id} movie={result} />
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
