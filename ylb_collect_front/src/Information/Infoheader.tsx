import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import './Infoheader.css';

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
      <div className='Infomationpage'>
        <button className='icon' onClick={openFunc}><FontAwesomeIcon style={iconStyle} icon={faBars} /></button>
        <nav className={`listmenu ${open && "open"} ${close && "close"} `}>
          <button className='backbutton' onClick={closeFunc}><FontAwesomeIcon style={iconStyle} icon={faTimesCircle} /></button>
          <ul>
            <li ><Link className="liststyle" to={'/'}>ログインページ</Link></li>
            <li ><Link className="liststyle" to={'/bussiness'}>事業者の方はこちら</Link></li>
            <li className="liststyle"><a>お知らせ</a></li>
            <li ><Link className="liststyle" target='_blank' to={'/question'}>サービスへの問合せ</Link></li>
          </ul>
          <hr className='slidemenuhr' />
        </nav>
      </div>
    </header>
  );
}

export default FirstHeader;
