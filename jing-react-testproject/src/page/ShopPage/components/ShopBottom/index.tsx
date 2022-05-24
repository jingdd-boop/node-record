import React, { useEffect, useState } from 'react';
import './ShopBottom.css';
interface IProps {

}

const ShopBottom : React.FC<IProps> = props => {

  return <React.Fragment>
      <div className="ShopBottomWrap">
        <div className="ShopBottomWrapLeft">
          <div className="ShopBottomWrapLeftFree">购买样品</div>
          <div className="ShopBottomWrapLeftShelves">货架</div>
        </div>
        <div className="ShopBottomWrapRight">
          <button className="ShopBottomWrapRightShares">分享赚钱</button>
          <button className="ShopBottomWrapRightAddShelves">加入货架</button>
        </div>
      </div>

  </React.Fragment>
}

export default ShopBottom;