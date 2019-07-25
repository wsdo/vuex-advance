import applyMixin from './mixin'
import Vue from 'vue'
const forEachValue = (obj, fn) => Object.keys(obj).forEach(key => fn(obj[key], key))

const registerGetter = (store, fn, name) => {
  Object.defineProperty(store.getters, name, {
    get: () => {
      return fn(store.state)
    },
  })
}

const resetStoreVM = (store, state) => {
  store._vm = new Vue({
    data: {
      state: state,
    },
  })
}

export class Store {
  constructor(options = {}) {
    this.options = options
    this.getters = {}
    forEachValue(options.getters, (fn, name) => {
      registerGetter(this, fn, name)
    })
    resetStoreVM(this, options.state)
  }
  get state() {
    return this.options.state
  }
}

export const install = Vue => {
  applyMixin(Vue)
}
