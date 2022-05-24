import axios from 'axios';
import { getToken } from './auth';

const instance = axios.create({
  baseURL: 'https://api-hmugo-web.itheima.net/api/public/',
  timeout: 5000,
});

// 添加请求拦截器
instance.interceptors.request.use(
  function (config:any) {
    // 在发送请求之前做些什么
    config.headers['token'] = getToken();
    // config.headers['Access-Control-Allow-Headers'] = '*';
    // config.headers['token'] = '99';
    return config;
  },
  function (error:any) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器

instance.interceptors.response.use(
  function (response:any) {
    // 对响应数据做点什么
    return response.data;
  },
  function (error:any) {
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

/**
 * get请求
 * @param {*} url 请求地址
 * @param {*} param url参数
 */

export function get(url:string, params:any) {
  return instance.get(url, {
    params,
  });
}

/**
 * post请求
 * @param {*} url 请求地址
 * @param {*} data url参数
 */

export function post(url:string, data:any) {
  return instance.post(url, data);
}

/**
 * put请求
 * @param {*} url 请求地址
 * @param {*} data url参数
 */

export function put(url:string, data:any) {
  return instance.put(url, data);
}

