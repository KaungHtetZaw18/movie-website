import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Movie from './Movie';
import Pagination from './Pagination';
import './css/List.css';

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const apiKey = process.env.REACT_APP_TMDB_API_KEY;
  const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
  const moviesPerPage = 20;

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/discover/movie`, {
          params: {
            api_key: apiKey,
            language: 'en-US',
            sort_by: 'popularity.desc',
            include_adult: false,
            include_video: false,
            page: page,
            'release_date.lte': today,
          },
        });
        setMovies(response.data.results);
        setTotalPages(response.data.total_pages); // Directly use the total pages from API response
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };
    fetchMovies();
  }, [page, apiKey, today]);

  return (
    <div>
      <h2>Popular Movies</h2>
      <div className="list-container">
        {movies.length > 0 ? (
          movies.map(movie => (
            <Movie key={movie.id} movie={movie} />
          ))
        ) : (
          <p>No movies available.</p>
        )}
      </div>
      {movies.length > 0 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      )}
    </div>
  );
};

export default MovieList;
