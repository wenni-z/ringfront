import types from './mutation-types'
export default {
  state: {
    alertMessage: {
      isShow: false,
      title: '提示信息',
      content: '',
      okClick: undefined,
      cancelClick: undefined
    },
    loadingModel: {
      visible: false,
      hasMask: false,
      content: '努力处理中...'
    },
    winModel: {
      visible: false,
      title: '提示',
      view: '',
      width: 400,
      isFullScreen: false,
      paramData: {},
      callback: undefined,
      onclose: undefined
    },
    popupModel: {
      visible: false,
      view: '',
      closeable: true,
      position: 'bottom',
      width: 400,
      height: 'auto',
      paramData: {},
      callback: undefined,
      onclose: () => {}
    },
    noticeMessage: {
      show: false,
      index: 0
    },
    bottomFooter: {
      isShow: true,
      routeName: 'home'
    }
  },
  getters: {
    getAlertMessage: state => {
      return state.alertMessage
    },
    getLoadingModel: state => {
      return state.loadingModel
    },
    getWinModel: state => {
      return state.winModel
    },
    getPopupModel: state => {
      return state.popupModel
    }
  },
  mutations: {
    [types.ALERT_MESSAGE](state, payload) {
      state.alertMessage.isShow = payload.isShow !== undefined ? payload.isShow : false
      state.alertMessage.title = payload.title ? payload.title : '提示信息'
      state.alertMessage.content = payload.content ? payload.content : ''
      state.alertMessage.maxWidth = payload.maxWidth ? payload.maxWidth : 360
      state.alertMessage.hasOKBtn = true
      state.alertMessage.hasCancelBtn = payload.hasCancelBtn ? payload.hasCancelBtn : false
      state.alertMessage.okClick = payload.okClick ? payload.okClick : undefined
      state.alertMessage.cancelClick = payload.cancelClick ? payload.cancelClick : undefined
    },
    [types.OPEN_WIN_MODEL](state, payload) {
      state.winModel = Object.assign(state.winModel, payload)
    },
    [types.OPEN_POPUP_MODEL](state, payload) {
      state.popupModel = Object.assign(state.popupModel, payload)
    },
    [types.UPDATE_LOADING_MODEL_VISIBLE](state, payload) {
      state.loadingModel.visible = payload.visible
      state.loadingModel.hasMask = payload.mask
      if (payload.content) {
        state.loadingModel.content = payload.content
      } else {
        state.loadingModel.content = '努力处理中...'
      }
    },
    setBottomFooter(state, payload) {
      state.bottomFooter = Object.assign(state.bottomFooter, payload)
    },
    bottomFooterSelect(state, payload) {
      state.bottomFooter.routeName = payload
    }
  },
  actions: {
    [types.UPDATE_LOADING_MODEL_VISIBLE]({
      commit
    }, payload) {
      commit(types.UPDATE_LOADING_MODEL_VISIBLE, payload)
      if (!!payload.timer && payload.timer > 0) {
        setTimeout(() => {
          commit(types.UPDATE_LOADING_MODEL_VISIBLE, {
            visible: false
          })
        }, payload.timer * 1000)
      }
    },
    showBottomFooter({
      commit
    }) {
      commit('setBottomFooter', {
        isShow: true
      })
    },
    hideBottomFooter({
      commit
    }) {
      commit('setBottomFooter', {
        isShow: false
      })
    }
  }
}