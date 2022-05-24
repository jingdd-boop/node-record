import React, { useEffect, useState } from 'react';
import {getShopDetail,getRoomDetail} from '../../service/shopDetail'
import {
  ShopBaseMessage,
  ShopCommission,
  ShopBottom,
  ShopPhone,
  ShopDataCharts,
  ShopDetail,
  ShopDetailTitle,
  ShopSwiper,
  ShopTopList,
} from './components'
import './index.css'


interface IProps {

}

const ShopPage : React.FC<IProps> = props => {
  // 获取商品详情
  const getShopDetailFunction = async () => {
    console.log('shangp')
    // const res = await getRoomDetail({roomId : 13}).then((res:any)=>{
    //   console.log(res)
    // }).catch((err:any)=>{
    //   console.log(err)
    // })
    // console.log(res)
  }
  // 刚进页面
  useEffect(() => {
    getShopDetailFunction();
  },[]);
  return <React.Fragment>
    <div className="shopWrap">
    <div className="shopContent">
    <ShopSwiper></ShopSwiper>
    <ShopDetailTitle></ShopDetailTitle>
    <ShopCommission></ShopCommission>
    <ShopPhone></ShopPhone>
    <ShopDetail></ShopDetail>
    <ShopTopList></ShopTopList>
    <ShopDataCharts></ShopDataCharts>
    <ShopBaseMessage></ShopBaseMessage>
    </div>
    <div className="shopBottom">
    <ShopBottom></ShopBottom>
    </div>
    </div>
  </React.Fragment>
}

export default ShopPage;