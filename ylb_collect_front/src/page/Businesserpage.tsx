import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './Businesserpage.css';
import SlideAnimation from '../bussinesserpage/loginslideanime';
import LoginButton from '../bussinesserpage/Lineloginbutton';
import AboutNFT from '../bussinesserpage/aboutNFT';
import reportWebVitals from '../reportWebVitals';
import Indexheader from '../bussinesserpage/loginheader';
import Feature from '../bussinesserpage/FeatureService';
import Loadmap from '../bussinesserpage/Loadmap'
import Bussinesspagefooter from '../bussinesserpage/loginfooter'


class Bussineserpage extends React.Component {
  render() {
    return (
      <div>
        <Indexheader />
        <SlideAnimation />
        <LoginButton />
        <AboutNFT />
        <Feature />
        <Loadmap />
        <Bussinesspagefooter />
      </div>
    );
  }
}

export default Bussineserpage;
/*
ReactDOM.render(
  <React.StrictMode>
    <Indexheader />
    <SlideAnimation />
    <LoginButton />
    <AboutNFT />
    <Feature />
    <Loadmap />
    <Bussinesspagefooter />
  </React.StrictMode>,
  document.getElementById('root')
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();*/
