import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isHeadShow:true
  },
  mutations: {
    show(state){
      state.isHeadShow = true
    },
    hide(state){
      state.isHeadShow = false
    },
  },
  actions: {
  },
  modules: {
  }
})
