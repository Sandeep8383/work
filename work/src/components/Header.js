// Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; 

const Header = () => {
  return (
    <header className="header">
      <div className="line-above-navbar"></div> {/* Line separating navbar from content below */}
      <div className="nav-area">
        <Link to="/" className="logo">
          <b>EVENT</b>URE
        </Link>
      </div>
    </header>
  );
};

export default Header;