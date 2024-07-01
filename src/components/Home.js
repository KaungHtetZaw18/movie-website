import React from 'react';
import './css/Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <h2>Welcome to MyMovieApp</h2>
      <p>Discover the latest movies, series, and trailers. Your one-stop destination for all things movies!</p>
      <div className="home-content">
        <section className="intro">
          <h3>Explore Our Collection</h3>
          <p>Browse through our extensive collection of movies and series. Find details, watch trailers, and read reviews.</p>
        </section>
        <section className="features">
          <h3>Features</h3>
          <ul>
            <li>Search for movies and series</li>
            <li>View detailed information about each title</li>
            <li>Watch trailers and read reviews</li>
            <li>Create and manage your watchlist</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default Home;
