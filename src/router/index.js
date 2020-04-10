import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/Home'
import Regist from '@/components/Regist'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: Home,
      meta: {
        keepalive: true,
        requireLogin: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        keepalive: false,
        requireLogin: false
      }
    },
    {
      path: '/regist',
      name: 'regist',
      component: Regist,
      meta: {
        keepalive: false,
        requireLogin: false
      }
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      meta: {
        keepalive: true,
        requireLogin: true
      }
    }
  ]
})
