import React, { Component } from 'react'
import Slider from "react-slick";
import './userplatformtopslick.css'

function Userplatformtopslick() {
  const settings = {
    dots: false,
    fade: true,
    infinite: false,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    cssEase: "linear"
  };
  return (
    <div className='imageslickbody'>
      <Slider {...settings}>
        <div className='imgarea'>
          <div className="image1" ></div>
        </div>
        <div className='imgarea'>
          <div className="image2" ></div>
        </div>
        <div className='imgarea'>
          <div className="image3" ></div>
        </div>
        <div className='imgarea'>
          <div className="image4" ></div>
        </div>
        <div className='imgareatext'>
          <h1 className='userformslicktxt'>
            ブロックチェーンNFTコレクション！<br></br><br></br>知的財産コンテンツの専有！<br></br><br></br>唯一無二の守られた価値を！
          </h1>
        </div>
      </Slider>
    </div>
  );
}

export default Userplatformtopslick;
