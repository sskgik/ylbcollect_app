import React, { Component, useState, useEffect } from 'react';
import { makeStyles, Theme, createStyles, withStyles } from '@material-ui/core/styles';
import { createGlobalState } from 'react-hooks-global-state';
import { useFileUpload } from 'use-file-upload'
import { sha512 } from 'js-sha512';
import clsx from 'clsx';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Check from '@material-ui/icons/Check';
import BuildIcon from '@material-ui/icons/Build';
import CreateIcon from '@material-ui/icons/Create';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import StepConnector from '@material-ui/core/StepConnector';
import { StepIconProps } from '@material-ui/core/StepIcon';
import './sellerplatformscreenCSS/NFTcreateinputformat.css';
import axios from 'axios';

//Global state
/*const initialState = {
  TokenName: '',
  Tokenprice: '',
  TokenSalesAmount: '',
  Tokenkind: 'photo'
};
//Globalstateの初期化
const { useGlobalState } = createGlobalState(initialState);
*/
//Steppersbar
const QontoConnector = withStyles({
  alternativeLabel: {
    top: 10,
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)',
  },
  active: {
    '& $line': {
      borderColor: '#784af4',
    },
  },
  completed: {
    '& $line': {
      borderColor: '#784af4',
    },
  },
  line: {
    borderColor: '#eaeaf0',
    borderTopWidth: 3,
    borderRadius: 1,
  },
})(StepConnector);

const useQontoStepIconStyles = makeStyles({
  root: {
    color: '#eaeaf0',
    display: 'flex',
    height: 22,
    alignItems: 'center',
  },
  active: {
    color: '#784af4',
  },
  circle: {
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: 'currentColor',
  },
  completed: {
    color: '#784af4',
    zIndex: 1,
    fontSize: 18,
  },
});

function QontoStepIcon(props: StepIconProps) {
  const classes = useQontoStepIconStyles();
  const { active, completed } = props;

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
      })}
    >
      {completed ? <Check className={classes.completed} /> : <div className={classes.circle} />}
    </div>
  );
}

const ColorlibConnector = withStyles({
  alternativeLabel: {
    top: 22,
  },
  active: {
    '& $line': {
      backgroundImage:
        'linear-gradient( 95deg,rgb(6, 250, 6) 0%, rgb(0, 231, 0) 50%, rgb(6, 250, 6) 100%)',
    },
  },
  completed: {
    '& $line': {
      backgroundImage:
        'linear-gradient( 95deg,rgb(6, 250, 6) 0%, rgb(0, 231, 0) 50%, rgb(6, 250, 6) 100%)',
    },
  },
  line: {
    height: 3,
    border: 0,
    backgroundColor: '#eaeaf0',
    borderRadius: 1,
  },
})(StepConnector);

const useColorlibStepIconStyles = makeStyles({
  root: {
    backgroundColor: '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 50,
    height: 50,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  active: {
    backgroundImage:
      'linear-gradient( rgb(6, 250, 6) 0%, rgb(0, 231, 0) 50%, rgb(6, 250, 6) 100%)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  },
  completed: {
    backgroundImage:
      'linear-gradient( 136deg, rgb(6, 250, 6) 0%, rgb(0, 231, 0) 50%, rgb(6, 250, 6) 100%)',
  },
});

function ColorlibStepIcon(props: StepIconProps) {
  const classes = useColorlibStepIconStyles();
  const { active, completed } = props;

  const icons: { [index: string]: React.ReactElement } = {
    1: <BuildIcon />,
    2: <CreateIcon />,
    3: <CreditCardIcon />,
  };

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}
    >
      {icons[String(props.icon)]}
    </div>
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    button: {
      marginRight: theme.spacing(1),
    },
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
  }),
);

function getSteps() {
  return ['Create NFT Data ', 'Agree to the Our terms', 'Payment money'];
}


const CreateSteppersandPayment = () => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const FirsthandleNext = () => {
    var Tokennamechhk = sessionStorage.getItem('CreateNFTTokenName')
    var Tokenpricechk = sessionStorage.getItem('CreateNFTTokenPrice')
    var Tokensaleslimitchk = sessionStorage.getItem('CreateNFTTokenSalesAmount')
    var Tokensalestype = sessionStorage.getItem('CreateNFTTokenkind')
    var chkresult = Chkinputvalue(Tokennamechhk, Tokenpricechk, Tokensaleslimitchk, Tokensalestype)
    switch (chkresult) {
      case 1://TokenTypeの入力違反
        alert('Token Nameを正しく入力してください！')
        return
      case 2://Token priceの入力違反
        alert('Token Sell Priceを正しく入力してください!')
        return
      case 3://Token sales limit の入力違反
        alert('Token Sales Limitを正しく入力してください!')
        return
      case 4://NFT types の未洗濯
        alert('Choise NFT Typeを正しく選択してください!')
        return
      default:
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack1 = async () => {
    var json: any = sessionStorage.getItem('Userinfo')
    var Userinfo: any = JSON.parse(json)
    if (Userinfo == null) {
      GetUserID()
      await _sleep(200)
    }
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleBack2 = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = async () => {
    var json: any = sessionStorage.getItem('Userinfo')
    var Userinfo: any = JSON.parse(json)
    if (Userinfo == null) {
      GetUserID()
      await _sleep(200)
    }
    setActiveStep(0);
  };

  const Showchange = () => {
    switch (activeStep) {
      case 0:
        return (
          <div>
            <CreateNFTInput />
            <div className='CreateNFTbuttonArea'>
              <button className='CreateNFTnext' onClick={FirsthandleNext}>規約同意画面へ</button>
              <button className='ClearandBack' >All Clear</button>
            </div>
          </div>
        )
      case 1:
        return (
          <div>
            <Agreementterms />
            <div className='CreateNFTbuttonArea'>
              <button className='CreateNFTnext' onClick={handleNext}>規約に同意し次へ</button>
              <button className='ClearandBack' onClick={handleBack1}>前のページへ</button>
            </div>
          </div>
        )
      case 2:
        return (
          <div>
            <FinallyPaymentConfirm />
            <div className='CreateNFTbuttonArea'>
              <button className='CreateNFTnext' onClick={handleBack2}>規約を再確認</button>
              <button className='ClearandBack' onClick={handleReset}>作成画面に戻る</button>
            </div>
          </div>
        )
    }
    return (
      <div>
        <CreateNFTInput />
        <div className='CreateNFTbuttonArea'>
          <button className='CreateNFTnext' onClick={handleNext}>規約同意画面へ</button>
          <button className='ClearandBack' >All Clear</button>
        </div>
      </div>
    )
  }

  return (
    <div className='Shopingbasketbody'>
      <div className={classes.root}>
        <Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </div>
      <Showchange />
    </div>
  );
}

export default CreateSteppersandPayment;

//sessionstrage値チェック
const Chkinputvalue = (TokenType: any, Tokenprice: any, TokensalesAmount: any, SalesTokentype: any) => {
  if (TokenType == '' || TokenType == null) {
    return 1
  }
  else if (Tokenprice == '' || Tokenprice == null) {
    return 2
  }
  else if (TokensalesAmount == '' || TokensalesAmount == null) {
    return 3
  }
  else if (SalesTokentype == '' || SalesTokentype == null) {
    return 4
  }
  else {
    return 5
  }
}

//shoppingカートのメイン画面
// Create NFT inputNFT Area
const CreateNFTInput = (props: any) => {
  const handleFileUpload = ({ files }: any) => {
    //const file = files[0];
    console.log(files)
    // send file to server here the way you need
  }

  return (
    <div className='CreateNFTbodyArea'>
      <div className='CreateNFTbodyDetail'>
        <div className='NFTCreateTitle'>Create Your NFT</div>
        <hr className='CreateNFThorline' />
        <div className='NFTcreateinfo'>
          <div className='InputArealeft'>
            <div className='NFTTokenNameInput borderbottom'>
              <InputTokenname />
            </div>
            <div className='NFTTokenPrice borderbottom'>
              <InputTokenPrice />
            </div>
            <div className='NFTSalesLimit borderbottom'>
              <InputSalesAmount />
            </div>
            <div className='NFTSalesLimit'>
              <ChoseSalesTypes />
            </div>
          </div>
          <div className='InputArearight'>
            <div className='ImagedropArea'>
              <FileUploadPage />
              {/*<p className='dropareatxt'>ここにファイルを<br></br>ドロップしてください</p>
              <input type="file" name='uploadNFTimage' className='uploadNFTimage' onChange={(e) => handleFileUpload(e)} />*/}
            </div>
            <div className='NFTTokenIssueUserId borderbottom'>
              <ShowUserID />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

{/*<div>NFTとはクリエイターのトレカ、風景写真、イラストなど様々なコンテンツを<br></br>唯一無二のものとして販売できるツールです</div>
        <form className='inputform'>

        </form>
        <label className='itemtitle'>Token Image</label>
        <p className='dropareatxt'>ここにファイルを<br></br>ドロップしてください</p>
        <input type="file" name='uploadNFTimage' className='uploadNFTimage' />
        <label className='itemtitle'>Token Owner Wallet</label>
        <div className='flexownerwallet'>
          <div className='Ownerlogomark'>owner</div>
          <label className='itemtitle ownerkey'>tlink1sa........................5tjn6y5</label>
        </div>
        <p className='TokenameInputinfo'>トークン発行に必要な共通のパブリックキーです</p>
        <label className='itemtitle'>Payment Information</label>
        <p className='itemtitle'>発行手数料 ¥X,XXX</p>
        <p className='TokenameInputinfo'>トークン発行にかかる諸費用はNFTの発行だけでなく<br></br>皆様のコンテンツ保護のセキュリティに当てております</p>
        <div className='flexactionbutton'>
          <div className='cancelbutton'>キャンセル</div>
          <div className='createbutton' >作成とお支払い</div>
        </div>*/


                    /*} <div className='inputform'>
                <label className='itemtitle'>Your UserId</label>
                <input type='text' className='LINEUserID' value='Ue5d0ef464be38fa8e4fa8ef4adaba9e6' spellCheck='false' readOnly />
                <p className='TokenameInputinfo'>NFT Creater の LINE UserId</p>
  </div>

<div className='inputform'>
                <label className='itemtitle'>Create Owner Acount</label>
                <input type='text' className='OwnerWalletkey' value='tlink1sactxhklr6l3lchs87n7anxkhs2w0km5tjn6y5' spellCheck='false' readOnly />
                <p className='TokenameInputinfo'>NFT Owner Key</p>
              </div>*/}

//input Token Name & value check
function InputTokenname() {

  const [permit, setPermit] = useState(false);
  const [disallowd, setDisallowed] = useState(false);
  const [TokenName, setTokenName] = useState("");
  useEffect(() => {
    sessionStorage.setItem('CreateNFTTokenName', TokenName)
  })
  const InputCheck = (textValue: any) => {
    let stringcheck = /^[0-9a-zA-Z]+$/.test(textValue) //半角英数字（空文字NG)
    let count: number = textValue.length;
    if (stringcheck == true) {
      if (count >= 1 && count < 3) {
        setPermit(false)
        setDisallowed(true)
        setTokenName('')
      }
      else if (count >= 20) {
        setPermit(false)
        setDisallowed(true)
        setTokenName('')
      }
      else {
        setPermit(true)
        setDisallowed(false)
        setTokenName(textValue)
      }
    }
    else {
      setPermit(false)
      setDisallowed(true)
      setTokenName('')
    }
  }

  return (
    <div className='inputform'>
      <label className='itemtitle'>Token Name</label>
      <input type='text' className={`NFTinputname ${permit && "permit"} ${disallowd && "disallowd"}`} onChange={(e: React.ChangeEvent<HTMLInputElement>) => InputCheck(e.target.value)} spellCheck='false' />
      <p className={` ${permit && "warningtettranparent"} ${disallowd ? "Warningtext" : "warningtettranparent"}`}>Token Nameを正しく入力してください</p>
      <p className='TokenameInputinfo'>3~20文（英数字）で登録してください</p>
    </div>
  )
}

//input Token Name & value check
function InputTokenPrice() {
  const [permit, setPermit] = useState(false);
  const [disallowd, setDisallowed] = useState(false);
  const [Tokenprice, setTokenPrice] = useState("");
  useEffect(() => {
    sessionStorage.setItem('CreateNFTTokenPrice', Tokenprice)
  })
  const InputCheck = (textValue: any) => {
    let stringcheck = /^([1-9]\d*|0)$/.test(textValue) //半角数字のみ許可
    if (Number(textValue) >= 300) {
      if (stringcheck == true) {
        setPermit(true)
        setDisallowed(false)
        setTokenPrice(textValue)
      }
      else {
        setPermit(false)
        setDisallowed(true)
        setTokenPrice('')
      }
    }
    else {
      setPermit(false)
      setDisallowed(true)
      setTokenPrice('')
    }
  }
  var inputprice = sessionStorage.getItem('CreateNFTTokenPrice')
  return (
    <div className='inputform'>
      <label className='itemtitle'>NFT Sell Price （販売価格:¥）</label>
      <input type='text' className={`NFTprice ${permit && "permit"} ${disallowd && "disallowd"}`} onChange={(e: React.ChangeEvent<HTMLInputElement>) => InputCheck(e.target.value)} spellCheck='false' />
      <p className={` ${permit && "warningtettranparent"} ${disallowd ? "Warningtext" : "warningtettranparent"}`}>金額を正しく入力してください</p>
      <p className='TokenameInputinfo'>希望の販売価格（300円以上）を入力してください（半角数字のみ）</p>
    </div>
  )
}

//販売数の指定
function InputSalesAmount() {

  const [permit, setPermit] = useState(false);
  const [disallowd, setDisallowed] = useState(false);
  const [TokenSalesAmount, setTokenSalesAmount] = useState("");
  useEffect(() => {
    sessionStorage.setItem('CreateNFTTokenSalesAmount', TokenSalesAmount)
  })
  const InputCheck = (textValue: any) => {
    let stringcheck = /^([1-9]\d*|0)$/.test(textValue) //半角数字のみ許可
    if (stringcheck == true) {
      setPermit(true)
      setDisallowed(false)
      setTokenSalesAmount(textValue)
    }
    else {
      setPermit(false)
      setDisallowed(true)
      setTokenSalesAmount('')
    }
  }
  return (
    <div className='inputform'>
      <label className='itemtitle'>NFT Sales Limit（希望販売数）</label>
      <input type='text' className={`InputNFTsaleslimit ${permit && "permit"} ${disallowd && "disallowd"}`} onChange={(e: React.ChangeEvent<HTMLInputElement>) => InputCheck(e.target.value)} spellCheck='false' />
      <p className={` ${permit && "warningtettranparent"} ${disallowd ? "Warningtext" : "warningtettranparent"}`}>販売個数を正しく入力してください</p>
      <p className='TokenameInputinfo'>希望の販売個数を入力してください（半角数字のみ）<br></br>入力のない場合は販売制限はありません！</p>
    </div>
  )
}

//NFTの種類選択
function ChoseSalesTypes(props: any) {
  const [Tokenkind, setTokenkind] = useState("")
  useEffect(() => {
    console.log(Tokenkind)
    sessionStorage.setItem('CreateNFTTokenkind', Tokenkind)
  })
  return (
    <div className='inputform'>
      <label className='itemtitle'>Choise NFT Type（NFT Type 選択）</label>
      <select name="NFTTypeschose" className='NFTTypeschose' onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setTokenkind(e.target.value)}>
        <option value="">種類を選択してください</option>
        <option value="photo">写真（風景、世界遺産等）</option>
        <option value="Illustration">イラスト・アート</option>
        <option value="Tradecard">デジタルトレカ（コスプレ・アニメ）</option>
      </select>
      <p className='TokenameInputinfo'>販売希望のNFTの種類を選択</p>
    </div>
  )
}
//Fileuploader
function FileUploadPage() {
  const [selectedFile, setSelectedFile] = useState("");
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [fileUrl, setFileUrl] = useState('');

  useEffect(() => {
    if (selectedFile == '') {
      return
    }
    const selectfile = selectedFile
    const imageurl = URL.createObjectURL(selectfile)
    setFileUrl(imageurl)
  }, [selectedFile])
  const changeHandler = (event: any) => {
    console.log(event.target.files[0])
    setSelectedFile(event.target.files[0]);
    setIsFilePicked(true);
  };
  const checkstate = () => {
    console.log(selectedFile)
    console.log(isFilePicked)
  }

  const handleSubmission = () => {
    /*ファイルデータ送信するかどうか後からアーキテクチャ次第*/
  };
  if (!fileUrl) {
    return (
      <div>
        <div className='itemtitleupload'>Token Image</div>
        <label className='dropareatxt'>
          <span>NFT化する画像を<br></br><br></br>アップロード（jpg,png）</span>
          <input type="file" name="file" className='uploadNFTimage' onChange={(e) => changeHandler(e)} />
        </label>
        <label className='dropareabutton'>
          アップロード
          <input type="file" name="file" className='uploadNFTimage' onChange={(e) => changeHandler(e)} />
        </label>
      </div>
    );
  }
  else {
    return (
      <div>
        <div className='itemtitleupload'>Token Image</div>
        <img className='uploadimagedata' src={fileUrl}></img>
        <label className='dropareabutton'>
          イメージ変更
          <input type="file" name="file" className='uploadNFTimage' onChange={(e) => changeHandler(e)} />
        </label>
      </div>
    );
  }
}

//Get login UserID from cash (node.js session)
function ShowUserID() {
  var json: any = sessionStorage.getItem('Userinfo')
  var Userinfo: any = JSON.parse(json)
  var UserId: any = Userinfo.UserID

  return (
    <div className='inputform'>
      <label className='itemtitle'>Your UserId</label>
      <input type='text' className='LINEUserID' value={UserId} spellCheck='false' readOnly />
      <p className='TokenameInputinfo'>NFT Creater の LINE UserId</p>
    </div>
  )
}

const GetUserID = () => {
  const Requesturl = 'http://localhost:3080/user'
  var userinfo = {
    UserIcon: '',
    Username: '',
    UserID: ''
  };
  axios.get(Requesturl, {
    withCredentials: true   //coolie共有
  }).then(function (user) {
    let UserPicture: string = user.data.picture;
    let Username: string = user.data.disp_name;
    let UserID: string = user.data.user_id;
    userinfo["UserIcon"] = UserPicture;
    userinfo["Username"] = Username;
    userinfo["UserID"] = UserID;
    sessionStorage.setItem('Userinfo', JSON.stringify(userinfo));
    return UserID
  }).catch(function (error) {
    console.log(error)
    return '取得に失敗しました！ログアウト後再ログインを推奨します'
  })
}


//購入にあたっての規約への同意
const Agreementterms = () => {
  return (
    <div>
      <div className='Shopingbaskettitle'>Agrement terms</div>
      <hr className='Shopingbaskethorline' />
      <div style={{ textAlign: 'center' }}>内容の中身は現在協議中</div>
      <hr className='Shopingbasketsubtitlehorline' />
      <div></div>
    </div>
  )
}

//決済前の最終確認画面
const FinallyPaymentConfirm = () => {
  return (
    <div>
      <div className='Shopingbaskettitle'>Finally Confirm</div>
      <hr className='Shopingbaskethorline' />
      <div style={{ textAlign: 'center' }}>決済内容</div>
      <hr className='Shopingbasketsubtitlehorline' />
      <div className='Finalpaymentinfomation'>
        <table>
          <tbody>
            <tr>
              <td className='Row1'>決済方法</td>
              <td className='Row2'>LINE Pay</td>
            </tr>
            <hr className='tablehr' />
            <tr>
              <td className='Row1'>お支払い合計</td>
              <td className='Row2'>¥X,XXX</td>
            </tr>
          </tbody>
        </table>
        <button className='BuyNFTinbasket LINEPaybuttonposition' onClick={CreateNFTtoAPI}>LINEPay決済へ</button>
      </div>
    </div>
  )
}

//CreateNFT関数(フォーム内のtextboxからtokennameを取得して登録されたPNG or Jpg画像をファイル名を変えてアップロードを行う)
function CreateNFTtoAPI() {
  const TokenName = sessionStorage.getItem('CreateNFTTokenName')
  const Tokenprice = sessionStorage.getItem('CreateNFTTokenPrice')
  const TokenSalesAmount = sessionStorage.getItem('CreateNFTTokenSalesAmount')
  const Tokenkind = sessionStorage.getItem('CreateNFTTokenkind')
  const requesturl = `http://localhost:3080/createnft?TokenName=${TokenName}`
  axios.get(requesturl,
    {
      withCredentials: true   //coolie共有
    })
    .then(async function (result) {
      console.log(result)
      const txhashid = result.data.responseData.txHash
      const CreateInfo = {
        TxHashId: txhashid,
        TokenName: TokenName,
        Tokenprice: Tokenprice,
        TokenSalesAmount: TokenSalesAmount,
        Tokenkind: Tokenkind
      }
      const txhashcheckurl = `http://localhost:3080/transaction`
      //念のためブロック２つ分の時間を考慮
      await _sleep(4000)
      alert('発行したNFTの発行履歴はこちら\n\n' + txhashid + '\n\n続いてトークン情報を取得しDBに登録します')
      axios.post(txhashcheckurl, CreateInfo,
        {
          withCredentials: true   //coolie共有
        })
        .then(function (txhashresult) {
          console.log(txhashresult)
          const tokentype = txhashresult.data.responseData.logs[0].events[0].attributes[1].value
          alert('あなたのトークンナンバーは\n\n' + tokentype + '\n\nトークンネームは\n\n' + TokenName)
          //console.log(error)
        })
    }).catch(function (error) {
      console.log(error)
    })
}

const _sleep = (ms: any) => new Promise((resolve) => setTimeout(resolve, ms));

//画像サーバーの画像のレスポンス取得
function Getimagedata() {
  alert()
  const requesturl = 'https://sskgik.github.io/NFTdevelopment/10000007'
  axios.get(requesturl)
    .then(function (result) {
      const data = result.data
      var hashdata = sha512(data)
      console.log(hashdata)
      return hashdata
    }).catch(function (error) {
      console.log(error)
      return null
    })
}

