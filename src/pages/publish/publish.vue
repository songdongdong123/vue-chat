<template>
<transition name="slide">
  <div class="poetry">
    <div class="container">
      <div class="title">
        <span class="icon-fanhui" @click="back"></span>
        <span class="send" @click="submitpoetry">发送</span>
      </div>
      <div class="textarea">
        <textarea 
        v-on:input="autoHeight" 
        placeholder="请输入你想说的话" 
        ref="textarea"
        v-model="content"></textarea>
      </div>
      <div class="transmit">
        <!-- <div class="userinfo" v-if="transmitPoetry.account">
          <img :src="require(`../../assets/avater/${transmitPoetry.account.avatar}.jpg`)" alt="">
        </div> -->
        <div class="poetrydesc" v-if="transmitPoetry.account">
          <p class="user">@{{transmitPoetry.account.user_name}}</p>
          <p class="content">{{transmitPoetry.content}}</p>
        </div>
      </div>
    </div>
  </div>
</transition>
</template>

<script>
  import { mapActions } from 'vuex'
  import { getPoetryBrief } from 'api/poetry'
  export default {
    data () {
      return {
        content: '转发微博',
        transmitPoetry: {}
      }
    },
    created () {
      getPoetryBrief({
        poetrylist_id: this.$route.query.poetrylist_id
      }).then(res => {
        this.transmitPoetry = res.data.data
      })
    },
    methods: {
      submitpoetry () {
        // 发表微博
        const item = {
          content: this.content,
          transmit_content: this.transmitPoetry.content,
          transmit_user_id: this.transmitPoetry.account.user_id,
          transmit_user_name: this.transmitPoetry.account.user_name,
          transmit_poetrylist_id: this.transmitPoetry.poetrylist_id
        }
        const star = {
          star: this.transmitPoetry.star + 1
        }
        this.setPoetryItem({item, star}).then(res => {
          if (res.code === 0) {
            this.$router.back()
          }
        })
        this.content = ''
      },
      back () {
        this.$router.back()
      },
      autoHeight ($e) {
        this.$refs.textarea.style.height = $e.target.scrollHeight + 'px'
      },
      ...mapActions([
        'setPoetryItem'
      ])
    }
  }
</script>

<style lang="stylus" scoped>
  .slide-enter-active,.slide-leave-active
    transition: all .5s
  .slide-enter
    transform: translate3d(100%, 0, 0)
    opacity:1
  .slide-leave-to
    transform: translate3d(100%, 0, 0)
  .poetry
    min-height:100vh
    background:#fff
    top:0
    .container
      margin: auto 0
      border-radius:10px
      background:#fff
      position: relative
      .title
        height:50px
        border-bottom:1px solid #ccc
        display:flex
        justify-content:space-between
        align-items:center
        padding:0 15px
        .icon-fanhui
          font-size:20px
        .send
          color:#1b9af4
    .textarea
      min-height:100px
      overflow-y:auto
      textarea
        box-sizing:border-box
        padding:10px
        width:100%
        border:none
        height:auto
    .transmit
      margin:auto 15px
      display:flex
      align-items:center
      // justify-content:
      .userinfo
        img
          width:80px
          height:80px
      .poetrydesc
        // margin-left:10px
        .user
          color:$color-sky-blue
        .content
          font-size:13px
          line-height:20px
          height:55px
          display: -webkit-box
          -webkit-box-orient: vertical
          -webkit-line-clamp: 3
          overflow: hidden

</style>
