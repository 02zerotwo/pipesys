import { login, logout } from '@/api/login'
import { USER_INFO } from '@/store/mutation-types'

const user = {
  state: {
    username: '',
    realname: '',
    avatar: '',
    permissionList: [],
    info: {}
  },

  mutations: {
    SET_NAME: (state, username) => {
      state.username = username
    },

    SET_INFO: (state, info) => {
      state.info = info
    }
  },

  actions: {
    // 登录
    Login ({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo).then(response => {
          debugger
          if (response.status === 200) {
            const userInfo1 = response.data
            sessionStorage.setItem(USER_INFO, JSON.stringify(userInfo1))// 将用户信息存储到sessionStorage
            commit('SET_NAME', userInfo1.username)
            commit('SET_INFO', userInfo1)
            resolve(response)
          } else {
            reject(response)
          }
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取用户信息
    GetPermissionList () {
      return new Promise((resolve) => {
        const userinfo = JSON.parse(sessionStorage.getItem('Login_Userinfo'))
        resolve(userinfo)
      })
    },

    // 登出
    Logout ({ commit, state }) {
      return new Promise((resolve, reject) => {
        sessionStorage.clear()
        logout().then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    }

  }
}

export default user
