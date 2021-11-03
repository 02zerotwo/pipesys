import { createRouter, createWebHistory } from 'vue-router'

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

export default router
