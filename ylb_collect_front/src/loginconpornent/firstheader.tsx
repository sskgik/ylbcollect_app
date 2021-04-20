import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import QRcode from '../bussinesserpage/QRcode.svg'
import './firstheader.css';

const iconStyle: React.CSSProperties = { padding: 10, fontSize: 50, color: 'grey' };


function FirstHeader() {
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

  return (
    <header className="header">
      <div><Link className='Logotxt' to={'/'}>YLB Collect</Link></div>
      <div className='logintext' onClick={loginauth}>ログイン</div>
      <div className='bussinessownerpage'>
        <button className='icon' onClick={openFunc}><FontAwesomeIcon style={iconStyle} icon={faBars} /></button>
        <nav className={`listmenu ${open && "open"} ${close && "close"} `}>
          <button className='backbutton' onClick={closeFunc}><FontAwesomeIcon style={iconStyle} icon={faTimesCircle} /></button>
          <ul>
            <li ><Link className="liststyle" to={'/bussiness'}>事業者の方はこちら</Link></li>
            <li ><Link className="liststyle" target='_blank' to={'/lineblockchain'}>LINE Blockchainについて</Link></li>
            <li ><Link className="liststyle" to={'/infomation'}>お知らせ</Link></li>
            <li ><Link className="liststyle" target='_blank' to={'/question'}>サービスへの問合せ</Link></li>
          </ul>
          <hr className='slidemenuhr' />
          <img src={QRcode} className="openchatQR1" alt="QRcode" />
          <div ><Link className='fOpenchatinvitetxt' target='_blank' to={'/openchat'}>公式オープンチャットはこちら</Link></div>
        </nav>
      </div>
    </header>
  );
}

export default FirstHeader;
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