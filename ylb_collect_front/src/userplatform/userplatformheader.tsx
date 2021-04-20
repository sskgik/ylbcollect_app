import React, { ReactElement, useState } from 'react';
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import './userplatformheader.css';
//import { render } from '@testing-library/react';

const iconStyle: React.CSSProperties = { padding: 10, fontSize: 40, color: 'grey' };

function UserplatformHeader() {

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
    <header className="headeruser" >
      <div ><Link className='Logotxt' to={'/'}>YLB Collect</Link></div>
      <div className="unavmenu">
        <button className='usericon' onClick={openFunc}><FontAwesomeIcon style={iconStyle} icon={faUser} /></button>
        <nav className={`ulistmenu ${open && "useropen"} ${close && "userclose"} `}>
          <button className='backbutton' onClick={closeFunc}><FontAwesomeIcon style={iconStyle} icon={faTimesCircle} /></button>
          <div className='userinfo'>
            {
              userinfomation
            }
          </div>
          <hr className='slidemenuhr' />
          <ul>
            <li ><Link className="liststyle" to={'/sellerplatform'}>販売者ページへ</Link></li>
            <li ><Link className="liststyle" to={'/infomation'}>お知らせ</Link></li>
            <li ><Link className="liststyle" target='_blank' to={'/question'}>サービスへの問合せ</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default UserplatformHeader;

//buyeruserlogin url(http://localhost:3080/login?usertype=buyer)
function loginauth() {
  window.location.href = 'http://localhost:3080/login?usertype=buyer'
}

//logput  function
function logout() {
  sessionStorage.removeItem('Userinfo');
  window.location.href = "http://localhost:3080/logout";
}

//Userinfo get JSX from session 
window.onload = () => {
  //json initiarize
  var userinfo = {
    UserIcon: '',
    Username: '',
    UserID: ''
  };
  axios.get("http://localhost:3080/user",
    {
      withCredentials: true   //coolie共有
    }).then(function (user) {
      let UserPicture: string = user.data.picture;
      let Username: string = user.data.disp_name;
      let UserID: string = user.data.user_id;
      userinfo["UserIcon"] = UserPicture;
      userinfo["Username"] = Username;
      userinfo["UserID"] = UserID;
      sessionStorage.setItem('Userinfo', JSON.stringify(userinfo));
    }).catch(function (error) {
      let UserPicture: string = "";
      let Username: string = "";
      let UserID: string = "";
      userinfo["UserIcon"] = UserPicture;
      userinfo["Username"] = Username;
      userinfo["UserID"] = UserID;
      sessionStorage.setItem('Userinfo', JSON.stringify(userinfo));
    })
}

//User infomation rendering
const getuserinfo = () => {
  var json: any = sessionStorage.getItem('Userinfo')
  var userinfo: any = JSON.parse(json)
  if (userinfo == null) {
    userinfo = {
      UserIcon: '',
      Username: '',
      UserID: ''
    };
  }
  let UserIcon: string = userinfo.UserIcon;
  var UserImageStyle = {
    width: "100px",
    height: "100px",
    border: "none",
    borderRadius: "100%",
    backgroundImage: `url(${UserIcon})`,
    backgroundSize: "100px 100px",
    zindex: '10'
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
