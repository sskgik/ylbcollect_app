import React from 'react';
import './Loadmap.css';


function Loadmap() {
  return (
    <div className="Loadmapbody">
      <div className='Loadmapinfo'>
        <p className='Loadmapheader'>Our Development Loadmap</p>
        <span className='LoadmapDeatailsheader'>私たちはこちらのロードマップ計画の元ユーザーの皆様の満足度を向上できるように努めます！
                                                <br></br>ユーザーの皆様の声も反映することが満足度の向上につながると考えております！皆様の声にお応えできるよう開発を進めます！
                                                <br></br>検討及び実行できるように努めますのでご遠慮なくお申し付けください！良きサービスの提供になりますように！</span>
      </div>
      <div className='Loadmapheaderbody'>
        <hr className='loadhr' />
        <div className="Loadmapbodyinfo1">
          <div className='pointshape1'>
            <div className='pointinfo'>2021/4<br></br>YLB Collect<br></br>Release</div>
            <div className='point'></div>
          </div>
          <div className='pointshape2'>
            <div className='pointinfo'>2021/8<br></br>Developing<br></br>New Contents Tech</div>
            <div className='point'></div>
          </div>
          <div className='pointshape3'>
            <div className='pointinfo'>2021/11<br></br>Loaunch<br></br>YLB Mobile</div>
            <div className='point'></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Loadmap;