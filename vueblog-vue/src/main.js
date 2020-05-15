import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import store from './store'
import Element from 'element-ui'
import  "element-ui/lib/theme-chalk/index.css"

Vue.use(Element)

Vue.config.productionTip = false
Vue.prototype.$axios = axios //

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
