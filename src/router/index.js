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
    redirect: '/index/dashboard',
    component: () => import('@/views/index'),
    children: [
      {
        path: 'user',
        name: 'user',
        meta: { title: '用户管理' },
        component: () => import('@/views/user/UserList')
      },
      {
        path: 'dashboard',
        name: 'dashboard',
        meta: { title: '首页' },
        component: () => import('@/views/dashboard/index')
      }, {
        path: 'role',
        name: 'role',
        meta: { title: '权限管理' },
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
