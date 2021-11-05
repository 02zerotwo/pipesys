import { createRouter, createWebHistory } from 'vue-router'
import { ElNotification } from 'element-plus'
const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import('@/views/login')
  },
  {
    path: '/index',
    name: 'index',
    component: () => import('@/views/index'),
    children: [
      {
        path: 'user',
        name: 'user',
        component: () => import('@/views/user/UserList')
      }, {
        path: 'role',
        name: 'role',
        component: () => import('@/views/role/RoleList')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})
router.beforeEach((to, from, next) => {
  if (to.path === '/') return next()
  const userinfo = JSON.parse(sessionStorage.getItem('Login_Userinfo'))
  if (!userinfo) {
    ElNotification({
      title: '系统提示',
      message: '您还没有登录,请先登录账号!',
      type: 'warning',
      duration: 2000
    })
    return next('/')
  }
  next()
})
export default router
