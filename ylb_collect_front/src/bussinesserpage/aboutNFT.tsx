import React from 'react'
import { useSpring, animated } from 'react-spring'
import './aboutNFT.css'

const calc = (x: any, y: any) => [-(y - window.innerHeight / 2) / 20, (x - window.innerWidth / 2) / 20, 1.1]
const trans: any = (x: any, y: any, s: any) => `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`

function AboutNFT() {
  const [props, set] = useSpring(() => ({ xys: [0, 0, 1], config: { mass: 5, tension: 350, friction: 40 } }))
  return (
    <div className='NFTinfobody'>
      <p className='NFTinfotext'>About NFT ~None Fangible Token~</p>
      <div className='AboutNFTInfo'>
        <div className='NFTinfo'>NFT<br></br><span className='infomationtxt'>コピーのできない価値！
           <br></br><br></br>ソーシャルゲーム、音楽、動画、アニメ、芸能etc,<br></br>著作物のもつ知的財産権をインターネットの拡大と共に保護することが難しくなっててきている昨今
           ブロックチェーン技術を用いた知的財産権の保護が注目を集めています！<br></br><br></br>当サービスではそんな知的財産権を保護しつつ新しい唯一の価値を販売していきたいIP事業者
           及び個人のクリエイターとコンシューマーを結ぶNFTの販売プラットフォームとして BtoC（事業者から個人）、CtoC（個人から個人）への流通を手助けします!<br></br><br></br>当サービスで提供
           できる価値は知的財産の画像データ、音声、動画、そして新たなデータ価値を開発し順次対応予定!</span></div>
        <animated.div
          className="card"
          onMouseMove={({ clientX: x, clientY: y }) => set({ xys: calc(x, y) })}
          onMouseLeave={() => set({ xys: [0, 0, 1] })}
          style={{ transform: props.xys.interpolate<string>(trans) }}
        />
      </div>
    </div>
  )
}

export default AboutNFT;