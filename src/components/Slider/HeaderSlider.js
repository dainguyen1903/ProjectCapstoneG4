import React from "react";
import "./HeaderSlider.scss";
import { sliderImgs } from "../../utils/images";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HeaderSlider = ({images}) => {
  let settings = {
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    
    
  };

  return (
    <div className="slider">
      <div className="container">
        <div className="slider-content overflow-x-hidden">
          <Slider {...settings}>
            {images.map((image) => (
              <div style={{
                objectFit:"contain"
              }} className="slider-item">
                <img style={{
                  objectFit:"contain"
                }} src={image} alt="" />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default HeaderSlider;
