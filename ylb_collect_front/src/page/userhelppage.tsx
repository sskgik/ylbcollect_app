import React, { useState, useEffect } from 'react';
import './userhelppage.css';
import UserHelp from '../help/userhelp';




class Userplatformpage extends React.Component {
  render() {
    return (
      <div>
        <UserHelp />
      </div>
    );
  }
}

export default Userplatformpage;





// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
