import applyMixin from './mixin'
import Vue from 'vue'
const forEachValue = (obj, fn) => Object.keys(obj).forEach(key => fn(obj[key], key))
export class Store {
  constructor(options = {}) {
    this.options = options
    console.log('options', options)
    this.getters = {}
    forEachValue(options.getters, (getterFn, getterName) => {
      registerGetter(this, getterName, getterFn)
    })
    resetStoreVM(this, options.state)
  }
  get state() {
    return this.options.state
  }
}

function registerGetter(store, getterName, getterFn) {
  Object.defineProperty(store.getters, getterName, {
    get: () => {
      return getterFn(store.state)
    },
  })
}

function resetStoreVM(store, state) {
  store._vm = new Vue({
    data: {
      state: state,
    },
  })
}

export function install(Vue) {
  applyMixin(Vue)
}
