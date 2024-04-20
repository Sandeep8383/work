// Carousel.js
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Carousel.css";
import Slide1 from "../image/1.1.jpg";
import Slide2 from "../image/3.jpg";
import Slide3 from "../image/9.jpg";

const Carousel = () => {
  const settings = {
    className: "slider-container",
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  return (
    <Slider {...settings} className="carousel">
      <div>
        <img src={Slide1} alt="Slide 1" />
        <div className="caption">
          <h4 style={{ textAlign: "end" }}>The Grand Lily Resorts</h4>
          <p style={{ textAlign: "end" }}>Jalandhar, India</p>
        </div>
      </div>
      <div>
        <img src={Slide2} alt="Slide 2" />
        <div className="caption">
          <h4 style={{ textAlign: "end" }}>The Cabbana Resort & Spa</h4>
          <p style={{ textAlign: "end" }}>Phagwara, India</p>
        </div>
      </div>
      <div>
        <img src={Slide3} alt="Slide 3" />
        <div className="caption">
          <h4 style={{ textAlign: "end" }}>Best Western Plus</h4>
          <p style={{ textAlign: "end" }}>Jalandhar, India</p>
        </div>
      </div>
    </Slider>
  );
};

export default Carousel;
