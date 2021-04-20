import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import QRcode from './QRcode.svg';
import './loginheader.css';

const iconStyle: React.CSSProperties = { padding: 10, fontSize: 50, color: 'grey' };


function AppHeader() {

  const [open, setOpen] = useState(false);
  const [close, setClose] = useState(false);
  const openFunc = () => {
    setOpen(true);
    setClose(false);
  };
  const closeFunc = () => {
    setOpen(false);
    setClose(true);
  };
  const userinfomation = getuserinfo();
  return (
    <header className="header">
      <div ><Link className='Logotxt' to={'/'}>YLB Collect</Link></div>
      <div className='logintext' onClick={loginauth}>ログイン</div>
      <div className="flexset">
        <button className='icon' onClick={openFunc}><FontAwesomeIcon style={iconStyle} icon={faBars} /></button>
        <nav className={`blistmenu ${open && "bopen"} ${close && "bclose"} `}>
          <button className='backbutton' onClick={closeFunc}><FontAwesomeIcon style={iconStyle} icon={faTimesCircle} /></button>
          <div className='userinfo'>
            {
              userinfomation
            }
          </div>
          <hr className='slidemenuhr' />
          <ul>
            <li className="liststyle"><a>NFTを販売する</a></li>
            <li ><Link className="liststyle" target='_blank' to={'/lineblockchain'}>LINE Blockchainについて</Link></li>
            <li ><Link className="liststyle" to={'/infomation'}>お知らせ</Link></li>
            <li ><Link className="liststyle" target='_blank' to={'/question'}>サービスへの問合せ</Link></li>
          </ul>
          <img src={QRcode} className="openchatQR" alt="QRcode" />
          <div ><Link className='bOpenchatinvitetxt' target='_blank' to={'/openchat'}>公式オープンチャットはこちら</Link></div>
        </nav>
      </div>
    </header>
  );
}

export default AppHeader;
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

//logput  function
function logout() {
  sessionStorage.removeItem('Userinfo');
  window.location.href = "http://localhost:3080/logout";
}

//Userinfomation
const getuserinfo = () => {
  var json: any = sessionStorage.getItem('Userinfo')
  var userinfo: any = JSON.parse(json)
  let UserIcon: string = userinfo.UserIcon;
  var UserImageStyle = {
    width: "100px",
    height: "100px",
    border: "none",
    borderRadius: "100%",
    backgroundImage: `url(${UserIcon})`,
    backgroundSize: "100px 100px",
  };
  if (userinfo.UserIcon != '' && userinfo.Username != '' && userinfo.UserID != '') {
    return (
      <div>
        <div className='userIcon' style={UserImageStyle}></div>
        <div className='userName' >{userinfo.Username}</div>
        <div className='userID' >{userinfo.UserID}</div>
        <div className='logout' onClick={logout}>Logout</div>
      </div>
    )
  } else {
    return (
      <div>
        <div className='nologin' >Login情報がありません<br></br>ログインしてください</div>
        <div className='login' onClick={loginauth}>ログイン</div>
      </div>
    );
  }
}