import Vue from 'vue'
import Main from './toast.vue'
let ToastConstructor = Vue.extend(Main)
let instance
const Toast = function (options) {
  instance = new ToastConstructor({
    data: options
  })
  instance.vm = instance.$mount()
  let isNode = document.querySelector('.toastplugins')
  if (!isNode) {
    document.body.appendChild(instance.vm.$el)
  } else {
    document.body.removeChild(isNode)
  }
}
Vue.prototype.$toast = Toast
export default Toast
