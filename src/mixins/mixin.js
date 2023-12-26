import Vue from 'vue'
import {
  isValidDate
} from '@/libs/tools'
import types from '@/store/mutation-types'
import {
  Dialog,
  Loading,
  Toast
} from 'vant'

// 全局注册
Vue.use(Dialog)
Vue.use(Loading)
Vue.use(Toast)
export default {
  components: {},
  data() {
    return {}
  },
  computed: {
  },
  mounted() {},
  methods: {
    mLoading(visible, content) {
      if (visible) {
        this.$store.commit(types.UPDATE_LOADING_MODEL_VISIBLE, {
          visible: !!visible,
          content
        })
      } else {
        setTimeout(() => {
          this.$store.commit(types.UPDATE_LOADING_MODEL_VISIBLE, {
            visible: !!visible,
            content
          })
        }, 50)
      }
    },
    mAlert(content, okClose, hasCancelBtn, cancelClose, title, maxWidth) {
      if (!content) return
      if (hasCancelBtn) {
        // eslint-disable-next-line no-undef
        Dialog.confirm({
            title: title || '提示消息',
            width: maxWidth || '320px',
            message: content
          })
          .then(() => {
            if (okClose) okClose()
          })
          .catch(() => {
            if (cancelClose) cancelClose()
          })
      } else {
        // eslint-disable-next-line no-undef
        Dialog.alert({
          title: title || '提示消息',
          width: maxWidth || '320px',
          message: content
        }).then(() => {
          if (okClose) okClose()
          if (cancelClose) cancelClose()
        })
      }
    },
    mPopupOpen(view, paramData, position, width, height, callback, onclose, closeable) {
      this.$store.commit(types.OPEN_POPUP_MODEL, {
        visible: true,
        view: view,
        closeable: (closeable === undefined || closeable === null) ? true : closeable,
        position: position ? position : 'bottom',
        width: width, // '80%' or '300px'
        height: height ? height : 'auto', // 同width 可不传
        paramData: paramData,
        callback: (data) => {
          if (typeof callback === 'function') {
            callback(data)
          }
        },
        onclose: (v) => {
          if (v != undefined) {
            if (typeof onclose === 'function') {
              onclose(v)
            }
            this.mPopupClose()
          }
        }
      })
    },
    mPopupClose() {
      this.$store.commit(types.OPEN_POPUP_MODEL, {
        visible: false,
        view: '',
        width: 0,
        height: 0,
        position: 'bottom',
        paramData: {},
        callback: undefined,
        onclose: () => {}
      })
    },
    // formatString:yyyy-MM-dd HH:mm:ss
    mFormatDate: function (value, fmt) {
      var date
      if (isValidDate(value)) {
        date = value
      } else {
        if (!value) return ''
        if (typeof value === 'string') {
          if (value.toString().length === 10) {
            value = value * 1000
          } else if (value.indexOf('T') > 0) {
            value = value.replace('T', ' ')
            if (value === '0001-01-01 00:00:00') value = ''
            return value
          }
        }
        date = new Date(value)
      }
      if (fmt === undefined) {
        fmt = 'yyyy-MM-dd hh:mm:ss'
      }
      var o = {
        'M+': date.getMonth() + 1, // 月份
        'd+': date.getDate(), // 日
        'h+': date.getHours(), // 小时
        'm+': date.getMinutes(), // 分
        's+': date.getSeconds(), // 秒
        'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
        S: date.getMilliseconds() // 毫秒
      }
      if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
      }
      for (var k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
          fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length))
        }
      }

      if (fmt === '0001-01-01 00:00:00') fmt = ''
      return fmt
    },

    mIsWechat() {
      var ua = navigator.userAgent.toLowerCase()
      // eslint-disable-next-line eqeqeq
      if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        return true
      } else {
        return false
      }
    },
    mRunInH5() {
      var ua =  navigator.userAgent
      let ipad = ua.match(/(iPad).*OS\s([\d_]+)/)
      let isIphone =!ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/)
      let isAndroid = ua.match(/(Android)\s+([\d.]+)/)
      let isMobile = isIphone || isAndroid;
      if (isMobile) {
        return true
      } else {
        return false
      }
    },

    mToast(str, success) {
      if (success) {
        Toast.success(str)
      }
      else {
        Toast.fail(str)
      }
    },
  }
}