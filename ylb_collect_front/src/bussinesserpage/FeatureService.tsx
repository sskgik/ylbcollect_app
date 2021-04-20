import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faWallet } from "@fortawesome/free-solid-svg-icons";
import { faFileInvoice } from "@fortawesome/free-solid-svg-icons";
import { faGem } from "@fortawesome/free-solid-svg-icons";
import './FeatureService.css';


const iconStyle: React.CSSProperties = { padding: 10, fontSize: 100, color: 'blue' };

function Feature() {
  return (
    <div className="Featurebody">
      <div className='featureinfo'>
        <p className='Featureheader'>The Feature of YLB Collect</p>
        <span className='Deatailsheader'>
          本サービスYLB Collectの具体的な特徴は以下の通り！<br></br>誰でも簡単に使えるユーザーフレンドリなサービスを目指して私たちは日々サービスでの機能を追求しています！
              皆さんが新しい価値を体験するために！</span>
      </div>
      <div className='Featureheaderbody'>
        <div className="Featureinfo1">
          <div className='Feature1'>
            <p className='FeatureHead'>簡単なNFTデータの作成と売買</p>
            <FontAwesomeIcon style={iconStyle} icon={faUser} />
            <p className='FeatureDetail'>私たちは販売者ユーザー、購入者ユーザーの皆様が簡単にNFTのデータを作成したり、簡単に売買できるプラットフォームの提供のため
                                         日々ユーザーフレンドリーなデザインを追求しています！</p>
          </div>
          <div className='Feature2'>
            <p className='FeatureHead'>ユーザーフレンドリーなウォレット</p>
            <FontAwesomeIcon style={iconStyle} icon={faWallet} />
            <p className='FeatureDetail'>LINEアカウントと紐づいたウォレット機能を提供します！ユーザーはLINE社が提供しているBITMAXウォレットまたは本サービス運営元
                                         が提供している独自ウォレットYLBモバイル（2021/2現在開発中）を自由に選ぶことが可能です！価値の交換での送り先もLINEアカウント指定で簡単</p>
          </div>
          <div className='Feature3'>
            <p className='FeatureHead'>国内共通SNSと連携したシステム基盤</p>
            <p className='LINEBLOCKCHAIN'>LINE Blockchain</p>
            <p className='FeatureDetail'>国内8000万人がアカウント登録しているLINE株式会社が提供しているブロックチェーン基盤を使うことで、LINEアカウントを持ってる型なら
                                         誰でも簡単に本サービスが利用できる環境を採用しました！</p>
          </div>
        </div>
        {/*以下２段目の構成を記入*/}
        <div className="Featureinfo2">
          <div className='Feature4'>
            <p className='FeatureHead'>豊富な支払い方法</p>
            <FontAwesomeIcon style={iconStyle} icon={faFileInvoice} />
            <p className='FeatureDetail'>私たちはLINE社のサービスも含めて以下のような支払い手段を提供します！<br></br><br></br>・LINEPay決済<br></br><br></br>
                                        ・クレジットカード決済<br></br><br></br>・LINE仮想通貨 LINK決済 <br></br><br></br>・前払式サービストークン</p>
          </div>
          <div className='Feature5'>
            <p className='FeatureHead'>LINEトークンエコノミ</p>
            <FontAwesomeIcon style={iconStyle} icon={faGem} />
            <p className='FeatureDetail'>本サービスはLINEトークンエコノミーに参加しています！サービスを利用し一定の条件をクリアしたユーザー様はLINE独自仮想通貨LINKを交換できる
            LINKリワードというポイントが付与されます！LINKに変えることでLINEPayにチャージし普段の経済圏への使用も可能になります！
                                         <br></br><br></br>（詳細はヘッダ-の~LINE Token Economy~より確認ください）</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Feature;