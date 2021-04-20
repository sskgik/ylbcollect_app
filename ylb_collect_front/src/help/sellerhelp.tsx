import React from 'react'
import { Link } from 'react-router-dom';
import './sellerhelp.css'
import '../../node_modules/font-awesome/css/font-awesome.min.css';
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import "react-accessible-accordion/dist/fancy-example.css";



export default function Sellerhelp() {
  return (
    <div className='Sellerhelpbody'>
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
              NFTとは購入者の皆様に価値の高いデータを共有できるツールのことで、LINEのアプリを通して簡単に友人とデータ交換をしたりできます<br></br><br></br>

              ＊ブロックチェーン上のNFTデータは<span className='Emphasisunderline'>発行者に著作権があり不正転売やネットへの拡散は禁止</span>されております！<br></br>
              発行者の意向で配ったトークンを持ち主から焼却する事もできますので！もしコンテンツの不正流出などを見かけたら運営にご相談ください！<br></br>
              コンテンツ流出に関する<span ><Link className='Emphasis' target='_blank' to={'/question'}>問い合わせはこちら</Link></span>
            </p>
          </AccordionItemPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionItemHeading>
            <AccordionItemButton>
              NFTの発行が確認できません！
            </AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel>
            <p>
              ユーザー様にて発行履歴の確認をお願いします！発行履歴の確認は<span><Link className="Emphasis" target='_blank' to={'/explorer'}>こちら（検索ツール）</Link></span>にご自身の発行した予定のトークンIDを<br></br>
              虫眼鏡のマークを押して出てくる入力欄に自身のトークンIDを入れて出てくる結果（発行時間やトランザクション（履歴））を確認ください！<br></br><br></br>
              検索ツールの使い方は<span className='Emphasis'>こちら（使い方）</span>
            </p>
          </AccordionItemPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionItemHeading>
            <AccordionItemButton>
              NFTに所定の画像データがありません！
            </AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel>
            <p>
              画像データは登録してから技術的に反映されるまで最長で24時間かかる場合がございます!<br></br>
              24時間経っても反映されない場合は弊社にお問い合わせください！<br></br><br></br>
              画像反映に関する<span><Link className='Emphasis' target='_blank' to={'/question'}>問い合わせはこちら</Link></span>
            </p>
          </AccordionItemPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionItemHeading>
            <AccordionItemButton>
              著作権違反のNFTが販売されています！
            </AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel>
            <p>
              不正コンテンツの報告を運営にお願いします<br></br>
              24時間以内にしかるべき対処を実施いたします<br></br><br></br>
              不正コンテンツに関する<span><Link className='Emphasis' target='_blank' to={'/question'}>問い合わせはこちら</Link></span>
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
        <p className='category'>出金・決済系</p>
        <AccordionItem>
          <AccordionItemHeading>
            <AccordionItemButton>
              出金はどのくらいで完了になりますか？
            </AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel>
            <p>
              出金申請を承ってから1~2営業日以内に必ず行います！
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