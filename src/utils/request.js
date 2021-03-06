// import Vue from 'vue'
import axios from 'axios'
import { VueAxios } from './axios'
import { ElMessage } from 'element-plus'
import router from '@/router/index'
/**
 * 【指定 axios的 baseURL】
 * 则映射后端域名，通过 vue.config.js
 * @type {*|string}
 */

// axios.defaults.withCredentials = true
const apiBaseUrl = '/api' // 连接后端的链接
// 创建 axios 实例
const service = axios.create({
  baseURL: apiBaseUrl, // api base_url
  timeout: 90000 // 请求超时时间

})

const err = (error) => {
  if (error.response) {
    const data = error.response
    console.log(data)
    switch (data.status) {
      case 400:
        ElMessage({
          title: '系统提示',
          message: '操作失败!',
          type: 'error',
          duration: 1600
        })
        break
      case 402:
        ElMessage({
          title: '系统提示',
          message: '登陆时间已过期,请重新登录!',
          type: 'warning',
          duration: 1600
        })
        sessionStorage.clear()
        window.location.href = '/login'
        break
      case 500:
        ElMessage({
          title: '系统提示',
          message: '身份验证失败,账号或者密码不正确!',
          type: 'error',
          duration: 1600
        })
        break
      case 404:
        ElMessage({
          title: '系统提示',
          message: '很抱歉，资源未找到!',
          type: 'error',
          duration: 1600
        })
        break
      case 504:
        ElMessage({
          title: '系统提示',
          message: '网络超时',
          type: 'error',
          duration: 1600
        })
        break
      case 401:
        ElMessage({
          title: '系统提示',
          message: '网络未授权，请重新登录超时',
          type: 'error',
          duration: 1600
        })
        break
      default:
        ElMessage({
          title: '系统提示',
          message: data.msg,
          type: 'info',
          duration: 1600
        })
        break
    }
  }
  return Promise.reject(error)
}
// request interceptor
service.interceptors.request.use(config => {
  // 请求发送前拦截器

  return config
}, (error) => {
  return Promise.reject(error)
})

// response interceptor
service.interceptors.response.use((response) => {
  // 接收结果拦截器
  return response.data
}, err)

const installer = {
  vm: {},
  install (Vue, router = {}) {
    Vue.use(VueAxios, router, service)
  }
}

export {
  installer as VueAxios,
  service as axios
}
