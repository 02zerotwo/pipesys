<<<<<<< HEAD
=======
import { axios } from '@/utils/request'

/**
 * }
 * @param parameter
 * @returns {*}
 */
export function getAllUsers (pageNo, pageSize) {
  return axios({
    url: '/sys/user/key',
    params: {
      pageNo,
      pageSize
    }
  })
}
export function select (id) {
  return axios({
    url: '/sys/user/id',
    params: {
      id
    }
  })
}

export function addU (params) {
  return axios({
    url: '/sys/user',
    method: 'post',
    data: params
  })
}

export function deleteU (params) {
  return axios({
    url: '/sys/user',
    method: 'delete',
    data: params
  })
}
>>>>>>> 18466bae91146a1d12cdbe1a67184870db3eab9a
