<template>
  <div class="chat">
    <div class="chattitle">
      <span class="icon-fanhui" @click="backTo"></span>
      <p>{{username}}</p>
    </div>
    <scroll
      :data='getmsglist'
      class="msglist"
    >
      <div>
        <div v-for="list in getmsglist.filter(v => v.chatid === chatid)"
          class="basechatitem"
        >
        <div class="chatbase chatto" v-if="list.form===userid">
          <p class="chatmsg">{{list.content}}</p>
          <img :src="require(`../../assets/avater/${list.account.avatar||1}.jpg`)" alt="">
        </div>
        <div class="chatbase chatme" v-else>
          <img :src="require(`../../assets/avater/${list.account.avatar||1}.jpg`)" alt="">
          <p class="chatmsg">{{list.content}}</p>
        </div>
        </div>
      </div>
    </scroll>
    <div class="sendmsg">
      <input type="text" v-model="msg" placeholder="输入聊天信息">
      <span @click="submitMsg">发送</span>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import { getChatId } from 'common/js/common'
  import scroll from '@/components/scroll/scroll'
  export default {
    data () {
      return {
        msg: '',
        msglist: [],
        userid: '',
        chatid: '',
        username: '',
        to: ''
      }
    },
    created () {
      this.userid = this.$route.query.form
      this.username = this.$route.query.username
      this.form = this.$route.query.form
      this.chatid = getChatId(this.userid, this.$route.query.to)
      this.getMsgList()
    },
    computed: {
      ...mapGetters([
        'getmsglist'
      ])
    },
    methods: {
      getUnreadId () {
        // 获取所有当前聊天信息的chatid
      },
      submitMsg () {
        this.sendMsg({form: this.form, to: this.$route.query.to, msg: this.msg})
        this.msg = ''
      },
      backTo () {
        this.$router.back()
      },
      ...mapActions({
        getMsgList: 'getMsgList',
        sendMsg: 'sendMsg',
        readMsg: '_readMsg'
      })
    },
    beforeDestroy () {
      // 标记消息已读
      this.readMsg(this.form)
    },
    components: {
      scroll
    }
  }
</script>

<style lang="stylus" scoped>
  .chat
    color:#fff
    .chattitle
      height:45px
      line-height:45px
      text-align:center
      position: relative
      border-bottom:1px solid #ccc
      z-index:1000
      background:#331caa
      .icon-fanhui
        position:absolute
        left:10px
        font-size:20px
    .msglist
      padding-top:20px
      padding-bottom:70px
      height:80%
      position:absolute
      width:100%
      .basechatitem
        min-height:50px
        margin:auto 15px
        .chatbase
          display:flex
          align-items:center
          img
            width:40px
            height:40px
            border-radius:100%
          .chatmsg
            display:inline-block
            overflow: hidden
            word-wrap:break-word
            width:100%
        .chatto
          justify-content:flex-end
          text-align:right
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
        color:#fff
        background: rgba(27,154,244,0.8)
        width:15%
        text-align:center
        line-height:50px
</style>
