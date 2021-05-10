import axios from 'axios'
import {BASE_URL} from '@/config/config.js'

export function http(config){
  let instance = axios.create({
    baseURL:BASE_URL || 'http://localhost:3000',
    timeout:60000
  })
  //请求拦截器
  instance.interceptors.request.use(config=>{
    return config
  },err=>{
    console.log(err)
  })
  //响应拦截器
  instance.interceptors.response.use(res=>{
    return res
  },err=>{
    console.log(err)
  })
  //返回实例
  return instance(config)
}


