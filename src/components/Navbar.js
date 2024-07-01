// src/components/Navbar.js
import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './css/Navbar.css';
import logo from './assets/logo.png';
import '@fortawesome/fontawesome-free/css/all.min.css';


const Navbar = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query) {
      navigate(`/search?query=${query}`);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <NavLink to="/" exact activeClassName="active-link">
          <img src={logo} alt="MyMovieApp Logo" className="logo" />
        </NavLink>
      </div>
      <div className="navbar-links">
        <NavLink to="/" exact activeClassName="active-link">Home</NavLink>
        <NavLink to="/movies" activeClassName="active-link">Movies</NavLink>
        <NavLink to="/series" activeClassName="active-link">Series</NavLink>
      </div>
      <div className="navbar-search">
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-button">
            <i className="fas fa-search"></i>
          </button>
        </form>
      </div>
    </nav>
  );
};

export default Navbar;
