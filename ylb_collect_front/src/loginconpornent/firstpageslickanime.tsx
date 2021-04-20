import React, { Component } from 'react';
import Slider from "react-slick";
import './firstpageslickanime.css';


function FirstSlick() {

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear"
  };
  return (
    <div className="slickbody">
      <Slider className="slider" {...settings}>
        <div>
          <button className='NFTcard'></button>
        </div>
        <div>
          <button className='NFTARcard'></button>
        </div>
        <div>
          <button className='NFTmovie'></button>
        </div>
        <div>
          <button className='NFTvoice'></button>
        </div>
        <div>
          <button className='NFTticket'></button>
        </div>
        <div>
          <button className='NFTcontract'></button>
        </div>
      </Slider>
    </div>
  );
}


export default FirstSlick;
