
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import 'common/stylus/index.styl'
import 'common/stylus/colorreset.styl'
import { Loading, Toast } from './Plugins/index'
Vue.use(Loading)
Vue.use(Toast)
Vue.config.productionTip = false

// router.beforeEach((to, from, next) => {

// })
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
