<template>
  <div class="chat">
    <div class="msglist">
      <p v-for="list in getmsglist"
        class="basechatitem"
        :class="{'chatto':list.form === userid}"
      >
        <span>
          <!-- list.account.user_name + -->
          {{
            list.form===userid?(list.content + ':'):( ':'+ list.content)
          }}
        </span>
        <!-- <span>{{list.account.user_name}}:{{list.content}}</span> -->
      </p>
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
      // // socket.on('recvmsg', (data) => {
      // //   this.msglist = [...this.msglist, data.msg]
      // // })
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
      .chatto
        text-align:right
      .basechatitem
        height:30px
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
      span
        display:inline-block
        height:50px
        color:#000
        background:#ccc
        width:15%
        text-align:center
        line-height:50px
</style>
