
import { commonParams,options } from './config'
import axios from 'axios';



export function getSongLyric(mid){
  const url = '/api/getLyric'

  const data = Object.assign({}, commonParams,{
    g_tk: 5381,
    pcachetime: +new Date(),
    songmid: mid,
    loginUin: 0,
    hostUin: 0,
    format: 'json',
    inCharset: 'utf8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'yqq',
    needNewCode: 0
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
