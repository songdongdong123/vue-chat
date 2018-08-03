<template>
  <div class="chat">
    <p>chat:</p>
    <div class="msglist">
      <p v-for="list in msglist">{{list}}</p>
    </div>
    <div class="sendmsg">
      <input type="text" v-model="msg" placeholder="输入聊天信息">
      <span @click="submitMsg">发送</span>
    </div>
  </div>
</template>

<script>
  // import io from 'socket.io-client'
  // const socket = io('ws://localhost:9094')
  import { mapActions } from 'vuex'
  export default {
    data () {
      return {
        msg: '',
        msglist: []
      }
    },
    created () {
      // socket.on('recvmsg', (data) => {
      //   this.msglist = [...this.msglist, data.msg]
      // })
    },
    methods: {
      _getMsgList () {
        // 获取聊天列表
      },
      submitMsg () {
        // socket.emit('sendmsg', {msg: this.msg})
        this.msg = ''
      },
      ...mapActions({
        getMsgList: 'getMsgList'
      })
    }
  }
</script>

<style lang="stylus" scoped>
  .chat
    color:#fff
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
