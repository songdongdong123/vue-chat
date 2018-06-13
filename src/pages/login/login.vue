<template>
  <div class="login">
    <div class="login_container">
      <div class="logo">
        <img src="./logo.jpg" alt="">
      </div>
      <div class="base username">
        <input type="text" placeholder="用户名" v-model="user_name">
      </div>
      <div class="base pssword">
        <input type="password" placeholder="密码" v-model="pwd">
      </div>
      <div class="login">
        <p @click="handlerLogin">登录</p>
        <p @click="toRgister">注册</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      blurstate: false,
      user_name: '',
      pwd: ''
    }
  },
  methods: {
    handlerLogin () {
      if (!this.user_name) {
        this.$toast({
          state: true,
          desc: '请输入用户名'
        })
        return
      }
      if (!this.pwd) {
        this.$toast({
          state: true,
          desc: '请输入密码'
        })
        return
      }
      let userinfo = {
        user_name: this.user_name,
        pwd: this.pwd
      }
      this.userLogin({userinfo}).then(res => {
        if (res.status === 200 && res.data.code === 0) {
          this.$router.push({path: '/'})
        }
      })
    },
    toRgister () {
      this.$router.push({path: '/register'})
    },
    ...mapActions([
      'userLogin'
    ])
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
          background:rgba(0,0,0,0)
          color:#fff
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
          background:rgba(0,0,0,0)
          border-radius:5px
          width:45%
          border:1px solid #fff
</style>
