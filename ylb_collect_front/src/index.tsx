import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Loginfront from './page/loginfrontpage';
import Bussinesspage from './page/Businesserpage';
import Information from './page/Informationpage';
import Userplatform from './page/userplatformpage';
import Sellerplatform from './page/sellerplatformpage';
import UserHelp from './page/userhelppage';
import SellerHelp from './page/sellerhelppage'
import "../node_modules/slick-carousel/slick/slick.css";
import "../node_modules/slick-carousel/slick/slick-theme.css";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route exact path='/' component={Loginfront} />  {/*userlogin*/}
      <Route exact path='/bussiness' component={Bussinesspage} />  {/*sellerlogin*/}
      <Route exact path='/infomation' component={Information} />   {/*Infomation*/}
      <Route exact path='/userplatform' component={Userplatform} />  {/*Userplatform*/}
      <Route exact path='/sellerplatform' component={Sellerplatform} />  {/*sellerlatform*/}
      <Route exact path='/userplatform/userhelp' component={UserHelp} /> {/*Userplatform*/}
      <Route exact path='/sellerplatform/sellerhelp' component={SellerHelp} /> {/*sellerplatform*/}

      {/*外部リンク*/}
      {/*LINE Blockchainについて*/}
      <Route path='/lineblockchain' component={() => {
        window.location.href = 'https://linecorp.com/ja/pr/news/ja/2020/3439';
        return null;
      }} />
      {/*YLBCollect公式オープンチャット*/}
      <Route path='/openchat' component={() => {
        window.location.href = 'https://line.me/ti/g2/g10NN1gnEjKgVUjYtmneIQ?utm_source=invitation&utm_medium=link_copy&utm_campaign=default';
        return null;
      }} />
      {/*問合せリンク*/}
      <Route path='/question' component={() => {
        window.location.href = 'https://docs.google.com/forms/d/e/1FAIpQLSdQfgI8LHt33e0wZRKBQaPnWwrmmf_iqy7d4nDdGrycbPoCKw/viewform?usp=sf_link';
        return null;
      }} />
      {/*Bitmacの使用方法関連*/}
      <Route path='/bitmaxwalletinfo' component={() => {
        window.location.href = 'https://note.com/line_blockchain/m/m04f98b2a286b';
        return null;
      }} />
      {/*BITMAXウォレット*/}
      <Route path='/bitmaxwallet' component={() => {
        window.location.href = 'https://wallet.bitmax.me';
        return null;
      }} />
      {/*LINKブロックチェーンエクスプローラー */}
      <Route path='/explorer' component={() => {
        window.location.href = 'https://explorer.blockchain.line.me/daphne';
        return null;
      }} />
      {/*LINKリワード プログラムについて*/}
      <Route path='/linkreword' component={() => {
        window.location.href = 'https://note.com/line_blockchain/n/nbdce982d2888';
        return null;
      }} />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);

/*
ReactDOM.render(
  <React.StrictMode>
    <Header1 />

  </React.StrictMode>,
  document.getElementById('root')
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();*/
