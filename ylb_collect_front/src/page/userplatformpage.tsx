import React, { useState, useEffect } from 'react';
import './userplatformpage.css';
import Userplatformheader from '../userplatform/userplatformheader';
import Userplatformtopslick from '../userplatform/userplatformtopslick';
import Userplatformmerketplace from '../userplatform/userplatformmarketplace'



class Userplatformpage extends React.Component {
  render() {
    return (
      <div>
        <Userplatformheader />
        <Userplatformtopslick />
        <Userplatformmerketplace />
      </div>
    );
  }
}

export default Userplatformpage;





// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
