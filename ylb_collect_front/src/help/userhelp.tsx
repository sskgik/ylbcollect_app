import React from 'react'
import { Link } from 'react-router-dom';
import './userhelp.css'
import '../../node_modules/font-awesome/css/font-awesome.min.css';
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import "react-accessible-accordion/dist/fancy-example.css";



export default function Userhelp() {
  return (
    <div className='Userhelpbody'>
      <header className='userheader'>
        <textarea name="Index" className="IndexArea" placeholder='&#xf002; 検索キーワード'></textarea>
      </header>
      <Accordion>
        <p className='category'>よくある質問</p>
        <AccordionItem>
          <AccordionItemHeading >
            <AccordionItemButton >
              メールアドレス・パスワードが正しいのにログインできません
            </AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel >
            <p>
              本サービスではLINEログイン認証を採用しております！セキュリティ強化のため、連続してログインに失敗した場合、<br></br>
              一時的にログインを制限しています。 半日～1日ほど時間をおいて、再度ログインをお試しください。<br></br><br></br>
              時間置いてうまくいかない場合は <span className='Emphasisunderline'>QRコード ログイン認証</span>をお試しください！
            </p>
          </AccordionItemPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionItemHeading>
            <AccordionItemButton>
              NFTってなんですか？
            </AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel>
            <p>
              ブロックチェーンと呼ばれる書き換えのできないノートのようなデータベースに存在するトークンのことです<br></br>
              NFTとはユーザーの皆様に価値の高いデータを共有できるツールのことで、LINEのアプリを通して簡単に友人とデータ交換をしたりできます<br></br><br></br>

              ＊ブロックチェーン上のNFTデータは<span className='Emphasisunderline'>発行者に著作権があり不正転売やネットへの拡散は禁止</span>されております！<br></br>
              発行者の意向で配ったトークンを持ち主から償却する事もできますので！ルールを守ってお楽しみください！
            </p>
          </AccordionItemPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionItemHeading>
            <AccordionItemButton>
              BITMAXウォレットの使い方がわかりません！
            </AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel>
            <p>
              BITMAXウォレットの使い方は<span><Link className="Emphasis" target='_blank' to={'/bitmaxwalletinfo'}>こちら</Link></span>をご参考にしてください！<br></br><br></br>
              ＊BITMAXウォレットは弊社開発のウォレットサービスではございません！お問い合わせ内容によっては1~2営業日確認期間を<br></br>
              いただく場合がございます！ご了承いただきますようお願い申し上げます！
            </p>
          </AccordionItemPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionItemHeading>
            <AccordionItemButton>
              購入したはずのNFTがウォレットにありません！
            </AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel>
            <p>
              ユーザー様にて取引履歴の確認をお願いします！取引履歴の確認は<span ><Link className="Emphasis" target='_blank' to={'/explorer'}>こちら（検索ツール）</Link></span>にご自身の公開鍵を<br></br>
              虫眼鏡のマークを押して出てくる入力欄に自身の公開鍵を入れて出てくる結果（取引時間やトークンID）を確認ください！<br></br><br></br>
              検索ツールの使い方は<span className='Emphasis'>こちら（使い方）</span>
            </p>
          </AccordionItemPanel>
        </AccordionItem>
        <p className='category'>サービス</p>
        <AccordionItem>
          <AccordionItemHeading>
            <AccordionItemButton>
              LINKリワード ってなんですか？
            </AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel>
            <p>
              LINEが提供している独自の仮想通貨に交換できるポイントの事です！<br></br>
              ユーザーの皆様はLINKを通じて,LINEpayへのチャージによって普段の生活に利用できます！<br></br>
              投資に興味ある方はレンディング（貸し出し）などで資産を増やすことも可能です！<br></br><br></br>

              LINKリワードプログラムは<Link className="Emphasis" target='_blank' to={'/linkreword'}>こちら</Link>
            </p>
          </AccordionItemPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionItemHeading>
            <AccordionItemButton>
              YLB Collectはなんのサービスですか？
            </AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel>
            <p>
              インターネットでこれまで実現できなかったBtoC,CtoCのデジタルデータの価値の提供（販売）をするためのサービスです！<br></br>
              ブロックチェーン技術に紐づいたトークンを使い著作者を明確にしコンテンツの健全な販売を提供します！<br></br>
              これまで個人の販売者が大きく主張できなかったロイヤリティを明確にしコンテンツを守るプラットフォームでもあります！<br></br>
              またチケット事業者は追跡可能な電子チケットを提供でき、チケット転売の不正を未然に防止する方法も提供しています！<br></br>
              ＊現在チケット不正転売に対する対策はLINE社と開発を進めております！
            </p>
          </AccordionItemPanel>
        </AccordionItem>
        <p className='category'>払い戻し・決済系</p>
        <AccordionItem>
          <AccordionItemHeading>
            <AccordionItemButton>
              間違って購入しましたが払い戻しはできますか？
            </AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel>
            <p>
              すべてのアイテム購入の返金⋅返品は、法令上必要な場合を除き、承っておりません。
            </p>
          </AccordionItemPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionItemHeading>
            <AccordionItemButton>
              決済方法はLINEpayだけですか？
            </AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel>
            <p>
              現状システム上の対応はLINEpayのみになりますが、お客様の要望またはサービス開発に合わせてより良い決済手段の導入を検討しております！
            </p>
          </AccordionItemPanel>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

