import Vue from 'vue'
import App from './App.vue'
import stark from './store'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  stark,
}).$mount('#app')
