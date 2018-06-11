import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: (resolve) => {
        require(['@/pages/home/home'], resolve)
      },
      meta: {
        title: '首页'
      }
    },
    {
      path: '/login',
      name: 'login',
      component: (resolve) => {
        require(['@/pages/login/login'], resolve)
      },
      meta: {
        title: '登录'
      }
    },
    {
      path: '/register',
      name: 'register',
      component: (resolve) => {
        require(['@/pages/register/register'], resolve)
      },
      meta: {
        title: '注册'
      }
    }
  ]
})
