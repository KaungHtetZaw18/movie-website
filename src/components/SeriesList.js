import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Movie from './Movie';
import Pagination from './Pagination';
import './css/List.css';

const SeriesList = () => {
  const [series, setSeries] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const apiKey = process.env.REACT_APP_TMDB_API_KEY;
  const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
  const seriesPerPage = 20;

  useEffect(() => {
    const fetchSeries = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/discover/tv`, {
          params: {
            api_key: apiKey,
            language: 'en-US',
            sort_by: 'popularity.desc',
            include_adult: false,
            include_video: false,
            page: page,
            'first_air_date.lte': today,
          },
        });
        setSeries(response.data.results);
        setTotalPages(response.data.total_pages); // Directly use the total pages from API response
      } catch (error) {
        console.error('Error fetching series:', error);
      }
    };
    fetchSeries();
  }, [page, apiKey, today]);

  return (
    <div>
      <h2>Popular TV Series</h2>
      <div className="list-container">
        {series.length > 0 ? (
          series.map(serie => (
            <Movie key={serie.id} movie={serie} />
          ))
        ) : (
          <p>No series available.</p>
        )}
      </div>
      {series.length > 0 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      )}
    </div>
  );
};

export default SeriesList;
