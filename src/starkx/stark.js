import applyMixin from './mixin'
import Vue from 'vue'
export class Stark {
  constructor(options = {}) {
    if (!Vue && typeof window !== 'undefined' && window.Vue) {
      install(window.Vue)
    }
    console.log('options', options)
    this.options = options
    this.getters = {}
    this.mutations = {}
    const { dispatch, commit } = this
    this.actions = {}
    this.commit = type => {
      return commit.call(this, type)
    }
    this.dispatch = type => {
      return dispatch.call(this, type)
    }
    forEachValue(options.actions, (actionFn, actionName) => {
      registerAction(this, actionName, actionFn)
    })
    forEachValue(options.getters, (getterFn, getterName) => {
      registerGetter(this, getterName, getterFn)
    })

    forEachValue(options.mutations, (mutationFn, mutationName) => {
      registerMutation(this, mutationName, mutationFn)
    })
    resetStoreVM(this, options.state)
  }
  get state() {
    return this.options.state
  }

  commit(type) {
    this.mutations[type]()
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

function registerAction(store, actionName, actionFn) {
  store.actions[actionName] = () => {
    actionFn.call(store, store)
  }
}

function registerMutation(store, mutationName, mutationFn) {
  store.mutations[mutationName] = () => {
    mutationFn.call(store, store.state)
  }
}

function forEachValue(obj, fn) {
  Object.keys(obj).forEach(key => fn(obj[key], key))
}

export function install(Vue) {
  applyMixin(Vue)
}
