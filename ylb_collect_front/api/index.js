const express = require('express')
const app = express()
const mysql = require('mysql')
const cors = require('cors')
const bodyParser = require('body-parser')
const LineLogin = require('line-login')
const session = require('express-session')
const lbp = require('./lbp')
const ylb = require('./YLB')
const { Console } = require('console')
const { stringify } = require('querystring')
const { SSL_OP_NO_SSLv2 } = require('constants')
const { result } = require('lodash')
const { Buffer } = require('buffer')
const sessionOpts = {
    secret: process.env.LINE_LOGIN_CHANNEL_SECRET,
    resave: false,
    saveUninitialized: false
}
//MySQL用の接続設定の
const DBconnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.MySQLPassword,
    database: 'ylbcollect'
})
//コネクト失敗か成功
DBconnection.connect((err) => {
    if (err) {
        console.log('error connecting: ' + err.stack);
        return;
    }
    console.log('success');
})

//MarketplaceTable
//CREATE TABLE Marketplace (id int,TokenName varchar(255),TokenType varchar(255),Seller_UserId varchar(255),NFTkind varchar(255),Saleslicense boolean);
//UserInfo
// CREATE TABLE UserInfo (user_id varchar(255),parent_id varchar(255),content varchar(255),timestamp varchar(255),TxHashID varchar(255),TokenName varchar(255),TokenType varchar(255))
//ShoppingBasket

//ここのファイルでAPIを切る
app.use(bodyParser.json())
app.use(session(sessionOpts))
app.use(cors({ credentials: true, origin: true })); //Cross Domain connectipn coifig

//LINEログイン
const login = new LineLogin({
    channel_id: process.env.LINE_LOGIN_CHANNEL_ID,
    channel_secret: process.env.LINE_LOGIN_CHANNEL_SECRET,
    callback_url: process.env.LINE_LOGIN_CALLBACK_URL,
    scope: 'openid profile email',
    prompt: 'consent',
    bot_prompt: 'normal'
})
//login typesorting
const Loginsorttype = (req, res, next) => {
    console.log(req.query.usertype)
    req.session['Logintype'] = {
        Logintype: req.query.usertype
    }
    return next()
}

app.get('/login', Loginsorttype, login.auth())
app.use('/oauth/callback', login.callback(
    (req, res, next, tokenResponse) => {
        console.log(req.method, req.originalUrl, tokenResponse)
        const lineUserId = tokenResponse.id_token.sub
        const displayName = tokenResponse.id_token.name
        const picture = tokenResponse.id_token.picture
        // TODO: user info should be store in DB while session should store only user-id
        req.session["user"] = {
            user_id: lineUserId,
            disp_name: displayName,
            picture
        }
        var Logintype = req.session.Logintype
        console.log(Logintype)
        //buyerlogin 
        if (Logintype.Logintype == 'buyer') {
            delete req.session.Logintype
            res.redirect('http://localhost:3000/userplatform')
        }
        //sellerlogin
        else if (Logintype.Logintype == 'seller') {
            delete req.session.Logintype
            res.redirect('http://localhost:3000/sellerplatform')
        }

    },
    (req, res, next, error) => {
        res.status(400).json(error);
    }))
//ログアウトとセッションの破棄
app.get('/logout', (req, res) => {
    req.session.destroy()
    res.redirect('http://localhost:3000')
})

//セッションの存在確認
const ensureLoggedIn = (req, res, next) => {
    if (req.session.user) {
        return next()
    } else {
        res.sendStatus(401)
    }
}

//セッションデータを返してセッションストレージに保存
app.get('/user', ensureLoggedIn, (req, res) => {
    const user = req.session.user
    res.json(user)
})

//RDB関連のAPI
//Marketplaceのデータ取得
app.get('/getmarketplacedata', ensureLoggedIn, async (req, res) => {
    var requestsql = 'SELECT * FROM Marketplace WHERE Saleslicense=?'
    DBconnection.query(requestsql, [true],
        (error, result) => {
            if (error) {
                console.log(error)
                res.json(error)
            }
            console.log(result);
            res.json(result)
        }
    )
})

//買い物カゴ機能のテーブルInsert
app.post('/InputBasket', ensureLoggedIn, async (req, res) => {
    const UserID = req.session.user.user_id
    const Tokentype = req.body.TokenType
    const TokenName = req.body.TokenName
    const Tokenprice = req.body.TokenPrice
    const TokenSeller_UserID = req.body.TokenSeller_UserID
    let Insertinfo = {
        User_ID: UserID,
        TokenType: Tokentype,
        TokenName: TokenName,
        TokenQuantity: 1,
        TokenPrice: Tokenprice,
        Seller_UserID: TokenSeller_UserID
    }
    DBconnection.query("insert into ShoppingBasket set ?", Insertinfo,
        (error, result) => {
            if (error) {
                res.json(error)
            }
            console.log(result)
            res.json(result)
        })

})

//買い物カゴの読み出し
app.get('/readbasketdata', ensureLoggedIn, async (req, res) => {
    const UserID = req.session.user.user_id
    const sqlrequest = 'SELECT * FROM ShoppingBasket WHERE User_ID = ?;'
    DBconnection.query(sqlrequest, [UserID],
        (error, result) => {
            if (error) {
                console.log(error)
                res.json(error)
            }
            console.log(result);
            res.json(result)
        }
    )
})

//買い物カゴの特定データの削除
app.get('/deletebasketdata', /*ensureLoggedIn,*/ async (req, res) => {
    const UserID = req.session.user.user_id
    const TokenType = req.query.TokenType
    var sqlrequest = 'DELETE FROM ShoppingBasket WHERE User_ID = ? AND TokenType = ?;'//(User_ID,TokenType) IN (("' + UserID + '","' + TokenType + '"));'
    console.log(sqlrequest)
    DBconnection.query(sqlrequest, [UserID, TokenType],
        (error, result) => {
            if (error) {
                console.log(error)
                res.json(error)
            }
            console.log(result);
            res.json(result)
        }
    )
})

//買い物カゴデータの全削除
app.get('/alldeletebasketdata', /*ensureLoggedIn,*/ async (req, res) => {
    const UserID = req.session.user.user_id
    var sqlrequest = 'DELETE FROM ShoppingBasket WHERE User_ID = ?;'
    DBconnection.query(sqlrequest, [UserID],
        (error, result) => {
            if (error) {
                console.log(error)
                res.json(error)
            }
            console.log(result);
            res.json(result)
        }
    )
})

//購入トランザクションの取得
app.get('/getbuyertransactiondata', ensureLoggedIn, async (req, res) => {
    const UserID = req.session.user.user_id
    var sqlrequest = 'SELECT * FROM BuyerInfo WHERE User_ID = ?;'
    DBconnection.query(sqlrequest, [UserID],
        (error, result) => {
            if (error) {
                console.log(error)
                res.json(error)
            }
            console.log(result);
            res.json(result)
        }
    )
})

//NFTセラー用のAPI
//Now on sale from Marketplaceのデータ取得
app.get('/getonsalenftdata', ensureLoggedIn, async (req, res) => {
    const UserID = req.session.user.user_id
    var reqestsql = 'SELECT * FROM Marketplace WHERE Seller_UserId = ?;'
    DBconnection.query(reqestsql, [UserID],
        (error, result) => {
            if (error) {
                console.log(error)
                res.json(error)
            }
            console.log(result);
            res.json(result)
        }
    )
})
//STOP Select NFT Sales(NFTの販売停止)
app.get('/stopsalesnft', ensureLoggedIn, async (req, res) => {
    const SellerUserId = req.session.user.user_id
    const Tokentype = req.query.TokenType
    var requestsql = 'UPDATE Marketplace set Saleslicense=? WHERE Seller_UserId=? AND TokenType=?;'
    DBconnection.query(requestsql, [false, SellerUserId, Tokentype],
        (error, result) => {
            if (error) {
                console.log(error)
                res.json(error)
            }
            console.log(result);
            res.json(result)
        }
    )
})
//ReStart Select NFT Salse(NFTの販売再開)
app.get('/restartsalesnft', ensureLoggedIn, async (req, res) => {
    const SellerUserId = req.session.user.user_id
    const Tokentype = req.query.TokenType
    var requestsql = 'UPDATE Marketplace set Saleslicense=? WHERE Seller_UserId=? AND TokenType=?;'
    DBconnection.query(requestsql, [true, SellerUserId, Tokentype],
        (error, result) => {
            if (error) {
                console.log(error)
                res.json(error)
            }
            console.log(result);
            res.json(result)
        }
    )
})
//NFT作成・鋳造トランザクションの取得
app.get('/getsellertransactiondata', ensureLoggedIn, async (req, res) => {
    const UserID = req.session.user.user_id
    var sqlrequest = 'SELECT * FROM SellerInfo WHERE User_ID = ?;'
    DBconnection.query(sqlrequest, [UserID],
        (error, result) => {
            if (error) {
                console.log(error)
                res.json(error)
            }
            console.log(result);
            res.json(result)
        }
    )
})

//ブロックチェーンAPIサーバー系
//Create NFT Api
app.get('/createnft', ensureLoggedIn, async (req, res) => {
    const user = req.session.user
    const tokenname = req.query.TokenName
    try {
        const resp = await ylb.CreateNFT(tokenname, user.user_id)
        res.json(resp)
    } catch (error) {
        console.log(error)
        res.json(error)
    }
})

//Create Transaction確認API
app.post('/transaction', ensureLoggedIn, async (req, res) => {
    const UserId = req.session.user.user_id
    const txHash = req.body.TxHashId
    const TokenName = req.body.TokenName
    const TokenPrice = req.body.Tokenprice
    const TokenSalesAmount = req.body.TokenSalesAmount
    const Tokenkind = req.body.Tokenkind
    try {
        const Txresult = await lbp.gettransactionresult(txHash)
        console.log(Txresult)
        InsertNFTCreatInfo(UserId, TokenName, Txresult.responseData.logs[0].events[0].attributes[1].value, TokenPrice, TokenSalesAmount, Tokenkind)
        InsertSellerInfoTable(UserId, txHash, TokenName, Txresult.responseData.logs[0].events[0].attributes[1].value, TokenPrice)
        res.json(Txresult)
    }
    catch (error) {
        console.log(error)
        res.json(error)
    }
})
//Insert NFT CreateInfo
function InsertNFTCreatInfo(UserId, TokenName, TokenType, Tokenprice, SalesAmount, Tokenkind) {
    const getMerketplacetablelimit1 = 'SELECT * FROM Marketplace order by id desc limit 1'
    DBconnection.query(getMerketplacetablelimit1,
        (error, result) => {
            if (error) {
                console.log(error)
            }
            console.log(result);
            const Insertquery = "insert into Marketplace set ?"
            let Insertinfo = {
                id: 1,
                TokenName: TokenName,
                TokenType: TokenType,
                TokenPlice: Tokenprice,
                Seller_UserId: UserId,
                NFTType: Tokenkind,
                Saleslicense: true,
                MessageCardTotal: 0,
                TokenSalesAmount: SalesAmount,
                Numbersofsales: 0
            }
            DBconnection.query(Insertquery, Insertinfo,
                (error, result) => {
                    if (error) {
                    }
                    console.log(result)
                }
            )
        }
    )
}
//Insert  SellerInfoTableCreate
function InsertSellerInfoTable(UserId, TxHashId, TokenName, TokenType, TokenPrice) {
    const Insertquery = "insert into SellerInfo set ?"
    const timestamp = new Date().getTime().toString().slice(0, 10)
    let SellerInfo = {
        user_id: UserId,
        timestamp: timestamp,
        TxHashID: TxHashId,
        TokenName: TokenName,
        TokenType: TokenType,
        Action: 'Create',
        TokenPrice: TokenPrice
    }
    DBconnection.query(Insertquery, SellerInfo,
        (error, result) => {
            if (error) {
                return error
            }
            console.log(result)
            return result
        }
    )
}

//NFT購入用のAPI
app.post('/buynft', ensureLoggedIn, async (req, res) => {
    const Tokenname = req.body.tokenname
    const TokenType = req.body.tokentype
    const Tokenprice = req.body.Tokenprice
    const SellerUserId = req.body.SellerUserId
    const UserId = req.session.user.user_id
    try {
        const resp = await ylb.BuyNFT(Tokenname, UserId, TokenType)
        console.log(resp)
        IncrementNumberofsalesCollum(SellerUserId, TokenType)
        InsertSellerInfoTableminthystory(SellerUserId, resp.responseData.txHash, Tokenname, TokenType)
        InsertBuyerInfoTablepurchaisehystory(UserId, resp.responseData.txHash, Tokenname, TokenType, Tokenprice)
        res.json(resp)
    }
    catch (error) {
        console.log(error)
        res.json(error)
    }
})
//インクリメント(販売数:marketplacetable)
function IncrementNumberofsalesCollum(SellerUserId, TokenType) {
    const Selectquery = "SELECT * FROM Marketplace WHERE Seller_UserId = ? AND TokenType = ?;"
    DBconnection.query(Selectquery, [SellerUserId, TokenType],
        (error, result) => {
            if (error) {
                return error
            }
            console.log(result[0].Numbersofsales)
            const setnum = result[0].Numbersofsales + 1
            if (setnum == result[0].TokenSalesAmount) {
                const Updatequery = 'UPDATE Marketplace set Numbersofsales=? ,Saleslicense=? WHERE Seller_UserId=? AND TokenType=?;'
                DBconnection.query(Updatequery, [setnum, false, SellerUserId, TokenType],
                    (error, result) => {
                        if (error) {
                            console.log(error)
                        }
                        console.log(result)
                        const Deletequery = 'DELETE FROM ShoppingBasket WHERE TokenType = ?;'
                        DBconnection.query(Deletequery, [TokenType],
                            (error, result) => {
                                if (error) {
                                    console.log(error)
                                }
                                console.log(result)
                            }
                        )
                    }
                )
            } else {
                const Updatequery = 'UPDATE Marketplace set Numbersofsales=? WHERE Seller_UserId=? AND TokenType=?;'
                DBconnection.query(Updatequery, [setnum, SellerUserId, TokenType],
                    (error, result) => {
                        if (error) {
                            console.log(error)
                        }
                        console.log(result)
                    }
                )
            }
        }
    )
}
//Insert  SellerInfoTablemintinghystory
function InsertSellerInfoTableminthystory(SellerUserId, TxHashId, TokenName, TokenType, Tokenprice) {
    const Insertquery = "insert into SellerInfo set ?"
    const timestamp = new Date().getTime().toString().slice(0, 10)
    let SellerInfo = {
        user_id: SellerUserId,
        timestamp: timestamp,
        TxHashID: TxHashId,
        TokenName: TokenName,
        TokenType: TokenType,
        Action: 'Minting',
        Tokenprice: Tokenprice
    }
    DBconnection.query(Insertquery, SellerInfo,
        (error, result) => {
            if (error) {
                return error
            }
            console.log(result)
            return result
        }
    )
}
//Insert  BuyerInfoTablepurchaisehystory
function InsertBuyerInfoTablepurchaisehystory(BuyerUserId, TxHashId, TokenName, TokenType, Tokenprice) {
    const Insertquery = "insert into BuyerInfo set ?"
    const timestamp = new Date().getTime().toString().slice(0, 10)
    let BuyerInfo = {
        user_id: BuyerUserId,
        timestamp: timestamp,
        TxHashID: TxHashId,
        TokenName: TokenName,
        TokenType: TokenType,
        Tokenprice: Tokenprice
    }
    DBconnection.query(Insertquery, BuyerInfo,
        (error, result) => {
            if (error) {
                return error
            }
            console.log(result)
            return result
        }
    )
}

//Multi-mintingNFT(買い物カゴ)//ベースコード
app.post('/buyfrombasket', ensureLoggedIn, async (req, res) => {
    var i
    const TokenArray = []
    const TokenTypeArray = []
    const TokenNameArray = []
    const TokenpriceArray = []
    const TokenSellerUserIDArray = []
    var elementnum = Object.keys(req.body[0]).length
    for (i = 0; i <= elementnum - 1; i++) {
        TokenArray.push(req.body[0]['token' + (i + 1)])
        TokenTypeArray.push(req.body[0]['token' + (i + 1)].tokenType)
        TokenNameArray.push(req.body[0]['token' + (i + 1)].name)
        TokenpriceArray.push(req.body[1]['token' + (i + 1)].Tokenprice)
        TokenSellerUserIDArray.push(req.body[1]['token' + (i + 1)].Seller_UserId)
    }
    const BuyerUserId = req.session.user.user_id
    try {
        const Txresult = await ylb.MultiParchaiseNFT(TokenArray, BuyerUserId)
        IncrementNumberofsalesCollumformultimint(TokenSellerUserIDArray, TokenTypeArray)
        InsertSellerInfoTableminthystorymultimint(TokenSellerUserIDArray, Txresult.responseData.txHash, TokenNameArray, TokenTypeArray, TokenpriceArray)
        InsertBuyerInfoTablepurchaisehystorymultimint(BuyerUserId, Txresult.responseData.txHash, TokenNameArray, TokenTypeArray, TokenpriceArray)
        Alldeletebasket(BuyerUserId)
        res.json(Txresult)
    }
    catch (error) {
        console.log(error)
        res.json(error)
    }
})
//インクリメント(販売数:marketplacetable):Multiminting
function IncrementNumberofsalesCollumformultimint(SellerUserIdArray, TokenTypeArray) {
    var i
    for (i = 0; i <= TokenTypeArray.length - 1; i++) {
        IncrementNumberofsalesCollum(SellerUserIdArray[i], TokenTypeArray[i])
    }
}
//Insert  SellerInfoTablemintinghystory(multiminting)
function InsertSellerInfoTableminthystorymultimint(SellerUserIdArray, TxHashId, TokenNameArray, TokenTypeArray, TokenpriceArray) {
    var i
    for (i = 0; i <= TokenTypeArray.length - 1; i++) {
        InsertSellerInfoTableminthystory(SellerUserIdArray[i], TxHashId, TokenNameArray[i], TokenTypeArray[i], TokenpriceArray[i])
    }
}

//Insert  BuyerInfoTablepurchaisehystory
function InsertBuyerInfoTablepurchaisehystorymultimint(BuyerUserId, TxHashId, TokenNameArray, TokenTypeArray, TokenpriceArray) {
    var i
    for (i = 0; i <= TokenTypeArray.length - 1; i++) {
        InsertBuyerInfoTablepurchaisehystory(BuyerUserId, TxHashId, TokenNameArray[i], TokenTypeArray[i], TokenpriceArray[i])
    }
}
//買い物カゴのデータ削除
function Alldeletebasket(UserID) {
    var sqlrequest = 'DELETE FROM ShoppingBasket WHERE User_ID = ?;'
    DBconnection.query(sqlrequest, [UserID],
        (error, result) => {
            if (error) {
                console.log(error)
            }
            console.log(result);
        }
    )
}

//Create NFT messagecard
//NFTcard送信用のAPI
app.post('/mintnftmessage', ensureLoggedIn, async (req, res) => {
    const Tokenname = 'Messagecard'
    const TokenType = '10000060' //メッセージカードのNFTトークンType
    const EncodedToCreaterID = req.body.toCreaterId
    const ToCreaterID = Buffer.from(EncodedToCreaterID, 'base64').toString()
    const Tokentype = req.body.TokenType //インクリメントターゲット
    try {
        const resp = await ylb.SendMessageNFT(Tokenname, ToCreaterID, TokenType)
        IncrementMessageCollum(ToCreaterID, Tokentype)
        res.json(resp)
    }
    catch (error) {
        console.log(error)
        res.json(error)
    }
})
//インクリメント(メッセージカード)
function IncrementMessageCollum(SellerUserId, TokenType) {
    const Selectquery = "SELECT * FROM Marketplace WHERE Seller_UserId = ? AND TokenType = ?;"
    DBconnection.query(Selectquery, [SellerUserId, TokenType],
        (error, result) => {
            if (error) {
                return error
            }
            console.log(result[0].MessageCardTotal)
            const setnum = result[0].MessageCardTotal + 1
            const Updatequery = 'UPDATE Marketplace set MessageCardTotal=? WHERE Seller_UserId=? AND TokenType=?;'
            DBconnection.query(Updatequery, [setnum, SellerUserId, TokenType],
                (error, result) => {
                    if (error) {
                        return error
                    }
                    console.log(result)
                }
            )
        }
    )
}
//UserApi
//UserのNFTバランスの取得
app.get('/getnftbalance', ensureLoggedIn, async (req, res) => {
    const user = req.session.user
    try {
        const Txresult = await ylb.GetNFTBalance(user.user_id)
        res.json(Txresult)
    }
    catch (error) {
        console.log(error)
        res.json(error)
    }
})

app.listen(3080);

module.exports = {
    path: '/api/',
    handler: app
}