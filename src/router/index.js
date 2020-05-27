import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/Home'
import Regist from '@/components/Regist'
import Search from '@/components/Search'
import Upload from '@/components/Upload'
import NewUpload from '@/components/NewUpload'
import Check from '@/components/Check'
import Preview from '@/components/Preview'
import UserManage from '@/components/UserManage'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        keepAlive: true,
        requireLogin: false
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        keepAlive: false,
        requireLogin: false
      }
    },
    {
      path: '/regist',
      name: 'regist',
      component: Regist,
      meta: {
        keepAlive: false,
        requireLogin: false
      }
    },
    {
      path: '/search',
      name: 'search',
      component: Search,
      meta: {
        keepAlive: true,
        requireLogin: true
      }
    },
    {
      path: '/upload',
      name: 'upload',
      component: Upload,
      meta: {
        keepAlive: true,
        requireLogin: true
      }
    },
    {
      path: '/newUpload',
      name: 'newUpload',
      component: NewUpload,
      meta: {
        keepAlive: true,
        requireLogin: true
      }
    },
    {
      path: '/check',
      name: 'Check',
      component: Check,
      meta: {
        keepAlive: true,
        requireLogin: true
      }
    },
    {
      path: '/preview',
      name: 'Preview',
      component: Preview,
      meta: {
        keepAlive: true,
        requireLogin: true
      }
    },
    {
      path: '/userManage',
      name: 'UserManage',
      component: UserManage,
      meta: {
        keepAlive: true,
        requireLogin: true
      }
    }
  ]
})
