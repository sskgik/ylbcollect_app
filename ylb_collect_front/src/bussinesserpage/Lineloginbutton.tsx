import React from 'react';
import LINE_Base from './LINE_Base.svg';
import './Lineloginbutton.css';
import axios from 'axios';
import { info } from 'console';

function LoginButton() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Let's Start Sell your NFT for Only Value<br></br>
                  ~With LINE Blockchain~
        </p>
        <div className="Loginbutton">
          <img src={LINE_Base} className="LINE-Base-logo" alt="LINElogo" />
          <button className="LINE_Button" type="button" onClick={loginauth} name="loginbottun">Line Login</button>
        </div>
      </header>
    </div>
  );
}


export default LoginButton;

//selleruserlogin url(http://localhost:3080/login?usertype=seller)
function loginauth() {
  let logininfo = sessionStorage.getItem('Userinfo')
  if (logininfo == null) {
    window.location.href = 'http://localhost:3080/login?usertype=seller'
  }
  else {
    let logininfoJSON: any = JSON.parse(logininfo)
    if (logininfoJSON.UserIcon != '' && logininfoJSON.Username != '' && logininfoJSON.UserID != '') {
      window.location.href = 'http://localhost:3000/sellerplatform'
    } else {
      window.location.href = 'http://localhost:3080/login?usertype=seller'
    }
  }
}
