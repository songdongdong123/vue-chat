<template>
  <div class="chat">
    <div class="msglist">
      <div v-for="list in getmsglist"
        class="basechatitem"
      >
      <div class="chatbase chatto" v-if="list.form===userid">
        <span>{{list.content}}</span>
        <img :src="require(`../../assets/avater/${list.account.avatar||1}.jpg`)" alt="">
      </div>
      <div class="chatbase chatme" v-else>
        <img :src="require(`../../assets/avater/${list.account.avatar||1}.jpg`)" alt="">
        <span>{{list.content}}</span>
      </div>
      </div>
    </div>
    <div class="sendmsg">
      <input type="text" v-model="msg" placeholder="输入聊天信息">
      <span @click="submitMsg">发送</span>
    </div>
  </div>
</template>

<script>
  // import io from 'socket.io-client'
  import { mapActions, mapGetters } from 'vuex'
  // const socket = io('ws://localhost:9094')
  export default {
    data () {
      return {
        msg: '',
        msglist: [],
        userid: ''
      }
    },
    created () {
      this.userid = this.$route.query.form
      this.getMsgList()
      this.recvMsg()
    },
    computed: {
      ...mapGetters([
        'getmsglist'
      ])
    },
    methods: {
      submitMsg () {
        this.sendMsg({form: this.$route.query.form, to: this.$route.query.to, msg: this.msg})
        this.msg = ''
      },
      ...mapActions({
        getMsgList: 'getMsgList',
        sendMsg: 'sendMsg',
        recvMsg: 'recvMsg'
      })
    }
  }
</script>

<style lang="stylus" scoped>
  .chat
    color:#fff
    .msglist
      .basechatitem
        height:50px
        line-height:50px
        .chatbase
          display:flex
          align-items:center
          img
            width:40px
            height:40px
            border-radius:100%
        .chatto
          justify-content:flex-end
          text-align:left
          img
            margin-left:10px
        .chatme
          img
            margin-right:10px
    .sendmsg
      position:fixed
      bottom:0
      height:50px
      width:100%
      display:flex
      align-items:center
      input
        height:50px
        width:85%
        padding-left:10px
      span
        display:inline-block
        height:50px
        color:#000
        background:#ccc
        width:15%
        text-align:center
        line-height:50px
</style>
