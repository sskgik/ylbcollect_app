import React, { Component, useState, useEffect } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHammer } from "@fortawesome/free-solid-svg-icons";
import { faList } from "@fortawesome/free-solid-svg-icons";
import { faClipboardList } from "@fortawesome/free-solid-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faCoins } from "@fortawesome/free-solid-svg-icons";
import { faUserFriends } from "@fortawesome/free-solid-svg-icons";
import { faQuestion } from "@fortawesome/free-solid-svg-icons";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import CreateNFTStep from "./CreateNFTbody"
import SalesWithdraw from "./Salesandwithdraw"
import './sellerplatformmarketplace.css'
import './sellerplatformscreenCSS/NFTCreatescreen.css'
import './sellerplatformscreenCSS/NFTcreateinputformat.css'
import './sellerplatformscreenCSS/NFTSalesWithdraw.css'
import './sellerplatformscreenCSS/NFTCreateHystory.css'
import axios from 'axios';

const iconStyle1: React.CSSProperties = { paddingTop: 10, paddingBottom: 10, paddingLeft: 10, paddingRight: 10, fontSize: 20, color: 'black' };//hummer
const iconStyle2: React.CSSProperties = { paddingTop: 10, paddingBottom: 10, paddingLeft: 12, paddingRight: 14, fontSize: 20, color: 'black' };//LIST
const iconStyle3: React.CSSProperties = { paddingTop: 10, paddingBottom: 10, paddingLeft: 10, paddingRight: 12, fontSize: 20, color: 'black' };//sales&withdraws
const iconStyle4: React.CSSProperties = { paddingTop: 10, paddingBottom: 10, paddingLeft: 9, paddingRight: 10, fontSize: 18, color: 'black' }; //group
const iconStyle5: React.CSSProperties = { paddingTop: 10, paddingBottom: 10, paddingLeft: 12, paddingRight: 14, fontSize: 20, color: 'black' };//question
const Searchbutton: React.CSSProperties = { paddingTop: 2, paddingBottom: 0, paddingLeft: 10, paddingRight: 10, fontSize: 20 };//Searchbutton
const Modalclose: React.CSSProperties = { paddingTop: 2, paddingBottom: 0, paddingLeft: 10, paddingRight: 10, fontSize: 20 };//Modalclosebutton
const TxCopyButton: React.CSSProperties = { paddingLeft: 5, paddingRight: 5, fontSize: 20 };//TxhashCopybutton
const Detailsbutton: React.CSSProperties = { padding: 5, fontSize: 25 };//Detailbutton


function Userplatformmerketplace() {

  const [CreatNFTpage, setCreateNFT] = useState(false);
  const [Salselistpage, setSalselist] = useState(false);
  const [Stoplistpage, setStoplist] = useState(false);
  const [CreatEarningspage, setEarnings] = useState(false);
  const [CreatHistory, setHistory] = useState(false);
  const _sleep = (ms: any) => new Promise((resolve) => setTimeout(resolve, ms));

  const openCreateNFTpage = async () => {
    var json: any = sessionStorage.getItem('Userinfo')
    var Userinfo: any = JSON.parse(json)
    if (Userinfo == null) {
      GetUserID()
      await _sleep(200)
    }
    setCreateNFT(true);
    setSalselist(false);
    setStoplist(false);
    setEarnings(false);
    setHistory(false);
  };
  const openSaleslistpage = () => {
    setCreateNFT(false);
    setSalselist(true);
    setStoplist(false);
    setEarnings(false);
    setHistory(false);
  };
  const openStoplistpage = () => {
    setCreateNFT(false);
    setSalselist(false);
    setStoplist(true);
    setEarnings(false);
    setHistory(false);
  }
  const openEarningspage = () => {
    setCreateNFT(false);
    setSalselist(false);
    setStoplist(false);
    setEarnings(true);
    setHistory(false);
  };
  const openHistorypage = () => {
    setCreateNFT(false);
    setSalselist(false);
    setStoplist(false);
    setEarnings(false);
    setHistory(true);
  };

  var rendorelement;
  if (CreatNFTpage == false && Salselistpage == false && Stoplistpage == false && CreatEarningspage == false && CreatHistory == false) {
    rendorelement = <SalseNFTList />
  } else if (CreatNFTpage == true) {
    rendorelement = <CreateNFTStep />
  } else if (Salselistpage == true) {
    rendorelement = <SalseNFTList />
  } else if (Stoplistpage == true) {
    rendorelement = <SalseStopNFTList />
  } else if (CreatHistory == true) {
    rendorelement = <SellerNFTHistory />
  } else {
    rendorelement = <SalesWithdraw />
  }

  return (
    <div className='sellermerketplacebody'>
      <div className='sellerFlexpositon'>
        <div className='sellersidemenu'>
          <div className='sidemenutxtpos'>
            <p className='GenNFTtxt'>NFT??????</p>
            <div className='sellerChoisesmenu'>
              <a className='sellerChoices' onClick={openCreateNFTpage}><FontAwesomeIcon style={iconStyle1} icon={faHammer} />NFT ???????????????</a>
              {/*<a className='sellerChoices'>NFTImage ?????????</a>*/}
              <a className='sellerChoices' onClick={openSaleslistpage}><FontAwesomeIcon style={iconStyle2} icon={faList} />????????? NFT</a>
              <a className='sellerChoices' onClick={openStoplistpage}><FontAwesomeIcon style={iconStyle2} icon={faList} />???????????????????????? NFT</a>
              <a className='sellerChoices' onClick={openHistorypage}><FontAwesomeIcon style={iconStyle2} icon={faClipboardList} />????????????</a>
              <a className='sellerChoices' onClick={openEarningspage}><FontAwesomeIcon style={iconStyle3} icon={faCoins} />??????/??????</a>
              <div ><Link className='sellerChoices' target='_blank' to={'/openchat'}><FontAwesomeIcon style={iconStyle4} icon={faUserFriends} />?????????????????????????????????</Link></div>
              <div ><Link className='sellerChoices' target='_blank' to={'/question'}><FontAwesomeIcon style={iconStyle5} icon={faQuestion} />??????????????????</Link></div>
            </div>
          </div>
          <hr className='sidemenuhr' />
          <div className='sideinfomenupos'>
            <p className='Headingtxt'>????????????</p>
            <div className='sellermerketinfomenu'>
              <a className='sellermerketinfo'>2021???4???LINE????????????????????????????????????????????????NFT???????????????????????????~YLB Collect????????????~</a>
            </div>
          </div>
          <hr className='sidemenuhr' />
          <div><Link className='sellerhelpmenu' to={'/sellerplatform/sellerhelp'}>?????????</Link></div>
        </div>
        <div className='sellermerketplacemainbody'>
          {/* <CreateNFTInput />*/}
          {rendorelement}
        </div>
      </div>
    </div>
  );
}

export default Userplatformmerketplace;



//Create NFT List Area
const SalseNFTList = () => {
  const [NowonSaleData, setNowonSaleData] = useState([])
  const [show, setShow] = useState(false)
  const [elementnum, setElementnum] = useState(0)
  const [rerendor, setrerendor] = useState(0)
  const [showpage, setshowpage] = useState(1)
  //pagenumberState?????????
  const changepageState = (number: any) => {
    console.log(number)
    setshowpage(number)
  };
  //State?????????
  const changeState = (value: any) => {
    setShow(true)
    setElementnum(value)
  };
  //rendering??????RDB????????????
  useEffect(() => {
    GetNowOnSaledata()
  }, [rerendor])

  //RDB???????????????????????????????????????????????????
  function GetNowOnSaledata() {
    const requesturl = 'http://localhost:3080/getonsalenftdata'
    axios.get(requesturl,
      {
        withCredentials: true   //coolie??????
      }).then(function (result) {
        const OnSaledata = result.data
        console.log(OnSaledata)
        setNowonSaleData(OnSaledata)
      }).catch(function (error) {
        console.log(error)
        alert('?????????????????????????????????????????????????????????????????????????????????????????????')
      })
  }

  const Onsalelistfunc = (Onsalelist: any) => {
    var i: number
    var OnsaleNFTlist = []
    const User: any = sessionStorage.getItem('Userinfo')
    const UserInfo: any = JSON.parse(User)
    var Imageuri = 'https://sskgik.github.io/NFTcard/' //'https://sskgik.github.io/NFTdevelopment/'//
    for (i = 0; i <= Onsalelist.length - 1; i++) {
      const NFTinfo = Onsalelist[i]
      //????????????NFT?????????
      if (NFTinfo.Saleslicense == false) {
        continue
      }
      var NFTstyle = {
        backgroundPositionX: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '150px 150px',
        backgroundImage: 'url(' + Imageuri + NFTinfo.TokenType + ')',
        color: 'transparent'
      }

      OnsaleNFTlist.push(
        <div>
          <div className='NowonSaleNFTArea' >
            <div className='NFTElement' style={NFTstyle}></div>
            <div className="OnsaleNFTButtonArea">
              <button className='StopSelling' onClick={StopSell.bind(this, NFTinfo.TokenType)}>????????????</button>
              <button className='OnsaleNFTinfo' onClick={changeState.bind(this, i)}>NFT??????</button>
              <OnSaleNFTinfomation show={show}
                TokenData={NFTinfo}
                SellUserID={UserInfo.UserID}
                setShow={setShow} />
            </div>
          </div>
        </div>
      );
    }
    return OnsaleNFTlist
  }

  //????????????
  const StopSell = (TokenType: any) => {
    var chknum: number
    var confirm = window.confirm('???????????????????????????\n????????????????????????')
    if (confirm == false) {
      return
    }
    const requesturl = 'http://localhost:3080/stopsalesnft?TokenType=' + TokenType
    axios.get(requesturl,
      {
        withCredentials: true   //coolie??????
      }).then(function (result) {
        const data = result.data
        alert("???????????????????????????????????????")
        chknum = rerendor + 1
        setrerendor(chknum)
      }).catch(function (error) {
        alert("????????????????????????????????????\n????????????????????????????????????????????????????????????")
      })
  }
  //Page????????????
  const showpagenumber = (Maxpagenum: any) => {
    var i: any
    var pagenumlist = []
    for (i = 1; i <= Maxpagenum; i++) {
      pagenumlist.push(
        <button className='SellerHystorypagenum' onClick={changepageState.bind(this, i)}>{i}</button>
      )
    }
    return pagenumlist
  }

  const OnsaleNFTlist = Onsalelistfunc(NowonSaleData)
  const pagedivnumbers = OnsaleNFTlist.length / 12
  const pagecalctomuch = OnsaleNFTlist.length % 12
  const pagenumbers = calcpagenumber(pagedivnumbers, pagecalctomuch)
  const pagenumberelment = showpagenumber(pagenumbers)
  return (
    <div className='CreateNFTbody'>
      <h1 className='NFTCreateTitle'>Sales NFT</h1>
      <p className='NFTissueinfo'>?????????????????????NFT???{OnsaleNFTlist.length}??????????????????</p>
      <div className='Showpagenumberarea upperarea'>{pagenumberelment}</div>
      <div className="CreateNFTList">
        {OnsaleNFTlist.slice((showpage - 1) * 12, showpage * 12)}
      </div>
      <div className='Showpagenumberarea'>{pagenumberelment}</div>
    </div>
  )
}

//NFT????????????
const OnSaleNFTinfomation = (props: any) => {
  const Resetshow = (e: any) => {
    if (e.target === e.currentTarget) {
      //??????????????????????????????????????????????????????????????????????????????
      props.setShow(false)
    } else {
      return
    }
  };

  const closemodal = () => {
    props.setShow(false)
  }

  var Imageuri = 'https://sskgik.github.io/NFTcard/' //https://sskgik.github.io/NFTdevelopment/'
  var NFTimagestyle = {
    backgroundPositionX: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100% 100%',
    backgroundImage: 'url(' + Imageuri + props.TokenData.TokenType + ')'
  }
  if (props.show) {
    return (
      <div className="overlay" onClick={(e) => { Resetshow(e); }}>
        <div className="Modal" >
          <div className='headerflex'>
            <div className='Modalheader'>TokenName: {'\t' + props.TokenData.TokenName}</div>
            <button className='Modalclosebutton' onClick={closemodal}><FontAwesomeIcon style={Modalclose} icon={faTimes} /></button>
          </div>
          <div className='SellTargetNFTshowArea'>
            <div className='SellTargetNFTImage' style={NFTimagestyle}></div>
          </div>
          <div className='AllDetailArea'>
            <div className='leftDetail'>
              <div className='Soldunittitle'>????????????</div>
              <div className='Soldunitdata'>{props.TokenData.Numbersofsales}/{props.TokenData.TokenSalesAmount}</div>
            </div>
            <div className='CenterDetail'>
              <div className='Soldunittitle'>??????????????????</div>
              <div className='Soldunitdata'><FontAwesomeIcon style={iconStyle3} icon={faEnvelope} /></div>
              <div className='Soldunitdata'>{props.TokenData.MessageCardTotal}</div>
            </div>
            <div className='CenterDetail'>
              <div className='Soldunittitle'>????????????</div>
              <div className='Soldunitdata'>??<span>{props.TokenData.TokenPlice}</span></div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  else {
    return null;
  }
}
//??????????????????NFT?????????
const SalseStopNFTList = () => {
  const [NowonSaleData, setNowonSaleData] = useState([])
  const [show, setShow] = useState(false)
  const [elementnum, setElementnum] = useState(0)
  const [rerendor, setrerendor] = useState(0)
  const [showpage, setshowpage] = useState(1)
  //pagenumberState?????????
  const changepageState = (number: any) => {
    console.log(number)
    setshowpage(number)
  };
  //State?????????
  const changeState = (value: any) => {
    setShow(true)
    setElementnum(value)
  };
  //rendering??????RDB????????????
  useEffect(() => {
    GetNowOnSaledata()
  }, [rerendor])

  //RDB???????????????????????????????????????????????????
  function GetNowOnSaledata() {
    const requesturl = 'http://localhost:3080/getonsalenftdata'
    axios.get(requesturl,
      {
        withCredentials: true   //coolie??????
      }).then(function (result) {
        const OnSaledata = result.data
        console.log(OnSaledata)
        setNowonSaleData(OnSaledata)
      }).catch(function (error) {
        console.log(error)
        alert('?????????????????????????????????????????????????????????????????????????????????????????????')
      })
  }

  const Stopsalelistfunc = (Onsalelist: any) => {
    var i: number
    var txtmessage: any
    var OnsaleNFTlist = []
    const User: any = sessionStorage.getItem('Userinfo')
    const UserInfo: any = JSON.parse(User)
    var Imageuri = 'https://sskgik.github.io/NFTcard/' //'https://sskgik.github.io/NFTdevelopment/'//
    for (i = 0; i <= Onsalelist.length - 1; i++) {
      const NFTinfo = Onsalelist[i]
      //?????????NFT?????????
      if (NFTinfo.Saleslicense == true) {
        continue
      }
      var NFTstyle = {
        backgroundPositionX: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '150px 150px',
        backgroundImage: 'url(' + Imageuri + NFTinfo.TokenType + ')',
        color: 'transparent'
      }

      if (NFTinfo.TokenSalesAmount == NFTinfo.Numbersofsales) {
        txtmessage = '??????'
      } else {
        txtmessage = '????????????'
      }

      OnsaleNFTlist.push(
        <div>
          <div className='NowonSaleNFTArea' >
            <div className='NFTElement' style={NFTstyle}></div>
            <div className="OnsaleNFTButtonArea">
              <button className='StopSelling' disabled={NFTinfo.TokenSalesAmount <= NFTinfo.Numbersofsales} onClick={StartSell.bind(this, NFTinfo.TokenType)}>{txtmessage}</button>
              <button className='OnsaleNFTinfo' onClick={changeState.bind(this, i)}>NFT??????</button>
              <OnSaleNFTinfomation show={show}
                TokenData={NFTinfo}
                SellUserID={UserInfo.UserID}
                setShow={setShow} />
            </div>
          </div>
        </div>
      );
    }
    return OnsaleNFTlist
  }

  //????????????
  const StartSell = (TokenType: any) => {
    var chknum: number
    var confirm = window.confirm('???????????????????????????\n????????????????????????')
    if (confirm == false) {
      return
    }
    const requesturl = 'http://localhost:3080/restartsalesnft?TokenType=' + TokenType
    axios.get(requesturl,
      {
        withCredentials: true   //coolie??????
      }).then(function (result) {
        const data = result.data
        alert("???????????????????????????????????????")
        chknum = rerendor + 1
        setrerendor(chknum)
      }).catch(function (error) {
        alert("????????????????????????????????????\n????????????????????????????????????????????????????????????")
      })
  }
  //Page????????????
  const showpagenumber = (Maxpagenum: any) => {
    var i: any
    var pagenumlist = []
    for (i = 1; i <= Maxpagenum; i++) {
      pagenumlist.push(
        <button className='SellerHystorypagenum' onClick={changepageState.bind(this, i)}>{i}</button>
      )
    }
    return pagenumlist
  }

  const StopsaleNFTlist = Stopsalelistfunc(NowonSaleData)
  const pagedivnumbers = StopsaleNFTlist.length / 12
  const pagecalctomuch = StopsaleNFTlist.length % 12
  const pagenumbers = calcpagenumber(pagedivnumbers, pagecalctomuch)
  const pagenumberelment = showpagenumber(pagenumbers)
  return (
    <div className='CreateNFTbody'>
      <h1 className='NFTCreateTitle'>Sales Stop NFT</h1>
      <p className='NFTissueinfo'>??????????????????????????????????????????NFT???{StopsaleNFTlist.length}??????????????????</p>
      <div className='Showpagenumberarea upperarea'>{pagenumberelment}</div>
      <div className="CreateNFTList">
        {StopsaleNFTlist.slice((showpage - 1) * 12, showpage * 12)}
      </div>
      <div className='Showpagenumberarea upperarea'>{pagenumberelment}</div>
    </div>
  )
}


//????????????
const useStyles = makeStyles({
  table: {
    minWidth: 450,
  },
});

//??????(minting)????????????????????????
const SellerNFTHistory = () => {
  const classes = useStyles();
  const [TransactionData, setTransactionData] = useState([])
  const [showpage, setshowpage] = useState(1)
  const changestate = (number: number) => {
    console.log(number)
    setshowpage(number)
  }
  useEffect(() => {
    GetSellerTransactiondata()
  }, [showpage])

  //RDB??????BuyerTransaction??????????????????
  function GetSellerTransactiondata() {
    const requesturl = 'http://localhost:3080/getsellertransactiondata'
    axios.get(requesturl,
      {
        withCredentials: true   //coolie??????
      }).then(function (result) {
        const TransactionData = result.data
        console.log(TransactionData)
        setTransactionData(TransactionData)
      }).catch(function (error) {
        console.log(error)
        alert('??????????????????????????????????????????????????????????????????????????????????????????')
      })
  }

  //?????????????????????????????????
  const CopyClipboard = (TxHashID: any) => {
    console.log(TxHashID)
  }

  const SellerTransactionlistfunc = (Transactionlist: any) => {
    var i: number
    let dateTime: any
    var TransactionDatalist = []
    for (i = 0; i <= Transactionlist.length - 1; i++) {
      const TxInfo = Transactionlist[i]
      dateTime = new Date(TxInfo.timestamp * 1000) //TIMEStamp?????????
      //????????????????????????
      TransactionDatalist.push(
        <TableRow>
          <TableCell component="th" scope="row">{dateTime.toLocaleDateString()}</TableCell>
          <TableCell align="left">{TxInfo.TokenName}</TableCell>
          <TableCell align="left">{TxInfo.TokenType}</TableCell>
          <TableCell align="left">{TxInfo.Action}</TableCell>
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

  //Page????????????
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

  const ShowTransactionData = SellerTransactionlistfunc(TransactionData)
  const pagedivnumbers = ShowTransactionData.length / 15
  const pagecalctomuch = ShowTransactionData.length % 15
  const pagenumbers = calcpagenumber(pagedivnumbers, pagecalctomuch)
  const pagenumberelment = showpagenumber(pagenumbers)
  return (
    <div className='CreateNFTHistorybody'>
      <h1>Create ??? Mint  NFT History</h1>
      <div className='ToBCExplorer' onClick={BlockchainExploer}><FontAwesomeIcon style={Searchbutton} icon={faSearch} />??????????????????????????????</div>
      <TableContainer component={Paper}>
        <Table className={classes.table} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell align="left">TokenName</TableCell>
              <TableCell align="left">Tokentype</TableCell>
              <TableCell align="left">Action</TableCell>
              <TableCell align="left">????????????ID</TableCell>
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
//??????????????????
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
  var check = window.confirm('?????????????????????ID???????????????????????????ID??????????????????????????????\n????????????????????????????????????????????????????????????????????????????????????')
  if (check == true) {
    window.open("https://explorer.blockchain.line.me/daphne", "_blank");
  }
  else {
    return;
  }
}

//????????????????????????
const Sales_Withdrawals = () => {
  return (
    <div className='CreateNFTSalesWithdrawbody'>
      <div className='SideSalesdisplayArea'>
        <div className='Saleswindow'>
          <label className='Monthlysalestxt'>???????????????</label>
          <button className='MonthlysalesDetails'><FontAwesomeIcon style={Detailsbutton} icon={faChevronRight} /></button>
          <div className='Salsedatawindow'>
            <div className='Salsedata'>?? 14,000</div>
            <hr className='Salesdatahorline' />
            <div className='ConsumptionTaxArea'>
              <p className='ConsumptionTaxtxt'>?????????</p>
              <p className='ConsumptionTaxData'>?? 1,400</p>
            </div>
          </div>
        </div>
        <div className='MonthlyProfitArea'>
          <label className='MonthlyProfittxt'>????????????</label>
          <div className='MonthlyProfitData'>?? X,XXX</div>
          <button className='MonthlysalesNFTnumDetail'><FontAwesomeIcon style={Detailsbutton} icon={faChevronRight} /></button>
        </div>
        <div className='MonthlySalesNFTArea'>
          <label className='MonthlysalesNFTnumtxt'>??????????????????</label>
          <div className='MonthlysalesNFTnumData'>XX???</div>
          <button className='MonthlysalesNFTnumDetail'><FontAwesomeIcon style={Detailsbutton} icon={faChevronRight} /></button>
        </div>
        <div className='MonthlySalesFeeArea'>
          <label className='MonthlySalesFeetxt'>?????????????????????</label>
          <div className='MonthlySalesFeeData'>?? X,XXX</div>
        </div>
        <div className='WithdrawalamountArea'>
          <label className='Withdrawalamounttxt'>???????????????</label>
          <div className='WithdrawalamountData'>?? X,XXX</div>
          <button className='WithdrawalamountDetail'><FontAwesomeIcon style={Detailsbutton} icon={faChevronRight} /></button>
        </div>
      </div>
    </div>
  )
}

//GET USER ID
const GetUserID = () => {
  const Requesturl = 'http://localhost:3080/user'
  var userinfo = {
    UserIcon: '',
    Username: '',
    UserID: ''
  };
  axios.get(Requesturl, {
    withCredentials: true   //coolie??????
  }).then(function (user) {
    let UserPicture: string = user.data.picture;
    let Username: string = user.data.disp_name;
    let UserID: string = user.data.user_id;
    userinfo["UserIcon"] = UserPicture;
    userinfo["Username"] = Username;
    userinfo["UserID"] = UserID;
    sessionStorage.setItem('Userinfo', JSON.stringify(userinfo));
  }).catch(function (error) {
    console.log(error)
  })
}



