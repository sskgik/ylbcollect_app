import React, { useState } from 'react'
import LINE_Base from '../bussinesserpage/LINE_Base.svg'
import './firstpageloginbutton.css'

function Firstlogin() {
  return (
    <div className="Loginbody">
      <div className="wrapper">
        <div className="line line1">
          <span className="circle circle-top"></span>
          <div className="dotted">
            <span className="dot dot-top"></span>
            <span className="dot dot-middle-top"></span>
            <span className="dot dot-middle-bottom"></span>
            <span className="dot dot-bottom"></span>
          </div>
          <span className="circle circle-bottom"></span>
        </div>
        <div className="line line2">
          <span className="circle circle-top"></span>
          <div className="dotted">
            <span className="dot dot-top"></span>
            <span className="dot dot-middle-top"></span>
            <span className="dot dot-middle-bottom"></span>
            <span className="dot dot-bottom"></span>
          </div>
          <span className="circle circle-bottom"></span>
        </div>
        <div className="line line3">
          <span className="circle circle-top"></span>
          <div className="dotted">
            <span className="dot dot-top"></span>
            <span className="dot dot-middle-top"></span>
            <span className="dot dot-middle-bottom"></span>
            <span className="dot dot-bottom"></span>
          </div>
          <span className="circle circle-bottom"></span>
        </div>
        <div className="line line4">
          <span className="circle circle-top"></span>
          <div className="dotted">
            <span className="dot dot-top"></span>
            <span className="dot dot-middle-top"></span>
            <span className="dot dot-middle-bottom"></span>
            <span className="dot dot-bottom"></span>
          </div>
          <span className="circle circle-bottom"></span>
        </div>
        <div className="line line5">
          <span className="circle circle-top"></span>
          <div className="dotted">
            <span className="dot dot-top"></span>
            <span className="dot dot-middle-top"></span>
            <span className="dot dot-middle-bottom"></span>
            <span className="dot dot-bottom"></span>
          </div>
          <span className="circle circle-bottom"></span>
        </div>
        <div className="line line6">
          <span className="circle circle-top"></span>
          <div className="dotted">
            <span className="dot dot-top"></span>
            <span className="dot dot-middle-top"></span>
            <span className="dot dot-middle-bottom"></span>
            <span className="dot dot-bottom"></span>
          </div>
          <span className="circle circle-bottom"></span>
        </div>
        <div className="line line7">
          <span className="circle circle-top"></span>
          <div className="dotted">
            <span className="dot dot-top"></span>
            <span className="dot dot-middle-top"></span>
            <span className="dot dot-middle-bottom"></span>
            <span className="dot dot-bottom"></span>
          </div>
          <span className="circle circle-bottom"></span>
        </div>
        <div className="line line8">
          <span className="circle circle-top"></span>
          <div className="dotted">
            <span className="dot dot-top"></span>
            <span className="dot dot-middle-top"></span>
            <span className="dot dot-middle-bottom"></span>
            <span className="dot dot-bottom"></span>
          </div>
          <span className="circle circle-bottom"></span>
        </div>
        <div className="line line9">
          <span className="circle circle-top"></span>
          <div className="dotted">
            <span className="dot dot-top"></span>
            <span className="dot dot-middle-top"></span>
            <span className="dot dot-middle-bottom"></span>
            <span className="dot dot-bottom"></span>
          </div>
          <span className="circle circle-bottom"></span>
        </div>
        <div className="line line10">
          <span className="circle circle-top"></span>
          <div className="dotted">
            <span className="dot dot-top"></span>
            <span className="dot dot-middle-top"></span>
            <span className="dot dot-middle-bottom"></span>
            <span className="dot dot-bottom"></span>
          </div>
          <span className="circle circle-bottom"></span>
        </div>
        <div className="line line11">
          <span className="circle circle-top"></span>
          <div className="dotted">
            <span className="dot dot-top"></span>
            <span className="dot dot-middle-top"></span>
            <span className="dot dot-middle-bottom"></span>
            <span className="dot dot-bottom"></span>
          </div>
          <span className="circle circle-bottom"></span>
        </div>
      </div>
      <div className="loginbuttonanime">
        <h1>新たな価値の収集を！はじめよう！</h1>
        <h1>YLB Collect</h1>
        <p>~for LINE Blockchain~</p>
        <div>
          <img src={LINE_Base} className="LINE-Base-logo" alt="LINElogo" />
          <button className="LINE_Button" type="button" onClick={loginauth} name="loginbottun">Line Login</button>
        </div>
      </div>
    </div>
  );
}

export default Firstlogin;
//buyeruserlogin url(http://localhost:3080/login?usertype=buyer)
function loginauth() {
  let logininfo = sessionStorage.getItem('Userinfo')
  if (logininfo == null) {
    window.location.href = 'http://localhost:3080/login?usertype=buyer'
  }
  else {
    let logininfoJSON: any = JSON.parse(logininfo)
    if (logininfoJSON.UserIcon != '' && logininfoJSON.Username != '' && logininfoJSON.UserID != '') {
      window.location.href = 'http://localhost:3000/userplatform'
    } else {
      window.location.href = 'http://localhost:3080/login?usertype=buyer'
    }
  }
}