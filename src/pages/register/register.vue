<template>
  <div class="register">
    <div class="register_container">
      <div class="logo">
        <img src="../login/logo.jpg" alt="">
      </div>
      <div class="base username">
        <input type="text"  placeholder="用户名" v-model="username">
      </div>
      <div class="base pssword">
        <input type="password"  placeholder="密码" v-model="password">
      </div>
      <div class="base repeatpssword">
        <input type="password"  placeholder="确认密码" v-model="repeatword">
      </div>
      <div class="register" @click="handlerLogin">
        注册
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
      username: '',
      password: '',
      repeatword: ''
    }
  },
  methods: {
    handlerBlur () {
      // console.log('获取焦点')
    },
    handlerLogin () {
      // 注册
      let userinfo = {
        user_name: this.username,
        pwd: this.password
      }
      if (!this.username) {
        this.$toast({
          state: true,
          desc: '请输入用户名'
        })
        return
      }
      if (!this.password) {
        this.$toast({
          state: true,
          desc: '请输入密码'
        })
        return
      }
      if (!this.repeatword) {
        this.$toast({
          state: true,
          desc: '请确认密码'
        })
        return
      }
      if (this.password === this.repeatword) {
        this.registerAccount({userinfo}).then(res => {
          if (!res.userinfo) {
            this.$router.push({path: '/userinfo'})
          }
        })
      } else {
        this.$toast({
          state: true,
          desc: '两次密码不一致',
          duration: 2000
        })
      }
    },
    ...mapActions([
      'registerAccount'
    ])
  }
}
</script>

<style lang="stylus" scoped>
  .register
    position:fixed
    width:100%
    height:100%
    display:flex
    justify-content:center
    .register_container
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
      .register
        width:300px
        margin-top:40px
        background:rgba(0,0,0,0)
        height:45px
        border-radius:5px
        color:#fff
        text-align:center
        line-height:45px
        border:1px solid #fff
</style>
