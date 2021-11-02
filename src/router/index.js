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
    component: () => import('@/views/index')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
