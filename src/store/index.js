import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'


Vue.use(Vuex)

export default new Vuex.Store({

  state: {
    isLogin:false,
    user:{}
  },
  mutations: {
    login(state,user){
      state.isLogin = true
      state.user = user
    },
    logout(state) {
      state.isLogin = false
      state.user = {}
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [createPersistedState()]//会自动保存创建的状态。刷新还在
})
