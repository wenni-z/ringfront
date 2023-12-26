import Vue from 'vue'
import Vuex from 'vuex'
import commcpt from './commcpt'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    memberUser: {
      id: 0,
      token: ''
    },
    agree: false
  },
  getters: {
    getToken: (state) => {
      return state.memberUser.token
    },
    getLoginUser: (state) => {
      return state.memberUser
    },
    getNeedLogin: (state) => {
      return !state.memberUser.id || !state.memberUser.token
    },
    getAgree: (state) => {
      return state.agree
    },
  },
  mutations: {
    loadLoginUser(state) {
      let user = JSON.parse(localStorage.getItem('MEMBER_USER_KEY') || '{}')
      if (user.id) {
        state.memberUser = user
      }
    },
    saveLoginUser(state, memberUser) {
      let mu = Object.assign(state.memberUser, memberUser)
      state.memberUser = mu
      localStorage.setItem('MEMBER_USER_KEY', JSON.stringify(mu))
    },
    logout(state) {
      state.memberUser = {}
      localStorage.removeItem('MEMBER_USER_KEY')
    },
    saveAgree(state, agree) {
      state.agree = agree
    },
  },
  actions: {},
  modules: {
    commcpt
  }
})