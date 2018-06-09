var Dialog = {}
var showdDialog = false
var dialogNode = {}
Dialog.install = function (Vue, options) {
  Vue.prototype.$dialog = function (argments) {
    if (argments.type === 'close') {
      dialogNode.show = dialogNode = false
      document.querySelector('.dialogNode').remove()
    } else {
      if (showdDialog) {
        return
      }
      let DialogTpl = Vue.extend({
        data: function () {
          return {
            show: showdDialog,
            state: true,
            name: argments.name
          }
        },
        methods: {
          testClick () {
            this.state = false
          }
        },
        template: `<div class="dialogNode" @click="testClick" v-if="state">
          <div class="prizeImg"></div>
          <p>{{name}}</p>
        </div>
        `
      })
      let tpl = new DialogTpl().$mount().$el
      document.body.appendChild(tpl)
    }
  }
}

export {
  Dialog
}
