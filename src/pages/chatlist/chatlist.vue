<template>
  <div class="chatlist">
    <div class="chatlisttitle">
      <span class="icon-fanhui" @click="backTo"></span>
      <p>消息列表</p>
    </div>
    <ul class="list">
      <li v-for="(list, index) in getChatList.filter(v => v[0].form === userid || v[0].to === userid)" class="item" @click="toChat(list)">
        <div class="chatitem">
          <!-- 图像的取法和下面同理 -->
          <img :src="require(`../../assets/avater/${getUsers[list[0].form === userid ? list[0].to : list[0].form].avatar}.jpg`)" alt="">
          <div class="content">
            <p class="username">
              <!-- v[0].form === userid ? v[0].to : v[0].form -->
              <!-- 上面是为了得到聊天列表中每一项都是和谁在聊天 -->
              <!-- {{list[0].form === userid ? list[0].to : list[0].form}} -->
              {{getUsers[list[0].form === userid ? list[0].to : list[0].form].user_name}}
            </p>
            <p class="msg">{{list[list.length-1].content}}</p>
          </div>
          <div class="chatorther">
            <p class="time">{{list[list.length-1].created_at|chatDate}}</p>
            <p class="number" v-show="list.filter(v=>v.to===userid&&!v.read).length">
              <span>{{list.filter(v=>v.to===userid&&!v.read).length}}</span>
            </p>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import { getCookie } from 'common/js/common'
  const userid = getCookie('user_id')
  export default {
    data () {
      return {
        userid: userid
      }
    },
    created () {
      this.getMsgList()
    },
    computed: {
      ...mapGetters([
        'getChatList',
        'getUsers'
      ])
    },
    methods: {
      backTo () {
        this.$router.back()
      },
      toChat (list) {
        // form一定是当前用户的id
        // 这里要注意to不一定就是我们获取的chatlist中每条数据的to字段，因为有可能to是当前用户自己
        let to = list[0].form === userid ? list[0].to : list[0].form
        let username = this.getUsers[to].user_name
        this.$router.push({path: '/chat', query: {form: userid, to: to, username: username}})
      },
      ...mapActions({
        getMsgList: 'getMsgList'
      })
    }
  }
</script>

<style lang="stylus" scoped>
  .chatlist
    position:fixed
    width:100%
    min-height:100vh
    .chatlisttitle
      height:45px
      line-height:45px
      text-align:center
      position: relative
      color:#fff
      border-bottom:1px solid #ccc
      .icon-fanhui
        position:absolute
        left:10px
        font-size:20px
    .list
      margin:auto 10px
      .item
        .chatitem
          height:60px
          color:#fff
          display:flex
          justify-content:space-between
          align-items:center
          margin:auto 5px
          img
            width:40px
            height:40px
            border-radius:10px
          .content
            width:70%
            .msg
              overflow: hidden
              text-overflow:ellipsis
              white-space: nowrap
              font-size:13px
              color:#ccc
              margin-top:10px
            .username
              font-size:15px
          .chatorther
            .time
              font-size:12px
              width:40px
              text-align:center
            .number
              background:red
              width:20px
              height:20px
              padding:6px
              display:flex
              justify-content:center
              align-items:center
              border-radius:50%
              margin:0 auto
              margin-top:10px
              span
                transform:scale(0.7)
                font-family: Tahoma!important
    .list>li
      border-bottom:1px solid #aaa
</style>

