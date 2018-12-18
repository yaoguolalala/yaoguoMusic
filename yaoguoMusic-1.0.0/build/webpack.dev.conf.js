'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const path = require('path')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')


const express = require('express')
const axios = require('axios')
const app = express()
const apiRoutes = express.Router()

app.use('/api',apiRoutes)

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)


const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,

  // these devServer options should be customized in /config/index.js
  devServer: {
    before(app){
      app.get('/api/getDiscList',(req,res)=>{
        const url1 = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg'
        axios.get(url1, {
          headers:{
            referer: 'http://c.y.qq.com',
            host: 'c.y.qq.com'
          },
          params: req.query
        }).then((response) => {
          res.json(response.data)
        }).catch((e) => {
          console.log(e);
        })
      })

      app.get('/api/getLyric',(req,res) => {
        const url1 = 'https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg'
        axios.get(url1, {
          headers:{
            authority:'c.y.qq.com',
            method:'GET',
            accept:'*/*', 
            acceptEncoding:'gzip, deflate, br',
            acceptLanguage:'zh-CN,zh;q=0.9',
            cookie:'pgv_pvi=1692726272; pgv_pvid=5979881863; ts_uid=589219023; ts_refer=ADTAGnewyqq.singer; pgv_si=s1159821312; pgv_info=ssid=s2863459009; yqq_stat=0; player_exist=1; yq_playschange=0; yq_playdata=; qqmusic_fromtag=66; ts_last=y.qq.com/portal/player.html; yplayer_open=1; yq_index=0',
            referer:'https://y.qq.com/portal/player.html',
            userAgent:'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Mobile Safari/537.36'            
          },
          params: req.query
        }).then((response) => {
          var ret = response.data
          if (typeof ret ==='string'){
            var reg = /^\w+\(({[^()]+})\)$/
            var matches = ret.match(reg)
            if (matches){
              ret = JSON.parse(matches[1])
            }
          }
          res.json(ret)
        }).catch((e) => {
          console.log(e);
        })
      })
     
      
    app.get('/api/music',function (req,res){
      const url2 = 'https://u.y.qq.com/cgi-bin/musicu.fcg'

      axios.get(url2,{
        headers:{
          authority:'u.y.qq.com',
          method:'GET',
          accept:'*/*', 
          acceptEncoding:'gzip, deflate, br',
          acceptLanguage:'zh-CN,zh;q=0.9',
          cookie:'pgv_pvi=1692726272; pgv_pvid=5979881863; ts_uid=589219023; ts_refer=ADTAGh5_playsong; pgv_si=s1507539968; pgv_info=ssid=s1256849939; yqq_stat=0; player_exist=1; yq_playschange=0; yq_playdata=; qqmusic_fromtag=66; ts_last=y.qq.com/portal/player.html; yplayer_open=1; yq_index=0',
          referer:'https://y.qq.com/portal/player.html',
          userAgent:'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Mobile Safari/537.36'
        },
        params: req.query
      }).then((response) => {
        res.json(response.data)
      }).catch((e) => {
        console.log(e)
      })
    })

    app.get('/api/songPlay',function(res,req) {
      let url = "https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg"
      axios.get(url,{
        header: {
          referer: "http://c.y.qq.cocm",
          host: 'c.y.qq.com'
        },
        params: req.query
      }).then((response) => {
        res.json(response.data)
      }).catch((e) => {
        console.log(e)
      })
    })

    app.get('/api/getSongList',function(req,res) {
      let url = "https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg"
      axios.get(url,{
        headers: {
          accept:'*/*',
          acceptEncoding:'gzip, deflate, br',
          acceptLanguage:'zh-CN,zh;q=0.9',
          cookie:'pgv_pvi=1692726272; pgv_pvid=5979881863; ts_uid=589219023; pgv_si=s9011367936; pgv_info=ssid=s8953021818; qqmusic_fromtag=66; ts_refer=ADTAGmyqq; yq_playschange=0; yq_playdata=; player_exist=1; yq_index=0; yplayer_open=0; yqq_stat=0; ts_last=y.qq.com/n/yqq/playlist/5814176522.html',
          referer:'https://y.qq.com/n/yqq/playlist/5814176522.html',
          userAgent:'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36'
        },
        params: req.query
      }).then((response) => {
        var ret = response.data
        if (typeof ret ==='string'){
          var reg = /^\w+\(({[^()]+})\)$/
          var matches = ret.match(reg)
          if (matches){
            ret = JSON.parse(matches[1])
          }
        }
        res.json(ret)
      }).catch((e) => {
        console.log(e);
      })
    })
   
    app.get('/api/search',function(req,res){
      const url = 'https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp'

      axios.get(url,{
        headers:{
          accept:'application/json',
          acceptEncoding: 'gzip, deflate, br',
          acceptLanguage: 'zh-CN,zh;q=0.9',
          cookie: 'pgv_pvi=2944003072; RK=sXRw7ZClHv; ptcz=56031bf0645419ed6daffa946a159b15611d79a3a9606d53013e6656f2c8bd24; pgv_pvid=9130014086; eas_sid=G1g504C1w7Y7W4G4W0N1G2y458; o_cookie=2636208109; ts_uid=8147963740; yq_index=1; ts_refer=ADTAGmyqq; ptui_loginuin=2636208109; pt2gguin=o2636208109; pgv_info=ssid=s5495280500',
          origin: 'https://y.qq.com',
          referer: 'https://y.qq.com/m/index.html',
          userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1'
        },
        params: req.query
      }).then((response) => {
        res.json(response.data)
      }).catch((e) => {
        console.log(e)
      })
    })
  },
  

    clientLogLevel: 'warning',
    historyApiFallback: {
      rewrites: [
        { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') },
      ],
    },
    hot: true,
    contentBase: false, // since we use CopyWebpackPlugin.
    compress: true,
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay
      ? { warnings: false, errors: true }
      : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: config.dev.poll,
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.dev.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors
        ? utils.createNotifierCallback()
        : undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})
