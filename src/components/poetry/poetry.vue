<template>
<transition name="slide" v-if="poetryState">
  <div class="poetry">
    <div class="container">
      <div class="title">
        <span class="icon-fanhui" @click="closeThis"></span>
        <span class="send" @click="submitpoetry">发送</span>
      </div>
      <div class="textarea">
        <textarea 
        v-on:input="autoHeight" 
        placeholder="请输入你想说的话" 
        ref="textarea"
        v-model="content"></textarea>
      </div>
    </div>
  </div>
</transition>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  export default {
    props: {
      poetryState: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        content: ''
      }
    },
    computed: {
      ...mapGetters([
        'getPoetryItem'
      ])
    },
    methods: {
      submitpoetry () {
        // 发表骚话
        if (this.content) {
          const item = {
            content: this.content,
            create_temp: new Date().getTime(),
            star: 0,
            recommend: 0
          }
          this.setPoetryItem({item})
          this.closeThis()
          this.content = ''
        } else {
          this.$toast({
            state: true,
            desc: '没有输入任何内容'
          })
        }
      },
      autoHeight ($e) {
        this.$refs.textarea.style.height = $e.target.scrollHeight + 'px'
      },
      closeThis () {
        this.$emit('hidepoetrycontainer')
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
    position:absolute
    width:100%
    height:100%
    z-index:2000
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
      height:600px
      overflow-y:auto
      textarea
        box-sizing:border-box
        padding:10px
        width:100%
        border:none
        height:auto
</style>
