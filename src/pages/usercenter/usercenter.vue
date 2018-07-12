<template>
  <div class="usercenter">
    <div class="titles">
      <span class="icon-fanhui" @click="toHomePage"></span>
      <span></span>
    </div>
    <div class="img">
      <img :src="require(`../../assets/avater/${userinfo.avatar}.jpg`)" alt="" v-if="userinfo.avatar">
      <img :src="require(`../../assets/avater/${1}.jpg`)" alt="" v-else>
      <div class="desc" v-if="userinfo.user_info">
        <p class="base"><span></span><span>{{userinfo.user_name}}</span></p>
        <p class='info'>简介：{{userinfo.user_info}}</p>
      </div>
    </div>
    <div class="somemsg">
      <div class="msgcontainer">
        <p class="article">
          <span>{{poetrylist.length}}</span>
          <span>文章</span>
        </p>
        <p class="attention">
          <span>{{userinfo.attention}}</span>
          <span>关注</span>
        </p>
        <p class="fans">
          <span>{{userinfo.user_fans}}</span>
          <span>粉丝</span>
        </p>
      </div>
      <p class="edit">编辑个人资料</p>
    </div>
    <poetrylistcompent
      :datalist="poetrylist"
    ></poetrylistcompent>
  </div>
</template>

<script>
  import poetrylistcompent from '../../components/poetrylist/poetrylist'
  import { mapActions } from 'vuex'
  export default {
    data () {
      return {
        userinfo: {},
        poetrylist: []
      }
    },
    created () {
      this.getUserInfo()
    },
    methods: {
      getUserInfo () {
        let userid = {
          user_id: this.$route.query.user_id
        }
        this._getUserInfo({userid}).then(res => {
          this.userinfo = res.user_info
          let poetrylist = res.list
          this.poetrylist = poetrylist.map(v => {
            v.account = {
              avatar: this.userinfo.avatar,
              user_id: this.userinfo.user_id,
              user_name: this.userinfo.user_name
            }
            return v
          })
        })
      },
      toHomePage () {
        this.$router.push({path: '/'})
      },
      ...mapActions([
        '_getUserInfo'
      ])
    },
    components: {
      poetrylistcompent
    }
  }
</script>

<style lang="stylus" scoped>
  .usercenter
    position:absolute
    width:100%
    min-height:100vh
    .titles
      height:45px
      line-height:45px
      margin:auto 10px
      font-size:20px
      color:#fff
    .img
      margin:auto 15px
      display:flex
      align-items:center
      color:#fff
      img
        width:64px
        height:64px
        border-radius:100%
      .desc
        margin-left:15px
        .base
          margin-bottom:15px
          font-size:20px
        .info
          font-size:12px
    .somemsg
      display:flex
      align-items:center
      justify-content:space-between
      color:#fff
      margin:auto 15px
      margin-top:20px
      .msgcontainer
        display:flex
        p
          span
            display:block
        p>span:not(:last-child)
          margin-bottom:5px
      .msgcontainer>p:not(:last-child)
        margin-right:25px
      .edit
        height:32px
        line-height:30px
        padding:0 30px
        border:1px solid #c5c5cc
        border-radius:3px
        font-size:14px
        box-sizing:border-box
</style>

