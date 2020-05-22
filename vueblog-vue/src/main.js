import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import store from './store'
import Element from 'element-ui'
import editor from "mavon-editor";

import "element-ui/lib/theme-chalk/index.css"
import 'mavon-editor/dist/css/index.css'

import './permission.js' // 路由拦截
import './axios.js' // 请求拦截

Vue.use(Element)
Vue.use(editor)

Vue.config.productionTip = false
Vue.prototype.$axios = axios //

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

