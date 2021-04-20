import React, { Component, useState, useEffect, PureComponent } from 'react'
import { LineChart, Line, BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { makeStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import './sellerplatformscreenCSS/NFTSalesWithdraw.css'
import axios from 'axios';


const Detailsbutton: React.CSSProperties = { padding: 5, fontSize: 25 };//Detailbutton

//売り上げ管理画面
const SalesWithdrawals = () => {
  var showcomponent: any
  const [SellerInfoData, setSellerInfoData] = useState([])
  const [SalesamountData, setSalesamountData] = useState(false)
  const [SalesquntityData, setSalesquntityData] = useState(false)
  const [changestate, setchangestate] = useState(0)
  /*const [MonthlySalsePriceData, setMonthlySalsePriceData] = useState(0)
  const [ConsumptionTax, setConsumptionTax] = useState(0)*/
  //rendering時にRDBよりSellerinfoより取得
  const switchSalesamount = () => {
    setSalesamountData(true)
    setSalesquntityData(false)
    setchangestate(changestate + 1)
  }
  const switchSalesquntity = () => {
    setSalesamountData(false)
    setSalesquntityData(true)
    setchangestate(changestate + 1)
  }
  useEffect(() => {
    if (SellerInfoData) {
      GetSellerinfodata()
    }
  }, [])

  //RDBからマーケットプレースデータの取得
  function GetSellerinfodata() {
    const requesturl = 'http://localhost:3080/getsellertransactiondata'
    axios.get(requesturl,
      {
        withCredentials: true   //coolie共有
      }).then(function (result) {
        const salesdata = result.data
        console.log(salesdata)
        setSellerInfoData(salesdata)
      }).catch(function (error) {
        console.log(error)
        alert('マーケットプレースデータ取得に失敗しました！ページの再表示してください')
      })
  }

  const SalesHystorylistfunc = (SalesHystory: any) => {
    var i: number
    var MonthlySalesprice: number = 0
    var MonthlySalesQuntity: number = 0
    for (i = 0; i <= SalesHystory.length - 1; i++) {
      const NFTinfo = SalesHystory[i]
      if (NFTinfo.Action == 'Create') {
        continue
      }
      MonthlySalesprice += NFTinfo.Tokenprice
      MonthlySalesQuntity = SalesHystory.length
    }
    return [MonthlySalesprice, MonthlySalesprice * 0.1, MonthlySalesQuntity, SalesHystory]
  }


  const [MonthlySalsePriceData, ConsumptionTax, SalesQuntity, SellerInfo] = SalesHystorylistfunc(SellerInfoData)
  const SalesCommission = MonthlySalsePriceData * 0.15 //販売手数料の計算
  const Salesprofit = MonthlySalsePriceData - SalesCommission //利益の計算
  //ページ変更
  if (SalesamountData == false && SalesquntityData == false) {
    showcomponent = <Monthlysalespricedata SalesHystdata={SellerInfo} />
  }
  else if (SalesamountData == true) {
    showcomponent = <Monthlysalespricedata SalesHystdata={SellerInfo} />
  }
  else if (SalesquntityData == true) {
    showcomponent = <Monthlysalesquntitydata SalesHystdata={SellerInfo} />
  }

  return (
    <div className='CreateNFTSalesWithdrawbody'>
      <div className='SideSalesdisplayArea'>
        <div className='Saleswindow'>
          <label className='Monthlysalestxt'>月次売上額</label>
          <button className='MonthlysalesDetails' onClick={switchSalesamount}><FontAwesomeIcon style={Detailsbutton} icon={faChevronRight} /></button>
          <div className='Salsedatawindow'>
            <div className='Salsedata'>¥ {MonthlySalsePriceData}</div>
            <hr className='Salesdatahorline' />
            <div className='ConsumptionTaxArea'>
              <p className='ConsumptionTaxtxt'>消費税</p>
              <p className='ConsumptionTaxData'>¥ {ConsumptionTax}</p>
            </div>
          </div>
        </div>
        <div className='MonthlyProfitArea'>
          <label className='MonthlyProfittxt'>月次利益</label>
          <div className='MonthlyProfitData'>¥ {Salesprofit}</div>
        </div>
        <div className='MonthlySalesNFTArea'>
          <label className='MonthlysalesNFTnumtxt'>月次売上総数</label>
          <div className='MonthlysalesNFTnumData'>{SalesQuntity}個</div>
          <button className='MonthlysalesNFTnumDetail' onClick={switchSalesquntity}><FontAwesomeIcon style={Detailsbutton} icon={faChevronRight} /></button>
        </div>
        <div className='MonthlySalesFeeArea'>
          <label className='MonthlySalesFeetxt'>月次販売手数料</label>
          <div className='MonthlySalesFeeData'>¥ {SalesCommission}</div>
        </div>
        <div className='WithdrawalamountArea'>
          <label className='Withdrawalamounttxt'>出金可能額</label>
          <div className='WithdrawalamountData'>¥ {Salesprofit}</div>
          <button className='WithdrawalamountDetail'><FontAwesomeIcon style={Detailsbutton} icon={faChevronRight} /></button>
        </div>
      </div>
      <div className='MainSalesdisplayArea'>
        {showcomponent}
      </div>
    </div>
  )
}

//<Monthlysalesquntitydata SalesHystdata={SellerInfoData} />

export default SalesWithdrawals;
//売り上げ金額のアナリティスツール
const Monthlysalespricedata = (props: any) => {
  return (
    <div className='Mainsalesplotdisplay'>
      <Salesamountgraph SalesHystdata={props.SalesHystdata} />
    </div>
  );
}

const Salesamountgraph = (props: any) => {
  var i, j: number
  var day: any
  const monthsalesdata = []
  var today = new Date()
  var thisyear = today.getFullYear()
  var thismonth = today.getMonth() + 1
  //月初の日付取得
  var thismonthstart = new Date(thisyear, thismonth - 1, 30)
  thismonthstart.setDate(1)
  //月末の日付取得
  var thismonthend = new Date(thisyear, thismonth, 0)
  for (i = thismonthstart.getDate(); i <= thismonthend.getDate(); i++) {
    var Salesdateamount = 0
    var Salesdateprofit = 0
    for (j = 0; j <= props.SalesHystdata.length - 1; j++) {
      const SalesInfo = props.SalesHystdata[j]
      day = new Date(SalesInfo.timestamp * 1000)
      if (SalesInfo.Action == 'Create') {
        continue
      }
      if (i > day.getDate()) {
        continue
      }
      else if (day.getDate() == i) {
        Salesdateamount += SalesInfo.Tokenprice
        Salesdateprofit += SalesInfo.Tokenprice * 0.85
      }
      else {
        continue
      }
    }
    //Object作成
    let datesalesdata = {
      day: i,
      '日時売上': Salesdateamount,
      '日時利益': Salesdateprofit
    }
    monthsalesdata.push(datesalesdata)
  }

  return (
    <div className='PlotGrapfArea'>
      <p className='showmonth'>{thismonth}月</p>
      <div className='Salesamountgraph'>
        <ResponsiveContainer width="100%" height="60%">
          <LineChart
            width={500}
            height={300}
            data={monthsalesdata}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" tick={{ fontSize: '0.8rem' }} />
            <YAxis type="number" domain={[0, 10000]} tick={{ fontSize: '0.9rem' }} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="日時売上" stroke="#8884d8" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="日時利益" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}


//販売個数のアナリティクスツール
const Monthlysalesquntitydata = (props: any) => {
  return (
    <div className='MainSalesdisplay'>
      <Salesquntitygraph SalesHystdata={props.SalesHystdata} />
      <SalesQuntityTable SalesHystdata={props.SalesHystdata} />
    </div>
  );
}

const Salesquntitygraph = (props: any) => {
  var i, j: number
  var day: any
  const monthsalesdata = []
  var today = new Date()
  var thisyear = today.getFullYear()
  var thismonth = today.getMonth() + 1
  //月初の日付取得
  var thismonthstart = new Date(thisyear, thismonth - 1, 30)
  thismonthstart.setDate(1)
  //月末の日付取得
  var thismonthend = new Date(thisyear, thismonth, 0)
  for (i = thismonthstart.getDate(); i <= thismonthend.getDate(); i++) {
    var Quntity = 0
    for (j = 0; j <= props.SalesHystdata.length - 1; j++) {
      const SalesInfo = props.SalesHystdata[j]
      day = new Date(SalesInfo.timestamp * 1000)
      if (SalesInfo.Action == 'Create') {
        continue
      }
      if (i > day.getDate()) {
        continue
      }
      else if (day.getDate() == i) {
        Quntity++
      }
      else {
        continue
      }
    }
    /** グラフデータ */
    let datesalesdata = {
      day: i,
      '販売数': Quntity,
    }
    monthsalesdata.push(datesalesdata)
  }
  console.log(monthsalesdata)

  return (
    <div className='BarGrapfArea'>
      <p className='showmonth'>{thismonth}月</p>
      <div className='Salesquntitygraph'>
        <ResponsiveContainer width="95%" height="90%">
          <BarChart width={150} height={40} data={monthsalesdata}>
            <Bar dataKey="販売数" fill="#00bfff" />
            <XAxis dataKey="day" tick={{ fontSize: '0.8rem' }} />
            <YAxis type="number" domain={[0, 60]} tick={{ fontSize: '0.9rem' }} />
            <Legend />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}


const useStyles = makeStyles({
  table: {
    minWidth: 350,
  },
});
//購入履歴の取得
const SalesQuntityTable = (props: any) => {
  //const classes = useStyles();

  const Salesquantitylistfunc = (SalesData: any) => {
    var i, j, k: number
    var elementnum: number
    var SalesquantityDatalist: any = []
    var TemporaryStorageArray: any = []
    //Object作成
    let tableelementdata = {
      TokenName: "",
      TokenType: "",
      TokenPrice: 0,
      TokenQuntity: 0
    };
    //要素わけ
    for (i = 0; i <= SalesData.length - 1; i++) {
      const SalesInfo = SalesData[i]
      //create element delete
      if (SalesInfo.Action == 'Create') {
        continue
      }
      //初期のpush
      if (TemporaryStorageArray.length == 0) {
        tableelementdata = {
          TokenName: SalesInfo.TokenName,
          TokenType: SalesInfo.TokenType,
          TokenPrice: SalesInfo.Tokenprice,
          TokenQuntity: 1
        };
        TemporaryStorageArray.push(tableelementdata)
      }
      //それ以外
      else {
        //要素検索
        elementnum = TemporaryStorageArray.filter(function (item: any, index: any) {
          if (item.TokenType == SalesInfo.TokenType) return true;
        })
        //重複要素なし
        if (elementnum == 0) {
          tableelementdata = {
            TokenName: SalesInfo.TokenName,
            TokenType: SalesInfo.TokenType,
            TokenPrice: SalesInfo.Tokenprice,
            TokenQuntity: 1
          };
          TemporaryStorageArray.push(tableelementdata)
        }
        //重複あり
        else {
          for (j = 0; j <= TemporaryStorageArray.length - 1; j++) {
            if (TemporaryStorageArray[j].TokenType != SalesInfo.TokenType) {
              continue
            }
            TemporaryStorageArray[j].TokenQuntity++
          }
        }
      }
    }
    for (k = 0; k <= TemporaryStorageArray.length - 1; k++) {
      //スタイルシートは
      SalesquantityDatalist.push(
        <TableRow>
          <TableCell align="left">{TemporaryStorageArray[k].TokenName}</TableCell>
          <TableCell align="left">{TemporaryStorageArray[k].TokenType}</TableCell>
          <TableCell align="left">¥{TemporaryStorageArray[k].TokenPrice}</TableCell>
          <TableCell align="left">{TemporaryStorageArray[k].TokenQuntity}</TableCell>
        </TableRow>
      );
    }
    return SalesquantityDatalist
  }

  const SalesQuntityData = Salesquantitylistfunc(props.SalesHystdata)

  return (
    <div className='SalesQuntitytable'>
      <TableContainer component={Paper}>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell align="left">TokenName</TableCell>
              <TableCell align="left">Tokentype</TableCell>
              <TableCell align="left">TokenPrice</TableCell>
              <TableCell align="left">販売数</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {SalesQuntityData}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}
//className={classes.table}