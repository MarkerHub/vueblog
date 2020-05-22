import axios from 'axios'
import Element from "element-ui";
import store from "./store";
import router from "./router";

axios.defaults.baseURL='http://localhost:8081'

axios.interceptors.request.use(config => {

  console.log("前置拦截")
  // 可以统一设置请求头

  return config
})

axios.interceptors.response.use(response => {
    const res = response.data;
    console.log("后置拦截")

    // 当结果的code是否为200的情况
    if (res.code === 200) {
      return response
    } else {
      // 弹窗异常信息
      Element.Message({
        message: response.data.msg,
        type: 'error',
        duration: 2 * 1000
      })
      
      return Promise.reject(response.data.msg)
    }

  },
  error => {
    console.log('err' + error)// for debug

    // 根据请求状态觉得是否登录或者提示其他
    if (error.response.status === 401) {
      store.commit('REMOVE_INFO');
      router.push({
        path: '/login'
      });
      error.message = '请重新登录';
    }
    if (error.response.status === 403) {
      error.message = '权限不足，无法访问';
    }

    Element.Message({
      message: error.message,
      type: 'error',
      duration: 3 * 1000
    })
    return Promise.reject(error)
  })
