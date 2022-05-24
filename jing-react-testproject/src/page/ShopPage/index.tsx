import React, { useEffect, useState } from 'react';
import {getShopDetail} from '../../service/shopDetail'

interface IProps {

}

const ShopPage : React.FC<IProps> = props => {
  // 获取商品详情
  const getShopDetailFunction = async () => {
    console.log('shangp')
    const res = await getShopDetail({goods_id : 8999}).then((res:any)=>{
      console.log(res)
    }).catch((err:any)=>{
      console.log(err)
    })
    console.log(res)
  }
  // 刚进页面
  useEffect(() => {
    console.log('useeffect')
    getShopDetailFunction();
  },[]);
  return <React.Fragment>

  </React.Fragment>
}

export default ShopPage;