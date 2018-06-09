<template>
<transition name="fade" v-if="poetryState">
  <div class="poetry">
    <div class="container">
      <textarea name="" id="" cols="30" rows="5" v-model="content"></textarea>
      <div class="bottom">
        <p class="close" @click="closeThis">取消</p>
        <p class="submit" @click="submitpoetry">发表</p>
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
      _setPoetryItem () {
        const item = {
          content: this.content,
          create_temp: new Date().getTime(),
          star: 0,
          recommend: 0
        }
        this.setPoetryItem({item})
      },
      submitpoetry () {
        // 发表骚话
        const item = {
          content: this.content,
          create_temp: new Date().getTime(),
          star: 0,
          recommend: 0
        }
        this.setPoetryItem({item})
        this.closeThis()
        this.content = ''
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
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
  .poetry
    position:fixed
    width:100%
    height:100%
    display:flex
    justify-content:center
    align-items:center
    z-index:2000
    background:rgba(0,0,0,.6)
    top:0
    .container
      width:350px
      height:300px
      margin: auto 0
      border-radius:10px
      background:#fff
      display:flex
      justify-content:center
      position: relative
      textarea
        text-align:center
        width:250px
        height:100px
        overflow-y:hidden 
        border:1px solid $color-meta
        padding:10px
        margin-top: 50px
      .bottom
        position:absolute
        width:80%
        bottom:30px
        border-radius:10px
        display:flex
        justify-content:space-between
        .close
          width:100px
          height:40px
          border-radius:10px
          text-align:center
          line-height:40px
          border:1px solid #ccc
          box-sizing:border-box
          color:#333
        .submit
          width:100px
          height:40px
          border-radius:10px
          background:$color-meta
          text-align:center
          line-height:40px
          color:#fff
</style>
