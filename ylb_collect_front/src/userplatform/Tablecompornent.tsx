import React, { Component, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';


const TAX_RATE = 0.1;

const useStyles = makeStyles({
  table: {
    minWidth: 600,
  },
  headerrowstyle: {
    height: '50px'
  }
  ,
  rowstyle: {
    height: '100px'
  }
});
/*
function ccyFormat(num: number) {
  return `${num.toFixed(2)}`;
}

function priceRow(qty: number, unit: number) {
  return qty * unit;
}

function createRow(desc: string, qty: number, unit: number, a: any) {
  const price = priceRow(qty, unit);
  return { desc, qty, unit, price, a };
}
*/
interface Data {
  desc: any;
  qty: any;
  unit: any;
  quantity: any;
  price: any;
}
/*
function subtotal(items: Row[]) {
  return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
}*/



//const invoiceSubtotal = subtotal(rows);
//const invoiceTaxes = TAX_RATE * invoiceSubtotal;
//const invoiceTotal = invoiceTaxes + invoiceSubtotal;



function SpanningTable(count: any) {
  const [UserBasketData, setUserBasketData] = useState([])
  var [change, setchange] = useState(0)
  var i: number

  const classes = useStyles();
  useEffect(() => {
    GetUserBasketdata()
  }, [change])


  function GetUserBasketdata() {
    const requesturl = 'http://localhost:3080/readbasketdata'
    axios.get(requesturl,
      {
        withCredentials: true   //coolie共有
      }).then(function (result) {
        const Basketdata = result.data
        setUserBasketData(Basketdata)
      }).catch(function (error) {
        console.log(error)
        alert('バスケットデータ取得に失敗しました！ページの再表示してください')
      })
  }
  //取得した買い物カゴを表示する
  const Basketdatalist = (UserBasketData: any) => {
    const meta = `${new Date().getTime()}|${'multiminting'}`
    var i: number

    var calcprice = 0
    var UserBasketDatalist = []
    var UserBasket = []
    var UserBasketTokendata: any = {}
    var UserBasketotherdata: any = {}
    var Imageuri = 'https://sskgik.github.io/NFTcard/'
    for (i = 0; i <= UserBasketData.length - 1; i++) {
      const NFTBasketElement = UserBasketData[i]
      var NFTImagestyle = {
        width: '100px',
        height: '100px',
        backgroundPositionX: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100px 100px',
        backgroundImage: 'url(' + Imageuri + NFTBasketElement.TokenType + ')',
        color: 'transparent',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 'auto',
        marginBottom: 'auto',
      }

      UserBasketTokendata[`token${i + 1}`] = { tokenType: NFTBasketElement.TokenType, name: NFTBasketElement.TokenName, meta }
      UserBasketotherdata[`token${i + 1}`] = { Tokenprice: NFTBasketElement.TokenPrice, Seller_UserId: NFTBasketElement.Seller_UserID }
      //表示する要素を配列に
      UserBasketDatalist.push(
        <TableRow className={classes.rowstyle}>
          <TableCell ><div style={NFTImagestyle} id={'BasketElementTokentype' + i}>{NFTBasketElement.TokenType}</div></TableCell>
          <TableCell align="center">{NFTBasketElement.TokenName}</TableCell>
          <TableCell align="center">{NFTBasketElement.TokenQuantity}</TableCell>
          <TableCell align="center">¥<span>{NFTBasketElement.TokenPrice}</span></TableCell>
          <TableCell align="center"><button className={'Deletebutton'} onClick={DeleteElementFromBasket.bind(
            i,
            NFTBasketElement
          )}>削除</button></TableCell>{/*dummy引数:i*/}
        </TableRow>
      );
      calcprice = calcprice + Number(NFTBasketElement.TokenPrice)//買い物かごの小計を計算   
    }
    UserBasket.push(UserBasketTokendata)
    UserBasket.push(UserBasketotherdata)
    sessionStorage.setItem('UserwanttobuyNFT', JSON.stringify(UserBasket))
    return [UserBasketDatalist, calcprice]
  }

  //特定のバスケットデータの削除
  const DeleteElementFromBasket = (DeleteElement: any) => {
    if (DeleteElement.TokenType == undefined) {
      setchange(change + 1)
      return
    }
    var requestURL = "http://localhost:3080/deletebasketdata?TokenType=" + DeleteElement.TokenType
    axios.get(requestURL,
      {
        withCredentials: true   //coolie共有
      }).then(function (result) {
        console.log(result)
        setchange(change + 1)
      }).catch(function (error) {
        console.log(error)
      })
  }

  const [BasketDataNFTlist, UserTotalprice] = Basketdatalist(UserBasketData)
  sessionStorage.setItem('UserTotalprice', UserTotalprice.toString())//情報共有用

  if (UserBasketData.length) {
    return (
      <div style={{
        marginLeft: '5%', width: '90%'
      }}>
        < TableContainer component={Paper} >
          <Table className={classes.table} aria-label="spanning table">
            <TableHead>
              <TableRow className={classes.headerrowstyle}>
                <TableCell align='center'>NFTイメージ</TableCell>
                <TableCell align="center">トークン名</TableCell>
                <TableCell align="center">個数</TableCell>
                <TableCell align="center">値段</TableCell>
                <TableCell align="center">カートから戻す</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {BasketDataNFTlist}
              <TableRow>
                <TableCell rowSpan={1} />
                <TableCell align="right" colSpan={2}>総計</TableCell>
                <TableCell align="right">{UserTotalprice}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </ div>
    );
  } else {
    return (
      <div style={{
        marginLeft: '5%', width: '90%'
      }}>
        < TableContainer component={Paper} >
          <Table className={classes.table} aria-label="spanning table">
            <TableHead>
              <TableRow className={classes.headerrowstyle}>
                <TableCell align='center'>NFTイメージ</TableCell>
                <TableCell align="center">トークン名</TableCell>
                <TableCell align="center">個数</TableCell>
                <TableCell align="center">値段</TableCell>
                <TableCell align="center">カートから戻す</TableCell>
              </TableRow>
            </TableHead>
          </Table>
          <div className='NocartSentence'>カートに購入予定のNFTはありません！</div>
        </TableContainer>
      </ div>
    );
  }
}

export default SpanningTable;
