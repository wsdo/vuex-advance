import Vue from 'vue'
import Vuex from '../starkx'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    count: 10,
  },
  getters: {
    addNum(state) {
      return state.count + 5
    },
  },
})
