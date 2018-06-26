<template>
  <div class="home">
    <Title></Title>
    <poetry
      :poetry-state="poetrystate"
      @hidepoetrycontainer="hidepoetrycontainer"
    ></poetry>
    <scroll
      :listenScroll="listenScroll"
      :data="getPoetryList"
      @pullDown="pullDowns"
      @scrollDown="scrollDowns"
      ref="content"
      class="poetrylist"
    >
      <div>
        <poetrylistcompent
          :datalist="getPoetryList"
        ></poetrylistcompent>
      </div>
    </scroll>
    <div class="send" @click="showpoetrycontainer">
      <span class="icon-fabiao"></span>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import Title from '@/components/title/title'
import scroll from '@/components/scroll/scroll'
import poetry from '@/components/poetry/poetry'
import poetrylistcompent from '@/components/poetrylist/poetrylist'
import { getCookie } from 'common/js/common'
export default {
  data () {
    return {
      content: '',
      listenScroll: true,
      animationstate: false,
      poetrystate: false,
      cookie: ''
    }
  },
  created () {
    this._getPoetryList()
    this.cookie = getCookie('user_id')
  },
  computed: {
    ...mapGetters([
      'getPoetryList'
    ])
  },
  methods: {
    pullDowns () {
      console.log('下拉刷新')
    },
    scrollDowns () {
      console.log('上拉加载')
    },
    showpoetrycontainer () {
      // 发表文章
      if (this.cookie) {
        this.poetrystate = !this.poetrystate
      } else {
        this.$router.push({path: '/login'})
      }
    },
    hidepoetrycontainer () {
      // 关闭发表输入弹窗
      this.poetrystate = false
    },
    _getPoetryList () {
      this.poetryList()
    },
    _zan () {
      this.animationstate = true
    },
    _setPoetryItem () {
      const item = {
        content: this.content,
        create_temp: new Date().getTime(),
        star: 0,
        recommend: 0
      }
      this.setPoetryItem({item})
    },
    ...mapActions([
      'poetryList',
      'setPoetryItem'
    ]),
    ...mapMutations({
      updatapoetrylist: 'SET_POETRY_LIST'
    })
  },
  components: {
    Title,
    scroll,
    poetry,
    poetrylistcompent
  }
}
</script>

<style lang="stylus" scoped>
  @keyframes zanAnimation{
    from {
      transform:scale(1);
    }
    to {
      transform:scale(1.5);
    }
  }
  .home
    min-height:100vh
    position:fixed
    width:100%
    padding-top:60px
    .poetrylist
      position:absolute
      width:100%
      height:75%
      color:#fff
      .poetryitem
        line-height:30px
        padding:0 20px
        box-sizing:border-box
        padding-bottom:10px
        .avater
          margin-right:15px
          display:flex
          align-items:center
          height:45px
          .logo
            width:40px
            height:40px
            img
              width:40px
              height:40px
              border-radius:100%
          .userinfo
            font-size:12px
            margin-left:15px
            .username
              font-size:15px
            .creattime
              color:#ccc
            p
              line-height:20px
        .poetrycontainer
          box-sizing:border-box
          font-size:15px
          margin-top:10px
          p
           line-height:18px
        .recomend
          display:flex
          margin-top:10px
        .recomend>p:not(:last-child)
          margin-right:30px
        .recomend>p
          display:flex
          align-items: center
          height:25px
          .icon
            font-size:25px
            margin-right:10px
          .icon-day
            color:$color-meta
          .icon-dianzan
            color:$color-progress
          .icon_animation
            animation:zanAnimation 2s
    .poetrylist>ul>li:not(:last-child)
      border-bottom:1px solid #999
      margin-bottom:20px
    .send
      position:fixed
      bottom:30px
      right:15px
      color:#fff
      width:50px
      height:50px
      background:rgba(27,154,244,0.8)
      text-align:center
      line-height:50px
      border-radius:100%
      font-size:22px
</style>
