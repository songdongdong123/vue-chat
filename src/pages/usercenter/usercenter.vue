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
        <p class="article" :class="{'active': listtype === 0}" @click="showThisList(0)">
          <span>{{poetrylist.length}}</span>
          <span>文章</span>
        </p>
        <p class="attention" :class="{'active': listtype === 1}" @click="showThisList(1)">
          <span>{{userinfo.attention}}</span>
          <span>关注</span>
        </p>
        <p class="fans" :class="{'active': listtype === 2}" @click="showThisList(2)">
          <span>{{userinfo.user_fans}}</span>
          <span>粉丝</span>
        </p>
      </div>
      <p class="edit">编辑个人资料</p>
    </div>
    <poetrylistcompent
      v-if="listtype === 0"
      :datalist="poetrylist"
    ></poetrylistcompent>
    <attentionlist
      v-if="listtype === 1"
      :attentionlist="attentionlist"
      :userid="userinfo.user_id"
    >
    </attentionlist>
    <attentionlist
      v-if="listtype === 2"
      :attentionlist="attentionlist"
      :userid="userinfo.user_id"
    >
    </attentionlist>
    <div class="msg" @click="toChatList">
      <span class="icon-xinfeng"></span>
    </div>
  </div>
</template>

<script>
  import poetrylistcompent from '../../components/poetrylist/poetrylist'
  import attentionlist from '@/components/attentionlist/attentionlist'
  import { mapActions } from 'vuex'
  export default {
    data () {
      return {
        userinfo: {},
        poetrylist: [],
        attentionlist: [],
        listtype: 0
      }
    },
    created () {
      this.getUserInfo()
      this.getMsgList()
    },
    methods: {
      toChatList () {
        this.$router.push({path: '/chatlist'})
      },
      showThisList (type) {
        switch (type) {
          case 0:
            this.listtype = 0
            break
          case 1:
            this._getUserTransmitlist()
            this.listtype = 1
            break
          case 2:
            this._getUserFan()
            this.listtype = 2
            break
        }
      },
      _getUserFan () {
        // 获取粉丝列表
        this._getUserFans().then(res => {
          this.attentionlist = res.data
        })
      },
      _getUserTransmitlist () {
        // 获取关注列表
        this._getUserAttentionlist().then(res => {
          this.attentionlist = res.data
        })
      },
      getUserInfo () {
        // 获取用户信息
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
        '_getUserInfo',
        '_getUserAttentionlist',
        '_getUserFans',
        'getMsgList'
      ])
    },
    components: {
      poetrylistcompent,
      attentionlist
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
      margin:auto 15px
      margin-top:20px
      color:#fff
      .msgcontainer
        color:#999
        display:flex
        p
          text-align:center
          span
            display:block
        p>span:not(:last-child)
          margin-bottom:5px
        .active
          color:#fff
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
    .msg
      position:fixed
      bottom:10px
      right:10px
      width:50px
      height:50px
      background: rgba(27,154,244,0.8)
      color:#fff
      line-height:50px
      text-align:center
      border-radius:100%
    .icon-xinfeng
      font-size:25px
</style>

