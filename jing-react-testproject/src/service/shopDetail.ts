import { get, post, put, } from '../utils/request'
/**
 * 商品详情
 * @param {*}
 * @returns
 */

interface goods {
  goods_id: number
}
export function getShopDetail(goods:goods){
  return get('v1/home/floordata', goods)
}