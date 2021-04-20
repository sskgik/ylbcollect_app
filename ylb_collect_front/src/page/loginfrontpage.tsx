import React, { useState, useEffect } from 'react';
import './loginfrontpage.css';
import Indexheader from '../loginconpornent/firstheader';
import Firstlogin from '../loginconpornent/firstpageloginbutton'
import FirstSlick from '../loginconpornent/firstpageslickanime'


class loginfrontpage extends React.Component {
  render() {
    return (
      <div>
        <Indexheader />
        <Firstlogin />
        <FirstSlick />
      </div>
    );
  }
}

export default loginfrontpage;





// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
