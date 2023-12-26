import Vue from 'vue'
import App from './App'
import {
  router
} from './router';
import {
  isObject
} from '@/libs/tools'
import axios from 'axios'
import config from './config'
import store from './store/index'
import mixin from './mixins/mixin'
//import { swiper, swiperSlide } from 'vue-awesome-swiper'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import {
  Popup
} from 'vant'
import Video from 'video.js'
import 'video.js/dist/video-js.css' 

Vue.prototype.$video = Video

Vue.use(Popup)
Vue.use(VueAwesomeSwiper)
// 添加请求拦截器
axios.interceptors.request.use(
  function (config) {
    if (config.data) {
      var data = config.data
      for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
          var value = data[key]
          if (Array.isArray(value) || isObject(value)) {
            data[key] = JSON.stringify(value)
          } else {
            data[key] = value + ''
          }
        }
      }
      config.data = data
    }
    // console.log('hp=' + config.url + '|' + JSON.stringify(config.data))
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)
// 添加响应拦截器
axios.interceptors.response.use(
  function (response) {
    if (response.status == 200) {
      return response.data
    } else {
      this.mAlert(response.statusText)
    }
  },
  function (error) {
    vue.mLoading(false)
    vue.mAlert(error)
    return Promise.reject(error)
  }
)
//ajax携带cookie数据，保证session可用
// axios.defaults.withCredentials = true
const baseUrl = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro
axios.defaults.baseURL = baseUrl
config.hostUrl = baseUrl
Vue.prototype.$http = axios

Vue.prototype.$config = config
Vue.mixin(mixin)
var vue = new Vue({
  router,
  store,
  el: '#app',
  render: h => h(App)
});