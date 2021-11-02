import { axios } from '@/utils/request'

// post
export function postAction (url, parameter) {
  return axios({
    url: url,
    method: 'post',
    data: parameter
  })
}

// post method= {post | put}
export function httpAction (url, parameter, method) {
  return axios({
    url: url,
    method: method,
    data: parameter
  })
}

// put
export function putAction (url, parameter) {
  return axios({
    url: url,
    method: 'put',
    data: parameter
  })
}

// get
export function getAction (url, parameter) {
  return axios({
    url: url,
    method: 'get',
    params: parameter
  })
}

// get Stream
export function getActionStream (url, parameter) {
  return axios({
    url: url,
    method: 'get',
    params: parameter,
    responseType: 'blob'
  })
}

// deleteAction
export function deleteAction (url, parameter) {
  return axios({
    url: url,
    method: 'delete',
    params: parameter
  })
}

/**
 * 文件上传 用于富文本上传图片
 * @param url
 * @param parameter
 * @returns {*}
 */
export function uploadAction (url, parameter) {
  return axios({
    url: url,
    data: parameter,
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data' // 文件上传
    }
  })
}
