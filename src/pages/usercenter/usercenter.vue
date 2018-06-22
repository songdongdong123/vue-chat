<template>
  <div class="usercenter">
    <div class="title">
      <!-- <p>用户中心</p> -->
    </div>
    <div class="img">
      <img :src="require(`../../assets/avater/${userinfo.avatar}.jpg`)" alt="" v-if="userinfo.avatar">
      <img :src="require(`../../assets/avater/${1}.jpg`)" alt="" v-else>
      <p class="base"><span>昵称：</span><span>{{userinfo.user_name}}</span></p>
      <p class="base"><span>邮箱：</span><span>{{userinfo.email}}</span></p>
      <div class="desc" v-if="userinfo.user_info">
        <p class="manifesto">简介：</p>
       <p v-for="list in userinfo.user_info.split('\n').map(v => {
          return v
        })">{{list}}</p>
      </div>
    </div>
    <div class="bottom" @click="toHomePage">
      <p>返回大厅</p>
    </div>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  export default {
    data () {
      return {
        userinfo: {}
      }
    },
    created () {
      this.getUserInfo()
    },
    methods: {
      getUserInfo () {
        this._getUserInfo({}).then(res => {
          this.userinfo = res
          console.log(res)
        })
      },
      toHomePage () {
        this.$router.push({path: '/'})
      },
      ...mapActions([
        '_getUserInfo'
      ])
    }
  }
</script>

<style lang="stylus" scoped>
  .usercenter
    position:absolute
    width:100%
    min-height:100vh
    .title
      text-align:center
      // color:#fff
      height:45px
      line-height:45px
    .img
      text-align: center
      // color:#fff
      img
        width:100px
        height:100px
        border-radius:100%
      p
        text-align:left
        margin:auto 20px
        display:flex
        margin-top:20px
      p>span:nth-child(1)
        width:50px  
      .desc
        p
          margin-left:70px
          margin-top: 20px
        .manifesto
          margin:auto 20px
          margin-top: 20px
    .bottom
      margin:auto 50px
      text-align:center
      margin-top: 100px
      border:1px solid #ccc
      height:45px
      line-height:45px
      border-radius:5px
      // color:#fff
</style>

