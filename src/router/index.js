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
    path: '/home',
    name: 'Home',
    component: Home
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
    path: '/changepwd',
    name: 'Changepwd',
    meta: {title: '修改密码',},
    component: () => import('../views/Cgpwd.vue')
  },
  {
    path: 'doc/:id',
    name:'Document',
    meta: {tittle:'文档',},
    component: () => import('../views/Doc.vue')
  },
  {
    path: '/editor',
    name:'Editor',
    meta: {tittle:'编辑器',},
    component: () => import('../views/Editor.vue')
  },
  {
    path: '/pmsg',
    name:'Pmsg',
    meta: {tittle:'个人页面',},
    component: () => import('../views/Personalmsg.vue')
  },
      {
    path: '/test',
    name:'Test',
    meta: {tittle:'个人页面',},
    component: () => import('../views/Test.vue')
  },
]

const router = new VueRouter({
  routes
})

export default router
