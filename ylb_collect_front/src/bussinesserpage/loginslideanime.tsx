import React, { useState, useEffect } from 'react';
import { useTransition, animated, config } from 'react-spring';
import { isTemplateExpression } from 'typescript';
import './loginslideanime.css';

const slides = [
  { id: 0, url: 'photonft.jpg', info: '\n\n\n撮影した絶景や作品を\nコンテンツとして販売したい\n写真家やイラストレーター' },
  { id: 1, url: 'vision.jpg', info: '\n\n\nプロモーション・限定公開の\nコンテンツ動画を販売したい\n動画クリエイター' },
  { id: 2, url: 'royalty1.jpg', info: '\n\n\nアイドル・音楽など\n知的財産の保護した販売を\nしたい事業者様'},
  { id: 3, url: 'Ticket.jpg', info: '\n\n\nブロックチェーン技術で\n追跡機能付き電子チケットを\n発行したい事業者様' },
  { id: 4, url: 'platform.jpg', info: '\n\n多様なコンテンツ技術で\n様々なニーズに答える\nビジネスNFTプラットフォーム\n~YLB Collect~' },
];

const SlideAnime = () => {
  const [index, set] = useState(0);
  const transitions = useTransition(slides[index], item => item.id, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: config.molasses,
  })
  useEffect(() => void setInterval(() => set(state => (state + 1) % 5), 4500), [])
  const anime = transitions.map(({ item, props, key }) => (
    <div className="Animationarea">
      <div className="comment"> {item.info?.split('\n').map((str, index) => (
        <React.Fragment key={index}>{str}<br /></React.Fragment>))}</div>
      <animated.div key={key} className="bg"
        style={{ ...props, backgroundImage: `url(https://sskgik.github.io/ylbcollect/${item.url})` }} />
    </div>
  ))
  return anime[0];
}

export default SlideAnime;