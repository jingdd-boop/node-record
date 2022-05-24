import { request } from '../utils/request';

//登录
export const getShopDetail = (params: any) =>
  request.get('/api/public/v1/goods/detail', params, { timeout: 15000 });

export const getRoomDetail = (params: any) =>
  request.get('/room/getRoomInfo', params, { timeout: 15000 });
