import axios from 'axios'
import { VueAxios } from './axios'

/**
 * 【指定 axios的 baseURL】
 * 则映射后端域名，通过 vue.config.js
 * @type {*|string}
 */
const apiBaseUrl = 'http://localhost:8080' // 连接后端的链接
console.log('apiBaseUrl= ', apiBaseUrl)
// 创建 axios 实例
const service = axios.create({
  baseURL: apiBaseUrl, // api base_url
  timeout: 90000 // 请求超时时间
})

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
