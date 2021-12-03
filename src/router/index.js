import { createRouter, createWebHistory } from 'vue-router'
import { ElMessage } from 'element-plus'
const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login')
  },
  {
    path: '/',
    name: 'index',
    redirect: '/dashboard',
    component: () => import('@/views/index'),
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        meta: { title: '首页' },
        component: () => import('@/views/dashboard/index')
      }
    ]
  },
  {
    path: '/sys',
    name: 'sys',
    meta: { title: '系统管理' },
    redirect: '/sys/user',
    component: () => import('@/views/index'),
    children: [
      {
        path: 'user',
        name: 'user',
        meta: { title: '用户管理' },
        component: () => import('@/views/user/UserList')
      },
      {
        path: 'role',
        name: 'role',
        meta: { title: '权限管理' },
        component: () => import('@/views/role/RoleList')
      },
      {
        path: 'perm',
        name: 'perm',
        meta: { title: '菜单管理' },
        component: () => import('@/views/perm/PermTree')
      },
      {
        path: 'org',
        name: 'org',
        meta: { title: '机构管理' },
        component: () => import('@/views/org/OrgList')
      },
    ]
  },
  {
    path: '/model',
    name: 'model',
    meta: { title: '模型管理' },
    redirect: '/model/pipemodel',
    component: () => import('@/views/index'),
    children: [
      {
        path: 'pipemodel',
        name: 'pipemodel',
        meta: { title: '管道管理' },
        component: () => import('@/views/pipemodel/ModelList')
      },
      {
        path: 'sensormodel',
        name: 'sensormodel',
        meta: { title: '传感器模型' },
        component: () => import('@/views/sensormodel/ModelList')
      }
    ],
  },
  {
    path: '/item',
    name: 'item',
    meta: { title: '项目管理' },
    redirect: '/item/itemList',
    component: () => import('@/views/index'),
    children: [
      {
        path: 'itemList',
        name: 'itemList',
        meta: { title: '项目信息' },
        component: () => import('@/views/item/ItemList')
      }

    ]
  },
  {
    path: '/assets',
    name: 'assets',
    meta: { title: '资产管理' },
    redirect: '/assets/pipe',
    component: () => import('@/views/index'),
    children: [
      {
        path: 'pipe',
        name: 'pipe',
        meta: { title: '管道信息' },
        component: () => import('@/views/asspipe/AssPipeList')
      }

    ]
  },
  {
    path: '/alarm',
    name: 'alarm',
    meta: { title: '报警管理' },
    redirect: '/alarm/alarmList',
    component: () => import('@/views/index'),
    children: [
      {
        path: 'alarmList',
        name: 'alarmList',
        meta: { title: '报警信息' },
        component: () => import('@/views/alarm/AlarmList')
      }

    ]
  },
  {
    path: '/monitor',
    name: 'monitor',
    meta: { title: '管道监测' },
    redirect: '/monitor/monitorList',
    component: () => import('@/views/index'),
    children: [
      {
        path: 'monitorList',
        name: 'monitorList',
        meta: { title: '实时监测' },
        component: () => import('@/views/monitor/monitorList')
      },
      {
        path: 'bigScreen',
        name: 'bigScreen',
        meta: { title: '大屏展示' },
        component: () => import('@/views/monitor/bigScreen')
      }

    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})
router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next()
  const userinfo = JSON.parse(sessionStorage.getItem('Login_Userinfo'))
  if (!userinfo) {
    ElMessage({
      title: '系统提示',
      message: '您还没有登录,请先登录账号!',
      type: 'warning',
      duration: 2000
    })
    return next('/login')
  }
  next()
})
export default router
