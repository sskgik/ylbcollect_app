import React, { useState, useEffect } from 'react';
import Infoheader from '../Information/Infoheader'
import Infobody from '../Information/infobody'
import './Infomationpage.css';



class loginfrontpage extends React.Component {
  render() {
    return (
      <div>
        <Infoheader />
        <Infobody />
      </div>
    );
  }
}

export default loginfrontpage;





// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
