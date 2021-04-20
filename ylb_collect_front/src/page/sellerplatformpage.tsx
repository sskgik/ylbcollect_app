import React, { useState, useEffect } from 'react';
import './sellerplatformpage.css';
import Sellerplatformheader from '../sellerplatform/sellerplatformheader';
import Sellerplatformbody from '../sellerplatform/sellerplatformmarketplace'


class Userplatformpage extends React.Component {
  render() {
    return (
      <div>
        <Sellerplatformheader />
        <Sellerplatformbody />
      </div>
    );
  }
}

export default Userplatformpage;





// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
