import Vue from 'vue'
import Vuex from 'vuex'
import message from '@/store/modules/message'

// 放置全局信息
Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    message,
  },
})
