import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue')
  },
  {
    path: '/punch',
    name: 'PunchHome',
    component: () => import('@/views/PunchHome.vue')
  },
  {
    path: '/user',
    name: 'UserCenter',
    component: () => import('@/views/UserCenter.vue')
  },
  {
    path: '/admin',
    name: 'AdminList',
    component: () => import('@/views/AdminList.vue')
  },
  {
    path: '/notice',
    name: 'NoticeList',
    component: () => import('@/views/NoticeList.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  next()
})

export default router
