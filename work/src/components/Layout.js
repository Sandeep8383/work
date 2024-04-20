// Layout.js

import React from "react";
import Navbar from "./Navbar"; // Import your Navbar component
import Carousel from "./Carousel"; // Import your Carousel component
import SearchForm from "./SearchForm"; // Import your SearchForm component
import "./Carousel.css";
import "./SearchForm.css"; // Import your SearchForm CSS file

const Layout = () => {
  return (
    <div
      style={{
        position: "relative",
        height: "100%",
        minHeight: "100vh",
        backgroundColor: "black",
        color: "white",
      }}
    >
      <Navbar logo="EVENTURE" />
      <div className="carousel-container">
        <Carousel />
        <div className="search-form-overlay">
          <SearchForm />
        </div>
      </div>
      <div className="eventure-title">
        <h1>Where Every Moment</h1>
        <h1>Finds Its Perfect Venue.</h1>
      </div>
    </div>
  );
};

export default Layout;
