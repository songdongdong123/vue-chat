<template>
  <transition name="slide">
    <div class="comment" v-if="showstate">
      <div class="title">
        <div class="titlecontainer">
          <p class="icon iconleft" @click="hidecomment"><span class="icon-fanhui"></span></p>
          <p>文章详情</p>
          <p class="icon iconright" @click="sendcomment"><span class="sendcommend">发送</span></p>
        </div>
      </div>
      <div class="commentcontainer">
        <textarea 
          placeholder="写评论" 
          v-on:input="autoHeight" 
          v-model="comment"
          ref="textarea"></textarea>
      </div>
    </div>
  </transition>
</template>

<script>
  import { mapActions } from 'vuex'
  export default {
    props: {
      showstate: {
        type: Boolean,
        default: false
      },
      guestnum: {
        type: Number,
        default: 0
      }
    },
    data () {
      return {
        comment: ''
      }
    },
    methods: {
      hidecomment () {
        this.$emit('hidecomment')
      },
      sendcomment () {
        // 发表评论
        let comment = {
          guest_count: this.comment,
          poetrylist_id: this.$route.query.poetrylist_id,
          guest_num: this.guestnum + 1
        }
        this.sendArtComment({comment}).then(res => {
          if (res.status === 200 && res.data.code === 0) {
            this.hidecomment()
            this.comment = ''
          }
        })
      },
      autoHeight ($e) {
        this.$refs.textarea.style.height = $e.target.scrollHeight + 'px'
      },
      ...mapActions([
        'sendArtComment'
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
  .comment
    position:fixed
    width:100%
    height:100vh
    background:#fff
    z-index: 5000
    top:0
    left:0
    color:#333
    .title
      .titlecontainer
        position: relative
        p
          text-align:center
          line-height:45px
        span
          font-size:20px
        .icon
          position:absolute
          top:0
          width:45px
          height:45px
          display:flex
          justify-content:center
          align-items:center
        .iconright
          right:10px
          span
            font-size:15px
            color:#1b9af4
    .commentcontainer
      overflow-y:auto
      height:550px
      textarea
        width:100%
        border:none
        box-sizing:border-box
        padding:10px
        height:auto
        // background:rgba(0,0,0,0)
</style>

