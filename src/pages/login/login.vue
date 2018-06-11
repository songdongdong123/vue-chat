<template>
  <div class="login">
    <div class="login_container">
      <div class="logo">
        <img src="./logo.jpg" alt="">
      </div>
      <div class="base username">
        <input type="text" v-on:focus="handlerBlur(0)">
      </div>
      <div class="base pssword">
        <input type="password" v-on:focus="handlerBlur(0)">
      </div>
      <div class="login">
        <p>登录</p>
        <p @click="toRgister">注册</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      blurstate: false
    }
  },
  methods: {
    handlerBlur () {
      console.log('获取焦点')
    },
    toRgister () {
      this.$router.push({path: '/register'})
    }
  }
}
</script>

<style lang="stylus" scoped>
  .login
    position:fixed
    width:100%
    height:100%
    display:flex
    justify-content:center
    .login_container
      .logo
        width:100px
        height:100px
        overflow:hidden
        margin:0 auto
        border-radius:100%
        margin-bottom:50px
        margin-top:100px
        img
          width:100%
          height:100%
      .base
        border:1px solid #ccc
        box-sizing:border-box
        width:300px
        margin-top:40px
        overflow: hidden
        border-radius:5px
        transition:all .5s
        input
          width:100%
          height:100%
          height:45px
          padding:0 15px
          box-sizing:border-box
          font-size:20px
      .baseblur
        border-color:#331Ccc
      .login
        width:300px
        margin-top:40px
        // background:#331Ccc
        height:45px
        color:#fff
        text-align:center
        line-height:45px
        display:flex
        justify-content:space-between
        p
          background:#331Ccc
          border-radius:5px
          width:45%
</style>
