import React, { ReactNode, FC, ChangeEvent, useState } from 'react';
import { makeStyles, Theme, createStyles, withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Check from '@material-ui/icons/Check';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import DoneIcon from '@material-ui/icons/Done';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import StepConnector from '@material-ui/core/StepConnector';
import { StepIconProps } from '@material-ui/core/StepIcon';
import './userplatformscreenCSS/NFTShopingbasket.css'
import SpannningTable from './Tablecompornent'

import axios from 'axios';


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
    1: <ShoppingCartIcon />,
    2: <CreditCardIcon />,
    3: <DoneIcon />,
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
  return ['Please Check Your Cart', 'Agree and Payment', 'Parchaice complete'];
}


const BasketSteppersandBasket = () => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [count, setcount] = useState(0)
  const steps = getSteps();

  const PaymentandAgreeNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  //カートの中身
  const DeleteAllFromBasket = () => {
    var requestURL = "http://localhost:3080/alldeletebasketdata"
    axios.get(requestURL,
      {
        withCredentials: true   //coolie共有
      }).then(function (result) {
        console.log(result)
        setcount(count + 1)
      }).catch(function (error) {
        console.log(error)
      })
  }

  const Showchange = () => {
    switch (activeStep) {
      case 0:
        return (
          <div>
            <Shoppingbasket />
            <div className='Shopingbasketbutton'>
              <button className='BuyNFTinbasket' onClick={PaymentandAgreeNext}>規約同意画面へ</button>
              <button className='Emptybasket' onClick={DeleteAllFromBasket}>カートを空にする</button>
            </div>
          </div>
        )
      case 1:
        return (
          <div>
            <AgreementAndPayment />
            <div className='Shopingbasketbutton'>
              <button className='Emptybasket' onClick={handleBack}>カートに戻る</button>
            </div>
          </div>
        )
      case 2:
        return (
          <div>
            <AgreementAndPayment />
            <div className='Shopingbasketbutton'>
              <button className='BuyNFTinbasket' onClick={handleBack}>規約を再確認</button>
              <button className='Emptybasket' onClick={handleReset}>カートに戻る</button>
            </div>
          </div>
        )
    }
    return (
      <div>
        <Shoppingbasket />
        <div className='Shopingbasketbutton'>
          <button className='BuyNFTinbasket' onClick={PaymentandAgreeNext}>規約同意画面へ</button>
          <button className='Emptybasket' >カートを空にする</button>
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

export default BasketSteppersandBasket;
//

{/*<div>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>
              All steps completed - you&apos;re finished
            </Typography>
            <Button onClick={handleReset} className={classes.button}>
              Reset
            </Button>
          </div>
        ) : (
            <div>
              <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                Back
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                className={classes.button}
              >
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </div>
          )}
      </div>*/ }


//shoppingカートのメイン画面
const Shoppingbasket = () => {

  return (
    <div>
      <div className='Shopingbaskettitle'>Your Shopping basket</div>
      <hr className='Shopingbaskethorline' />
      <div className='Shopingbasketsubtitle'>カートの中身</div>
      <hr className='Shopingbasketsubtitlehorline' />
      <div className='Shopingbasketheader'>ご注文内容</div>
      <SpannningTable />
    </div>
  )
}



//購入にあたっての規約への同意
const AgreementAndPayment = () => {
  var totalprice = sessionStorage.getItem('UserTotalprice')

  return (
    <div>
      <div className='Shopingbaskettitle'>Agrement terms ＆ Finally Confirm</div>
      <hr className='Shopingbaskethorline' />
      <div style={{ textAlign: 'center' }}>内容の中身は現在協議中</div>
      <hr className='Shopingbasketsubtitlehorline' />
      <div className='Agreementwindow'>
        第 12 条（反社会的勢力の排除）
        利用者は、自ら又は子会社もしくは関連会社又はその役職員もしくは取引先等が、反社会的勢力（暴力、威力と詐欺的手法を駆使して経済的利益を追求し、又は暴力的な要求行為、法的な責任を超えた不当な要求行為を行う個人又は集団の一切をいう。暴力団、暴力団員、暴力団員でなくなった時から 5 年を経過しない者、暴力団関係企業、総会屋、社会標ぼうゴロ、政治活動標ぼうゴロ、特殊知能暴力集団等を含むが、これに限られません。）ではなく、直接又は間接を問わず何らの資金上その他の関係はなく、名目の如何を問わず資金提供その他一切の取引を行っておらず、かつ今後行う予定もないことを確約します。
        当社は、利用者が反社会的勢力に該当し、又は、反社会的勢力と以下の各号の一にでも該当する関係を有することが判明した場合には、何らの催告を要せず、本サービスの提供を停止し、利用者との契約を解除することができるものとします。
        反社会的勢力が経営を支配していると認められるとき
        反社会的勢力が経営に実質的に関与していると認められるとき
        自己もしくは第三者の不正の利益を図る目的又は第三者に損害を加える目的をもってするなど、不当に反社会的勢力を利用したと認められるとき
        反社会的勢力に対して資金等を提供し、又は便宜を供与するなどの関与をしていると認められるとき
        その他役員等又は経営に実質的に関与している者が、反社会的勢力と社会的に非難されるべき関係を有しているとき
        当社は、利用者が自ら又は第三者を利用して以下の各号の一にでも該当する行為をした場合には、何らの催告を要せず、本サービスの提供を停止し、利用者との契約を解除することができるものとします。
        暴力的な要求行為
        法的な責任を超えた不当な要求行為
        取引に関して、脅迫的な言動をし、又は暴力を用いる行為
        風説を流布し、偽計又は威力を用いて相手方の信用を棄損し、又は相手方の業務を妨害する行為
        その他前各号に準ずる行為
        当社が前 2 項の規定により利用者との契約を解除した場合には、利用者に損害が生じてもこれを賠償ないし補償することは要せず、また、かかる解除により当社に損害が生じたときは、利用者はその損害を賠償するものとします。
        第 13 条（裁判管轄）
        本規約に関し訴訟の必要が生じた場合、その訴額に応じて、東京簡易裁判所又は東京地方裁判所を第一審の専属的合意管轄裁判所とするものとします。
        第 14 条（残存条項）
        本サービス終了後も、本規約契約第３条（権利帰属）、第 5 条（非保証）、第 8 条（免責）、第 9 条（譲渡禁止）、第 11 条（miyabi マニュアルについての秘密保持）及び第 13 条（裁判管轄）の規定は存続するものとします。
        第 15 条（準拠法）
        本規約は日本法を準拠法とし、かつこれに従い解釈されるものとします。
        2020 年 3 月 17 日制定
利用規約に同意して利用開始</div>
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
              <td className='Row2'>¥{totalprice}</td>
            </tr>
          </tbody>
        </table>
        <label className="checkbox">
          <input
            type="checkbox"
            className="checkbox__main"
          />
          <span className="checkbod__label">購入規約に同意</span>
        </label>
        <button className='BuyNFTinbasket LINEPaybuttonposition' onClick={BuyNFTinbasket}>LINEPay決済へ</button>
      </div>
    </div>

  )
}



//決済前の最終確認画面
/*const FinallyPaymentConfirm = () => {
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
              <td className='Row2'>¥1,000</td>
            </tr>
          </tbody>
        </table>
        <button className='BuyNFTinbasket LINEPaybuttonposition' >LINEPay決済へ</button>
      </div>
    </div>
  )
}*/


function BuyNFTinbasket() {
  var i: any
  let Purchaiseinfo = []
  var stringbasketJson: any = sessionStorage.getItem('UserwanttobuyNFT')
  var BasketJson = JSON.parse(stringbasketJson)
  console.log(BasketJson)
  const requesturl = 'http://localhost:3080/buyfrombasket'
  axios.post(requesturl, BasketJson,
    {
      withCredentials: true   //coolie共有
    }).then(function (result) {
      console.log(result)
      const txresult = result.data.responseData.txHash
      alert('NFTの購入履歴はこちらのIDにて発行しました！\n\n' + txresult + '\n\n購入したNFTは購入履歴を参照ください！')
      sessionStorage.removeItem('UserwanttobuyNFT')
    }).catch(function (error) {
      console.log(error)
    })
}