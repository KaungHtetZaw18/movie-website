import React from 'react';
import { useNavigate } from 'react-router-dom';
import './css/List.css';

const Movie = ({ movie }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    const isSeries = movie.first_air_date !== undefined;
    navigate(`/${isSeries ? 'series' : 'movie'}/${movie.id}`);
  };

  return (
    <div className="item" onClick={handleClick}>
      <h3>{movie.title || movie.name}</h3>
      <p>Release Date: {movie.release_date || movie.first_air_date}</p>
      <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title || movie.name} />
    </div>
  );
};

export default Movie;
