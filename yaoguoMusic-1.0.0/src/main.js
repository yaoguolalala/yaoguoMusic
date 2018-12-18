// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import fastclick from 'fastclick'
import Vuelazyload from 'vue-lazyload'
import './common/stylus/index.styl'


Vue.config.productionTip = false
fastclick.attach(document.body)
/* eslint-disable no-new */

Vue.use(Vuelazyload,{
  loading: require('./common/image/default.png')
})

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
