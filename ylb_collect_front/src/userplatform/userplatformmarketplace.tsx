import React, { Component, useEffect, useState, Fragment } from 'react';
import { createGlobalState } from 'react-hooks-global-state';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { sha512 } from 'js-sha512';
import { Buffer } from 'buffer';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { faBrush } from "@fortawesome/free-solid-svg-icons";
import { faPortrait } from "@fortawesome/free-solid-svg-icons";
import { faTicketAlt } from "@fortawesome/free-solid-svg-icons";
import { faHeadset } from "@fortawesome/free-solid-svg-icons";
import { faFilm } from "@fortawesome/free-solid-svg-icons";
import { faQuestion } from "@fortawesome/free-solid-svg-icons";
import { faGem } from "@fortawesome/free-solid-svg-icons";
import { faCartArrowDown } from "@fortawesome/free-solid-svg-icons";
import { faClipboardList } from "@fortawesome/free-solid-svg-icons";
import { faUserFriends } from "@fortawesome/free-solid-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import Basketstepers from './Basketbody'
import './userplatformmarketplace.css'
import './userplatformscreenCSS/UserTransactionHystory.css'
import './userplatformscreenCSS/NFTmarketplasescreen.css'
import './userplatformscreenCSS/NFTShopingbasket.css'
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';



const iconStyle: React.CSSProperties = { padding: 10, fontSize: 30, color: 'rgb(255, 4, 242)' };
const Collection: React.CSSProperties = { paddingTop: 10, paddingBottom: 10, paddingLeft: 12, paddingRight: 14, fontSize: 20, color: 'black' };//Collection
const Cart: React.CSSProperties = { paddingTop: 10, paddingBottom: 10, paddingLeft: 10, paddingRight: 16, fontSize: 20, color: 'black' };//Cart
const Parchaiserecept: React.CSSProperties = { paddingTop: 10, paddingBottom: 10, paddingLeft: 15, paddingRight: 18, fontSize: 20, color: 'black' };//Parchaiserecept
const iconStyle4: React.CSSProperties = { paddingTop: 10, paddingBottom: 10, paddingLeft: 10, paddingRight: 15, fontSize: 18, color: 'black' }; //group
const iconStyle5: React.CSSProperties = { paddingTop: 10, paddingBottom: 10, paddingLeft: 14, paddingRight: 18, fontSize: 20, color: 'black' };//question
const Searchbutton: React.CSSProperties = { paddingTop: 2, paddingBottom: 0, paddingLeft: 10, paddingRight: 10, fontSize: 20 };//Searchbutton
const Modalclose: React.CSSProperties = { paddingTop: 2, paddingBottom: 0, paddingLeft: 10, paddingRight: 10, fontSize: 20 };//Modalclosebutton
const TxCopyButton: React.CSSProperties = { paddingLeft: 5, paddingRight: 5, fontSize: 20 };//TxhashCopybutton
const _sleep = (ms: any) => new Promise((resolve) => setTimeout(resolve, ms));//sleep処理

//Globalstate
const initialState = {
  NFTtype: 'Tradecard',
};
const { useGlobalState } = createGlobalState(initialState);

function Userplatformmerketplace() {
  const [NFTphotpsellpage, setNFTphotpsell] = useState(false);
  const [NFTillustrationsellpage, setNFTillustrationsell] = useState(false);
  const [NFTtradecardsellpage, setNFTtradecardsell] = useState(false);
  const [ParchaiseCartpage, setParchaiseCart] = useState(false);
  const [PurchaseHistorypage, setPurchaseHistory] = useState(false);
  const [NFTtype, setNFTtype] = useGlobalState('NFTtype');
  const openNFTphotosellpage = () => {
    setNFTtype('photo')
    setNFTillustrationsell(true)
    setNFTtradecardsell(false)
    setParchaiseCart(false);
    setPurchaseHistory(false);
  }
  const openNFTillustrationsellpage = () => {
    setNFTtype('Illustration')
    setNFTillustrationsell(true)
    setNFTtradecardsell(false)
    setParchaiseCart(false);
    setPurchaseHistory(false);
  }
  const openNFTtradecardsellpage = () => {
    setNFTtype('Tradecard')
    setNFTillustrationsell(false)
    setNFTtradecardsell(true)
    setParchaiseCart(false);
    setPurchaseHistory(false);
  };
  const openParchaiseCartpage = () => {
    setNFTillustrationsell(false)
    setNFTtradecardsell(false)
    setParchaiseCart(true);
    setPurchaseHistory(false);
  };
  const openPurchaseHistorypage = () => {
    setNFTillustrationsell(false)
    setNFTtradecardsell(false)
    setParchaiseCart(false);
    setPurchaseHistory(true);
  };

  var rendorelement;
  if (NFTphotpsellpage == false && NFTillustrationsellpage == false && NFTtradecardsellpage == false && ParchaiseCartpage == false && PurchaseHistorypage == false) {
    rendorelement = <NFTlist />
  } else if (NFTphotpsellpage == true) {
    rendorelement = <NFTlist />
  } else if (NFTillustrationsellpage == true) {
    rendorelement = <NFTlist />
  } else if (NFTtradecardsellpage == true) {
    rendorelement = <NFTlist />
  } else if (ParchaiseCartpage == true) {
    rendorelement = <Basketstepers />
  } else if (PurchaseHistorypage == true) {
    rendorelement = <ParchaiseHistory />
  } else {
    rendorelement = <NFTlist />
  }

  return (
    <div className='merketplacebody'>
      <div className='merketplaceheader'>
        <div className='merketplaceheaderinner'>
          <div className='merketpaleceNFT ' onClick={openNFTphotosellpage}><FontAwesomeIcon style={iconStyle} icon={faImage} />フォトNFT</div>
          <div className='merketpaleceNFT ' onClick={openNFTillustrationsellpage}><FontAwesomeIcon style={iconStyle} icon={faBrush} />イラストNFT</div>
          <div className='merketpaleceNFT ' onClick={openNFTtradecardsellpage}><FontAwesomeIcon style={iconStyle} icon={faPortrait} />NFTトレカ</div>
          <div className='merketpaleceNFT yet'><FontAwesomeIcon style={iconStyle} icon={faTicketAlt} />NFTチケット</div>
          <div className='merketpaleceNFT yet'><FontAwesomeIcon style={iconStyle} icon={faQuestion} />Secret</div>
          <div className='merketpaleceNFT yet'><FontAwesomeIcon style={iconStyle} icon={faHeadset} />NFT music</div>
          <div className='merketpaleceNFT yet'><FontAwesomeIcon style={iconStyle} icon={faFilm} />NFT movie</div>
        </div>
      </div>
      <div className='Flexpositon'>
        <div className='usersidemenu'>
          <div className='sidemenutxtpos'>
            <p className='buytxt'>買う</p>
            <div className='userChoisesmenu'>
              <a className='userChoices' onClick={openParchaiseCartpage}><FontAwesomeIcon style={Cart} icon={faCartArrowDown} />買い物カゴ</a>
              <a className='userChoices' onClick={openPurchaseHistorypage}><FontAwesomeIcon style={Parchaiserecept} icon={faClipboardList} />購入履歴</a>
              <div ><Link className='userChoices' target='_blank' to={'/bitmaxwallet'}><FontAwesomeIcon style={Collection} icon={faGem} />Your Collection</Link></div>
              <div ><Link className='userChoices' target='_blank' to={'/openchat'}><FontAwesomeIcon style={iconStyle4} icon={faUserFriends} />公式オープンチャットへ</Link></div>
              <div><Link className='userChoices' target='_blank' to={'/question'}><FontAwesomeIcon style={iconStyle5} icon={faQuestion} />お問い合わせ</Link></div>
            </div>
          </div>
          <hr className='sidemenuhr' />
          <div className='sideinfomenupos'>
            <p className='Headingtxt'>お知らせ</p>
            <div className='usermerketinfomenu'>
              <a className='usermerketinfo'>2021年4月LINEブロックチェーンを用いた国内初のNFTマーケットプレース~YLB Collectリリース~</a>
            </div>
          </div>
          <hr className='sidemenuhr' />
          <div ><Link className='userhelpmenu' to={'/userplatform/userhelp'}>ヘルプ</Link></div>
        </div>
        <div className='usermerketplacemainbody'>
          {rendorelement}
          {/*ここに条件付きレンダーのfunctionをヘッダーに合わせて描きだす処理 */}
        </div>
      </div>
    </div>

  );
}

export default Userplatformmerketplace;



const NFTlist = () => {
  const [MarketplaceData, setMarketplaceData] = useState([])
  const [Confirmshow, setConfirmShow] = useState(false)
  const [CreatAleMessage, setCreatAleMessage] = useState(false)
  const [elementnum, setElementnum] = useState(0)
  const [showpage, setshowpage] = useState(1)
  const [NFTtype, setNFTtype] = useGlobalState('NFTtype');
  console.log(NFTtype)
  //Confirm用Stateの更新
  const changeConfirmstate = (value: any) => {
    setConfirmShow(true)
    setCreatAleMessage(false)
    setElementnum(value)
  };
  //CreateLetter用の
  const changeCreateMessagestate = (value: any) => {
    setConfirmShow(false)
    setCreatAleMessage(true)
    setElementnum(value)
  };
  //レンダーページ変換
  const changestate = (number: number) => {
    console.log(number)
    setshowpage(number)
  }
  //rendering時にRDBより取得
  useEffect(() => {
    Getmarketplacedata()
  }, [])

  //RDBからマーケットプレースデータの取得
  function Getmarketplacedata() {
    const requesturl = 'http://localhost:3080/getmarketplacedata'
    axios.get(requesturl,
      {
        withCredentials: true   //coolie共有
      }).then(function (result) {
        const marketdata = result.data
        setMarketplaceData(marketdata)
      }).catch(function (error) {
        console.log(error)
        alert('マーケットプレースデータ取得に失敗しました！ページの再表示してください')
      })
  }

  const Marketplacelistfunc = (Marketplacelist: any) => {
    var i: number
    var MarketplaceNFTlist = []
    const User: any = sessionStorage.getItem('Userinfo')
    const UserInfo: any = JSON.parse(User)
    var Imageuri = 'https://sskgik.github.io/NFTcard/' //'https://sskgik.github.io/NFTdevelopment/'//
    for (i = 0; i <= Marketplacelist.length - 1; i++) {
      const NFTinfo = Marketplacelist[i]
      if (NFTinfo.NFTType != NFTtype) {
        continue
      }
      var NFTstyle = {
        backgroundPositionX: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '150px 150px',
        backgroundImage: 'url(' + Imageuri + NFTinfo.TokenType + ')',
        color: 'transparent'
      }

      MarketplaceNFTlist.push(
        <div>
          <div className='NFTMarketplaceElement' >
            <div className='NFTTokenName' id={`NFTNameElement` + i}>{NFTinfo.TokenName}</div>
            <div className='NFTmerketprice' ><span>¥</span><div id={`NFTPriceElement` + i}>{NFTinfo.TokenPlice}</div></div>
            <div className={`NFTimageAreahover NFTimageArea fontcolor`} id={`NFTImageElement` + i} style={NFTstyle} onClick={changeCreateMessagestate.bind(this, i)} >{NFTinfo.TokenType}</div>
            <div className="NFTmarketButtonArea">
              <button className={`Tocartbutton`} onClick={Toshoppingcart.bind(
                this, NFTinfo
              )}>カートへ</button>
              <button className={`BuyNFTbutton`} onClick={changeConfirmstate.bind(this, i)} >購入へ</button>
            </div>
            <ToastContainer position="bottom-right" autoClose={1200} hideProgressBar={true} />
            <Finalconfirmation Confirmshow={Confirmshow}
              TokenData={NFTinfo}
              Tokentype={document.getElementById('NFTImageElement' + elementnum)?.innerHTML}
              TokenPlice={document.getElementById('NFTPriceElement' + elementnum)?.innerHTML}
              TokenName={document.getElementById('NFTNameElement' + elementnum)?.innerHTML}
              BuyUserID={UserInfo.UserID}
              setConfirmShow={setConfirmShow}
              setCreatAleMessage={setCreatAleMessage} />
            <CreateNFTLetter CreatAleMessage={CreatAleMessage}
              TokenData={NFTinfo}
              Tokentype={document.getElementById('NFTImageElement' + elementnum)?.innerHTML}
              setConfirmShow={setConfirmShow}
              setCreatAleMessage={setCreatAleMessage} />
          </div>
        </div>
      );
    }
    return MarketplaceNFTlist
  }
  //Page数を表示
  const showpagenumber = (Maxpagenum: any) => {
    var i: any
    var pagenumlist = []
    for (i = 1; i <= Maxpagenum; i++) {
      pagenumlist.push(
        <button className='SellerHystorypagenum' onClick={changestate.bind(this, i)}>{i}</button>
      )
    }
    return pagenumlist
  }

  const MarketplaceNFTlist = Marketplacelistfunc(MarketplaceData)
  const pagedivnumbers = MarketplaceNFTlist.length / 40
  const pagecalctomuch = MarketplaceNFTlist.length % 40
  const pagenumbers = calcpagenumber(pagedivnumbers, pagecalctomuch)
  const pagenumberelment = showpagenumber(pagenumbers)
  return (
    <div className='MerketplaceNFTbody'>
      <h1 className='NFTMerketplaceTitle'>Welcome NFT Marketplace</h1>
      <p className='NFTMerketpaceinfo'>あなたの欲しいNFTデータを選んで購入しましょう！</p>
      <div className='MarketShowpagenumberarea'>{pagenumberelment}</div>
      <div className="MerketplaceNFTList">
        {MarketplaceNFTlist.slice((showpage - 1) * 40, showpage * 40)}
      </div>
      <div className='MarketShowpagenumberarea'>{pagenumberelment}</div>
    </div >
  )
}


//買い物かごに追加
const Toshoppingcart = (TocartElement: any) => {
  toast("買い物カゴに追加しました！")
  const BasketInputInfo = {
    TokenType: TocartElement.TokenType,
    TokenName: TocartElement.TokenName,
    TokenPrice: TocartElement.TokenPlice,
    TokenSeller_UserID: TocartElement.Seller_UserId
  }
  var requestURL = "http://localhost:3080/InputBasket"
  axios.post(requestURL, BasketInputInfo,
    {
      withCredentials: true   //coolie共有
    }).then(function (result) {
      console.log(result)
    }).catch(function (error) {
      console.log(error)
    })
}

//購入前最終確認画面
const Finalconfirmation = (props: any) => {
  const Resetshow = (e: any) => {
    if (e.target === e.currentTarget) {
      //メニューの外側をクリックしたときだけメニューを閉じる
      props.setConfirmShow(false)
      props.setCreatAleMessage(false)
    } else {
      return
    }
  };

  const closemodal = () => {
    props.setConfirmShow(false)
    props.setCreatAleMessage(false)
  }

  var Imageuri = 'https://sskgik.github.io/NFTcard/' //https://sskgik.github.io/NFTdevelopment/'
  var NFTimagestyle = {
    backgroundPositionX: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100% 100%',
    backgroundImage: 'url(' + Imageuri + props.Tokentype + ')'
  }
  if (props.Confirmshow) {
    return (
      <div className="overlay" onClick={(e) => { Resetshow(e); }}>
        <div className="Modal" >
          <div className='headerflex'>
            <div className='Modalheader'>今すぐ購入: {'\t' + props.TokenName}</div>
            <button className='Modalclosebutton' onClick={closemodal}><FontAwesomeIcon style={Modalclose} icon={faTimes} /></button>
          </div>
          <div className='BuyTargetNFTshowArea'>
            <div className='TargetNFTImage' style={NFTimagestyle}></div>
          </div>
          <div className='BuyUserIDArea'>
            <div className='UserIDtitle'>Buyer_UserID</div>
            <div className='UserIDdata'>{props.BuyUserID}</div>
          </div>
          <div className='PaymentlowArea'>
            <div className='Paymentlowtitle'>Payment（支払い方法）</div>
            <div className='Paymentlow'>LINE Pay</div>
          </div>
          <div className='PriceshowArea'>
            <div className='Priceshowtitle'>Price（価格）</div>
            <div className='Priceshow'><span>¥</span>{props.TokenPlice}</div>
          </div>
          <div className='PurchaseTermsArea'>
            <div className='PurchaseTermstitle'>Terms（購入規約）</div>
            <div className='PurchaseTerms'>内容は法律の範疇に合わせるため協議中</div>
          </div>
          <div className='FinalArea'>
            <div className='AgreeTerms'>
              <input type="checkbox" className="checkbox__main" />
              <span className="checkbod__label">購入規約に同意</span>
            </div>
            <div className='LINEpayButtonArea'><button className='LINEpaypayment' onClick={BuyNFT.bind(this, props.TokenName, props.Tokentype, props.TokenData.Seller_UserId, props.TokenPlice)}>LINEPay決済へ</button></div>
          </div>
        </div>
      </div>
    )
  }
  else {
    return null;
  }
}

//NFTLetter(いいね)
const CreateNFTLetter = (props: any) => {
  const [Messagecarddata, setMessagecarddata] = useState(0)
  const [Imagedata, setImagedata] = useState()
  const [Messagetext, setMessagetext] = useState()
  const [Linepaybuttonstate, setLinepaybuttonstate] = useState(false)
  var Messagecardimagestyle: any
  const Resetshow = (e: any) => {
    if (e.target === e.currentTarget) {
      //メニューの外側をクリックしたときだけメニューを閉じる
      props.setConfirmShow(false)
      props.setCreatAleMessage(false)
      setMessagetext(undefined)
    } else {
      return
    }
  };
  const Inputtext = (textValue: any) => {
    setMessagetext(textValue)
  }

  const SendMessagecard = async (TokenType: any, ToCreaterID: any) => {
    setLinepaybuttonstate(true)
    MintMessageNFTCard(TokenType, ToCreaterID)
    setLinepaybuttonstate(false)
  }

  useEffect(() => {
    if (Messagecarddata == 1) {
      Messagecardimagestyle = {
        backgroundPositionX: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% 100%',
        backgroundImage: 'url(https://sskgik.github.io/ylbcollect/ThanksType1.png)'
      }
      setImagedata(Messagecardimagestyle)
    }
    else if (Messagecarddata == 2) {
      Messagecardimagestyle = {
        backgroundPositionX: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% 100%',
        backgroundImage: 'url(https://sskgik.github.io/ylbcollect/ThanksType2.png)'
      }
      setImagedata(Messagecardimagestyle)
    }
    else if (Messagecarddata == 3) {
      Messagecardimagestyle = {
        backgroundPositionX: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% 100%',
        backgroundImage: 'url(https://sskgik.github.io/ylbcollect/ThanksType3.png)'
      }
      setImagedata(Messagecardimagestyle)
    }
    else {
      Messagecardimagestyle = {
        backgroundPositionX: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% 100%',
        backgroundImage: 'url(https://sskgik.github.io/ylbcollect/ThanksType1.png)'
      }
      setImagedata(Messagecardimagestyle)
    }
  }, [Messagecarddata])

  var Imageuri = 'https://sskgik.github.io/NFTcard/' //https://sskgik.github.io/NFTdevelopment/'
  var NFTimagestyle = {
    backgroundPositionX: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100% 100%',
    backgroundImage: 'url(' + Imageuri + props.Tokentype + ')'
  }
  if (props.CreatAleMessage) {
    return (
      <div className="overlay" onClick={(e) => { Resetshow(e); }}>
        <div className="CreateMessageModal" >
          <div className='Modalmainframe'>
            <div className='MessagecardimageArea'>
              <div className='MessagecardElement'>
                <div className='Messagecardimageframe'>
                  <div className='Messagecardimage' style={Imagedata}><p className='Messagetext'>{Messagetext}</p></div>
                </div>
              </div>
              <div className='TemplatechoiseArea'>
                <div className='Templatechoiseflame'>
                  <div className='Templateleft centerpos'>
                    <div className='Templateimage Type1' onClick={() => setMessagecarddata(1)}></div>
                  </div>
                  <div className='Templatecenter centerpos'>
                    <div className='Templateimage Type2' onClick={() => setMessagecarddata(2)}></div>
                  </div>
                  <div className='Templateright centerpos'>
                    <div className='Templateimage Type3' onClick={() => setMessagecarddata(3)}></div>
                  </div>
                </div>
              </div>
            </div>
            <div className='Modalmainframeright'>
              <div className='mainframerightupper'>
                <div className='targetNFTimage' style={NFTimagestyle} ></div>
              </div>
              <div className='mainframerightmiddle'>
                <p className='Catchphrase'>このNFTのクリエイターさんにメッセージカードで応援しませんか？</p>
              </div>
              <div className='mainframerightmiddle2'>
                <textarea className='MessagetextArea' placeholder={'応援メッセージを入力してください'} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => Inputtext(e.target.value)}></textarea>
              </div>
              <div className='mainframerightlower'>
                <p className='messagepricetitle'>メッセージカード作成手数料</p>
                <p className='messageprice'>¥150</p>
              </div>
            </div>
          </div>
          <div className='MessageletterFinalArea'>
            <div className='AgreeTerms'>
              <input type="checkbox" className="checkbox__main" />
              <span className="checkbod__label">購入規約に同意</span>
            </div>
            <div className='LINEpayButtonArea'><button className={`LINEpaypayment ${Linepaybuttonstate && "disableLinepaybutton"}`} disabled={Linepaybuttonstate == true} onClick={SendMessagecard.bind(this, props.Tokentype, props.TokenData.Seller_UserId)}>LINEPay決済へ</button></div>
          </div>
        </div>
      </div>
    )
  }
  else {
    return null;
  }
}
//`NFTinputname ${permit && "permit"} ${disallowd && "disallowd"}






{/*<div className='NFTMarketplaceElement' >
          <div className='NFTmerketprice'>¥1,000</div>
          <div className={`NFTimageAreahover NFTimageArea SugaiYuka2`} ></div>
          <div className="NFTmarketButtonArea">
            <button className={`Tocartbutton`} onClick={Getimagedata}>カートへ</button>
            <button className={`BuyNFTbutton`} onClick={BuyNFTinbasket}>購入へ</button>
          </div>
        </div>
        <div className='NFTMarketplaceElement' >
          <div className='NFTmerketprice'>¥1,000</div>
          <div className={`NFTimageAreahover NFTimageArea SugaiYuka1`} ></div>
          <div className="NFTmarketButtonArea">
            <button className={`Tocartbutton`}>カートへ</button>
            <button className={`BuyNFTbutton`} >購入へ</button>
          </div>
        </div>
        <div className='NFTMarketplaceElement' >
          <div className='NFTmerketprice'>¥1,000</div>
          <div className={`NFTimageAreahover  NFTimageArea SugaiYuka1`} ></div>
          <div className="NFTmarketButtonArea">
            <button className={`Tocartbutton`}>カートへ</button>
            <button className={`BuyNFTbutton`}>購入へ</button>
          </div>
        </div>
        <div className='NFTMarketplaceElement' >
          <div className='NFTmerketprice'>¥1,000</div>
          <div className={`NFTimageAreahover  NFTimageArea WatanabeMiho`} ></div>
          <div className="NFTmarketButtonArea">
            <button className={`Tocartbutton`}>カートへ</button>
            <button className={`BuyNFTbutton`}>購入へ</button>
          </div>
        </div>
        <div className='NFTMarketplaceElement SugaiYuka2'></div>
        <div className='NFTMarketplaceElement SugaiYuka2'></div>
        <div className='NFTMarketplaceElement WatanabeMiho'></div>
        <div className='NFTMarketplaceElement WatanabeMiho'></div>
  <div className='NFTMarketplaceElement WatanabeMiho'></div>*/}


/*
//NFT CollectionList
const NFTCollectionlist = () => {
  const [UserCollection, setUserCollection] = useState([])
  const [show, setShow] = useState(false)
  const [elementnum, setElementnum] = useState(0)

  const changeState = (value: any) => {
            setShow(true)
    setElementnum(value)
  };

  useEffect(() => {
    const jsonstring: any = sessionStorage.getItem('NFTlist')
    const UserNFTData = JSON.parse(jsonstring)
    setUserCollection(UserNFTData)
  }, [])

  const UserCollectionfunc = (UserCollection: any) => {
    var i, j: number
    var UserNFTlist = []
    var Imageuri = 'https://sskgik.github.io/NFTcard/' //'https://sskgik.github.io/NFTdevelopment/'//
    for (i = 0; i <= UserCollection.length - 1; i++) {
      const NFTinfo = UserCollection[i]
      for (j = 0; j <= NFTinfo.numberOfIndex - 1; j++) {
        var NFTstyle = {
            backgroundPositionX: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '150px 150px',
          backgroundImage: 'url(' + Imageuri + NFTinfo.tokenType + ')',
          color: 'transparent'
        };

        UserNFTlist.push(
          <div>
            <div className='NFTcollectionname'>{NFTinfo.name}</div>
            <div className='NFTElement' id={`NFTElement` + i} style={NFTstyle} onClick={changeState.bind(this, i)}>{NFTinfo.tokenType}</div>
          </div>
        );
      }
    }
    return UserNFTlist
  }

  const UcerCollectNFTlist = UserCollectionfunc(UserCollection)


  return (
    <div className='MerketplaceNFTbody'>
            <h1 className='NFTMerketplaceTitle'>Your NFT Collection</h1>
            <div className="MerketplaceNFTList">
              {UcerCollectNFTlist}
              <Imagescaling show={show} Tokentype={document.getElementById('NFTElement' + elementnum)?.innerHTML} setShow={setShow} />
            </div>
          </div>
  )
}

const Imagescaling = (props: any) => {
  const Resetparam = () => {
            props.setShow(false)
          }
  var Imageuri = 'https://sskgik.github.io/NFTcard///' //https://sskgik.github.io/NFTdevelopment/'//'https://sskgik.github.io/NFTcard/'
  var Modalstyle = {
            backgroundPositionX: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100% 100%',
    backgroundImage: 'url(' + Imageuri + props.Tokentype + ')'
  }
  if (props.show) {
    return (
      <div className="overlay" onClick={Resetparam}>
            <div className="Modal" style={Modalstyle}></div>
          </div>
    )
  }
  else {
    return null;
  }
}*/





//function createData(date: any, tokenname: any, tokentype: any, TxID: any) {
//  return { date, tokenname, tokentype, TxID };
//}

//リリースがあるたびにここにリリース情報を追加してください
/*const rows = [
  createData('2021/04/11', 'Yanchal', '10000005', '3A5884834609986A51F35D70AF4648AEC864BDADB8F5FD3A7FDA820FEBC7DBB8'),
  createData('2021/04/12', 'Yamapon', '10000009', '9D32A81B4FD2B2C233A3662D67EE6C4524294635EFBC852DD5D571EB4E98F5A8'),
  createData('2021/04/13', 'YLBtoken', '1000006d', '05DE0C3DDEB2212E3846DF57060A00A20DB5CB0DC1161C1742704CD2A7BBE73D')
];
*/
//購入履歴用の画面
//発行履歴
const useStyles = makeStyles({
  table: {
    minWidth: 450,
  },
});

//購入履歴の取得
const ParchaiseHistory = () => {
  const classes = useStyles();
  const [TransactionData, setTransactionData] = useState([])
  const [showpage, setshowpage] = useState(1)
  const changestate = (number: number) => {
    console.log(number)
    setshowpage(number)
  }
  useEffect(() => {
    GetUserTransactiondata()
  }, [])

  //RDBからBuyerTransactionデータの取得
  function GetUserTransactiondata() {
    const requesturl = 'http://localhost:3080/getbuyertransactiondata'
    axios.get(requesturl,
      {
        withCredentials: true   //coolie共有
      }).then(function (result) {
        const TransactionData = result.data
        console.log(TransactionData)
        setTransactionData(TransactionData)
      }).catch(function (error) {
        console.log(error)
        alert('購入履歴データ取得に失敗しました！ページの再表示してください')
      })
  }
  //クリップボードにコピー
  const CopyClipboard = (TxHashID: any) => {
    console.log(TxHashID)
  }


  const UserTransactionlistfunc = (Transactionlist: any) => {
    var i: number
    let dateTime: any
    var TransactionDatalist = []
    for (i = 0; i <= Transactionlist.length - 1; i++) {
      const TxInfo = Transactionlist[i]
      dateTime = new Date(TxInfo.timestamp * 1000) //TIMEStampの変換
      //スタイルシートは
      TransactionDatalist.push(
        <TableRow>
          <TableCell component="th" scope="row">{dateTime.toLocaleDateString()}</TableCell>
          <TableCell align="left">{TxInfo.TokenName}</TableCell>
          <TableCell align="left">{TxInfo.TokenType}</TableCell>
          <TableCell align="left">¥{TxInfo.Tokenprice}</TableCell>
          <TableCell align="left">
            <div className='TxHashFlex'>
              <div className='TxHashID'>{TxInfo.TxHashID.slice(0, 15)}....{TxInfo.TxHashID.slice(-15)}</div>
              <CopyToClipboard text={TxInfo.TxHashID}>
                <button className='TxHashCopyButton' onClick={CopyClipboard.bind(this, TxInfo.TxHashID)}><FontAwesomeIcon style={TxCopyButton} icon={faCopy} /></button>
              </CopyToClipboard>
            </div>
          </TableCell>
        </TableRow>
      );
    }
    return TransactionDatalist
  }
  //Page数を表示
  const showpagenumber = (Maxpagenum: any) => {
    var i: any
    var pagenumlist = []
    for (i = 1; i <= Maxpagenum; i++) {
      pagenumlist.push(
        <button className='SellerHystorypagenum' onClick={changestate.bind(this, i)}>{i}</button>
      )
    }
    return pagenumlist
  }
  const ShowTransactionData = UserTransactionlistfunc(TransactionData)
  const pagedivnumbers = ShowTransactionData.length / 15
  const pagecalctomuch = ShowTransactionData.length % 15
  const pagenumbers = calcpagenumber(pagedivnumbers, pagecalctomuch)
  const pagenumberelment = showpagenumber(pagenumbers)
  return (
    <div className='CreateNFTHistorybody'>
      <h1>Purchase NFT History</h1>
      <div className='ToBCExplorer' onClick={BlockchainExploer}><FontAwesomeIcon style={Searchbutton} icon={faSearch} />購入履歴検索ツールへ</div>
      <TableContainer component={Paper}>
        <Table className={classes.table} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell align="left">TokenName</TableCell>
              <TableCell align="left">Tokentype</TableCell>
              <TableCell align="left">TokenPrice</TableCell>
              <TableCell align="left">購入履歴ID</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ShowTransactionData.slice((showpage - 1) * 15, showpage * 15)}
          </TableBody>
        </Table>
      </TableContainer>
      <div className='Showpagenumberarea'>{pagenumberelment}</div>
    </div>
  )
}

//ページ数計算
const calcpagenumber = (pagedivision: number, calcmuch: number) => {
  if (pagedivision == 0) {
    return 1
  } else {
    if (calcmuch == 0) {
      return 1
    }
    else {
      return pagedivision + 1
    }
  }
}

//BlockchainExploer
const BlockchainExploer = () => {
  var check = window.confirm('検索する履歴のIDまたは自身の公開鍵IDをコピーしましたか？\n保存されてない場合はコピーして再度クリックしてください！')
  if (check == true) {
    window.open("https://explorer.blockchain.line.me/daphne", "_blank");
  }
  else {
    return;
  }
}

function MintMessageNFTCard(TokenType: any, ToCreaterID: any) {
  const encordToUserID = Buffer.from(ToCreaterID).toString('base64')
  //const decordToUserID = Buffer.from(encordToUserID, 'base64').toString()
  //console.log(decordToUserID)
  const Messagecardinfo = {
    toCreaterId: encordToUserID,
    TokenType: TokenType
  };
  const requesturl = 'http://localhost:3080/mintnftmessage'
  axios.post(requesturl, Messagecardinfo,
    {
      withCredentials: true   //coolie共有
    }).then(function (result) {
      const txresult = result.data.responseData.txHash
      alert('メッセージNFTをこちらのIDにて送信しました！\n\n' + txresult)
    }).catch(function (error) {
      console.log(error)
    })
}

//ここから購入用のソース
function BuyNFT(TokenName: any, TokenType: any, Seller_UserID: any, Tokenprice: any) {
  const buyinfo = {
    tokenname: TokenName,
    tokentype: TokenType,
    SellerUserId: Seller_UserID,
    Tokenprice: Tokenprice
  };
  const requesturl = 'http://localhost:3080/buynft'
  axios.post(requesturl, buyinfo,
    {
      withCredentials: true   //coolie共有
    }).then(function (result) {
      const txresult = result.data.responseData.txHash
      alert('NFTの購入履歴はこちらのIDにて発行しました！\n\n' + txresult + '\n\n購入したトークン名:\t' + buyinfo.tokenname + '\n\n購入したトークンタイプ\t' + buyinfo.tokentype)
    }).catch(function (error) {
      console.log(error)
    })
}


function BuyNFTinbasket() {
  const Userinfojson: any = sessionStorage.getItem('Userinfo')
  const Userinfo: any = JSON.parse(Userinfojson)
  const UserId = Userinfo.UserID
  const meta = `${new Date().getTime()}|${'multiminting'}|${UserId}`
  //for文とpushで配列に足し込んでいく処理をやって全てを成功させる
  const token1 = {
    tokenType: '10000067',
    name: 'Ganbariki',
    meta
  }
  const token2 = {
    tokenType: '10000068',
    name: 'Ryosan',
    meta
  }
  const Parchaiseinfo = {
    token1,
    token2
  }
  const requesturl = 'http://localhost:3080/multiplepurchasesnft'
  axios.post(requesturl, Parchaiseinfo,
    {
      withCredentials: true   //coolie共有
    }).then(function (result) {
      const txresult = result.data.responseData.txHash
      alert('NFTの購入履歴はこちらのIDにて発行しました！\n\n' + txresult + '\n\n購入したNFTは購入履歴を参照ください！')
    }).catch(function (error) {
      console.log(error)
    })
}

//ユーザのNFTコレクションデータを取得
async function GetNFTbalance() {
  const requesturl = 'http://localhost:3080/getnftbalance'
  let Txresult: any
  axios.get(requesturl,
    {
      withCredentials: true   //coolie共有
    }).then(function (result) {
      const txresult = result.data.responseData
      const stringresult = JSON.stringify(txresult)
      //alert('NFTの所持データを取得しました！\n\n' + stringresult)
      console.log(txresult.length);
      sessionStorage.setItem('NFTlist', stringresult)
    }).catch(function (error) {
      console.log(error)
      alert('取得に失敗しました！')
    })
}

//画像サーバーの画像のレスポンス取得
function Getimagedata() {
  const requesturl = 'https://sskgik.github.io/NFTdevelopment/1000004a'
  axios.get(requesturl)
    .then(function (result) {
      const data = result.data
      var hashdata = sha512(data)
      console.log(hashdata)
    }).catch(function (error) {
      console.log(error)
    })
}

//5c4755b234c7d941f9555edb92a1dc75df77ff0f957cd5c387518d3b012caca4e9156f5ea97d3fc40dd7ae7cd093a264e2e9b6d71905d42ce91a28e066258f61

