import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEgg } from "@fortawesome/free-solid-svg-icons";
import './loginfooter.css';

const iconStyle: React.CSSProperties = { padding: 10, fontSize: 25, color: 'grey' };


function AppFooter() {

  return (
    <footer className="footer">
      <hr className='footerline' />
      <div className='corporatename'><FontAwesomeIcon style={iconStyle} icon={faEgg} /><p className='corporatenametxt'>YLB</p></div>
      <div className="reserved">- YLB LLC.All Right Reserveed -</div>
    </footer>
  );
}

export default AppFooter;
