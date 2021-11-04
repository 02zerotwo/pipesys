// import Vue from 'vue'
import axios from 'axios'
import { VueAxios } from './axios'
import { ElNotification } from 'element-plus'
/**
 * 【指定 axios的 baseURL】
 * 则映射后端域名，通过 vue.config.js
 * @type {*|string}
 */
const apiBaseUrl = 'http://localhost:8001' // 连接后端的链接
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
        ElNotification({
          title: '系统提示',
          message: '尚未登录,请登录账号!',
          type: 'error'
        })
        this.$router.push({ path: '/' })
        break
      case 500:
        ElNotification({
          title: '系统提示',
          message: '身份验证失败,账号或者密码不正确!',
          type: 'error'
        })
        break
      case 404:
        ElNotification({
          title: '系统提示',
          message: '很抱歉，资源未找到!',
          type: 'error'
        })
        break
      case 504:
        ElNotification({
          title: '系统提示',
          message: '网络超时',
          type: 'error'
        })
        break
      case 401:
        ElNotification({
          title: '系统提示',
          message: '网络未授权，请重新登录超时',
          type: 'error'
        })
        break
      default:
        ElNotification({
          title: '系统提示',
          message: data.msg,
          type: 'info'
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
