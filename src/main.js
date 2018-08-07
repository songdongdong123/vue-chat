
import Vue from 'vue'
import App from './App'
import router from './router'
import fastclick from 'fastclick'
import store from './store'
import 'common/stylus/index.styl'
import 'common/stylus/colorreset.styl'
import { Loading, Toast } from './Plugins/index'
import { getCookie } from 'common/js/common'
import * as filters from './common/js/filter'
Vue.use(Loading)
Vue.use(Toast)
Vue.config.productionTip = false

fastclick.attach(document.body)

// 引入过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  if (to.name === 'usercenter') {
    let cookie = getCookie('user_id')
    if (!cookie) {
      next(false)
      router.push({path: '/login'})
      return null
    }
  }
  next()
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
