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
    },
    {
      path: '/usercenter',
      name: 'usercenter',
      component: (resolve) => {
        require(['@/pages/usercenter/usercenter'], resolve)
      },
      meta: {
        title: '用户中心'
      }
    },
    {
      path: '/userinfo',
      name: 'userinfo',
      component: (resolve) => {
        require(['@/pages/userinfo/userinfo'], resolve)
      },
      meta: {
        title: '用户信息'
      }
    },
    {
      path: '/poetrydetail',
      name: 'poetrydetail',
      component: (resolve) => {
        require(['@/pages/poetrydetail/poetrydetail'], resolve)
      },
      meta: {
        title: '用户信息'
      }
    },
    {
      path: '/publish',
      name: 'publish',
      component: (resolve) => {
        require(['@/pages/publish/publish'], resolve)
      },
      meta: {
        title: '转发'
      }
    },
    {
      path: '/chat',
      name: 'chat',
      component: (resolve) => {
        require(['@/pages/chat/chat'], resolve)
      },
      meta: {
        title: '聊天'
      }
    },
    {
      path: '/chatlist',
      name: 'chatlist',
      component: (resolve) => {
        require(['@/pages/chatlist/chatlist'], resolve)
      },
      meta: {
        title: '消息列表'
      }
    }
  ]
})
