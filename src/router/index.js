import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Main from '../views/Main.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main
  },
  {
    path: '/pmsg',
    name: 'Pmsg',
    meta: {tittle:'个人信息',},
    component: () => import('../views/Personalmsg.vue')
  }, {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/welcome',
    name: 'Welcome',
    meta: {tittle:'欢迎页',},
    component: () => import('../views/Welcome.vue')
  },
  {
    path: '/register',
    name: 'Register',
    meta: {title: '注册',},
    component: () => import('../views/Register.vue')
  },
  {
    path: '/login',
    name: 'Login',
    meta: {title: '登录',},
    component: () => import('../views/Login.vue')
  },
  {
    path: 'doc/:id',
    name:'Document',
    meta: {tittle:'文档',},
    component: () => import('../views/Doc.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router


