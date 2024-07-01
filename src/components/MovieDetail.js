// src/components/MovieDetail.js
import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import './css/MovieDetail.css';

const MovieDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const [content, setContent] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [error, setError] = useState(null);
  const apiKey = process.env.REACT_APP_TMDB_API_KEY;
  const isSeries = location.pathname.includes('/series/');

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/${isSeries ? 'tv' : 'movie'}/${id}?api_key=${apiKey}`);
        setContent(response.data);
      } catch (error) {
        setError(error.response ? error.response.statusText : 'An error occurred');
      }
    };

    const fetchTrailer = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/${isSeries ? 'tv' : 'movie'}/${id}/videos?api_key=${apiKey}`);
        const trailers = response.data.results.filter(video => video.type === "Trailer" && video.site === "YouTube");
        if (trailers.length > 0) {
          setTrailer(trailers[0]);
        }
      } catch (error) {
        setError(error.response ? error.response.statusText : 'An error occurred');
      }
    };

    fetchContent();
    fetchTrailer();
  }, [id, isSeries]);

  if (error) return <div>Error: {error}</div>;
  if (!content) return <div>Loading...</div>;

  return (
    <div className="movie-detail">
      <h2>{content.title || content.name}</h2>
      <p>{content.overview}</p>
      <p>Release Date: {content.release_date || content.first_air_date}</p>
      <p>Rating: {content.vote_average}</p>
      <img src={`https://image.tmdb.org/t/p/w500${content.poster_path}`} alt={content.title || content.name} />
      {trailer ? (
        <div className="trailer">
          <h3>Trailer</h3>
          <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${trailer.key}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      ) : (
        <p>No trailer available</p>
      )}
    </div>
  );
};

export default MovieDetail;
