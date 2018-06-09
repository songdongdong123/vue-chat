// var Loading = {}
// var showLoad = false
// var loadNode = {}
// Loading.install = function (Vue, options) {
//   Vue.prototype.$loading = function (type) {
//     if (type === 'close') {
//       loadNode.show = showLoad = false
//       document.querySelector('.loadEffect').remove()
//     } else {
//       if (showLoad) {
//         return
//       }
//       let LoadingTpl = Vue.extend({
//         data: function () {
//           return {
//             show: showLoad
//           }
//         },
//         template: `<div class="loadEffect"><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><p class="loadings">loading....</p></div>
//         `
//       })
//       let tpl = new LoadingTpl().$mount().$el
//       document.body.appendChild(tpl)
//       loadNode.show = showLoad = true;
//       ['open', 'close'].forEach(function (type) {
//         Vue.prototype.$loading[type] = function () {
//           return Vue.prototype.$loading(type)
//         }
//       })
//     }
//   }
// }
import Vue from 'vue'
import Main from './loading.vue'
let LoadingConstructor = Vue.extend(Main)
let instance
const Loading = function (options) {
  instance = new LoadingConstructor({
    data: options
  })
  instance.vm = instance.$mount()
  let isNode = document.querySelector('.loadingPlugins')
  if (!isNode) {
    document.body.appendChild(instance.vm.$el)
  } else {
    document.body.removeChild(isNode)
  }
}
Vue.prototype.$loading = Loading
export default Loading
