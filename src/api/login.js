import { axios } from '@/utils/request'

/**
 * login func
 * parameter: {
 *     username: '',
 *     password: '',
 * }
 * @param parameter
 * @returns {*}
 */
export function login (parameter) {
  return axios({
    url: '/sys/login',
    method: 'post',
    data: parameter
  })
}

export function logout () {
  return axios({
    url: '/sys/logout',
    method: 'get'
  })
}
