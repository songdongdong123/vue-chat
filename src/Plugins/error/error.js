import Vue from 'vue'
import Main from './error.vue'
let instance
let ErrorConstuctor = Vue.extend(Main)
const Errorplugins = function (options) {
  instance = new ErrorConstuctor({
    data: options
  })
  instance.vm = instance.$mount()
  let isNode = document.querySelector('.errorplugins')
  if (!isNode) {
    document.body.appendChild(instance.vm.$el)
  }
}
Vue.prototype.$error = Errorplugins
export default Errorplugins
