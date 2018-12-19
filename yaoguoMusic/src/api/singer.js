import jsonp from '../common/js/jsonp'
import { commonParams,options } from './config'
import axios from 'axios';

export function getSingerLists(){
  const url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg'

  const data = Object.assign({}, commonParams,{
    channel: 'singer',
    page: 'list',
    key: 'all_all_all',
    pagesize: 100,
    pagenum: 1,
    hostUin: 0,
    loginUin: 0,
    needNewCode: 0,
    platform: 'yqq',
    g_tk: 5381,
    inCharset: 'utf8',
    outCharset: 'utf-8',
    notice: 0,
    format: 'jsonp'
  })

  return jsonp(url,data,options);
}

export function getSingerDetail(singerId){
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg'

  const data = Object.assign({}, commonParams,{
    platform: 'yqq',
    num:100,
    from:'h5',
    platform: "yqqpage",
    order:'listen',
    needNewCode:1,
    singermid:  singerId     
  })
  return jsonp(url,data,options);
}

export function getMusic(songmid) {
  const url = '/api/music'
  const data = Object.assign({},commonParams,{
    g_tk:5381,
    loginUin:0,
    hostUin:0,
    notice:0,
    platform:'yqq',
    needNewCode:0,
    data:{
      "req":{
        "module":"CDN.SrfCdnDispatchServer",
        "method":"GetCdnDispatch",
        "param":{
          "guid":"5979881863",
          "calltype":0,
          "userip":""
        }
      },
      "req_0":{
        "module":"vkey.GetVkeyServer",
        "method":"CgiGetVkey",
        "param":{
          "guid":"5979881863",
          "songmid":[`${songmid}`],
          "songtype":[0],
          "uin":"0",
          "loginflag":1,
          "platform":"20"
          }
        },
        "comm":{
          "uin":0,
          "format":"json",
          "ct":20,
          "cv":0
        }
      }
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

/*
export function playSong(songmid){
  const url = '/api/songPlay'
  const data = Object.assign({},commonParams,{
    songmid: songmid,
    filename: 'c400' + songmid + '.m4a',
    guid: 5979881863,
    platform: 'yqq',
    loginUin: 0,
    hostUin: 0,
    needNewCode: 0,
    g_tk: 5381,
    uin: 0,
    cid: 0,
    format: 'json'
  })
  return axios.get(url,{
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}*/