<template>
  <div class="home">
    <Title></Title>
    <scroll
      :listenScroll="listenScroll"
      :data="getPoetryList"
      ref="content"
      class="poetrylist"
    >
      <ul>
        <li class="poetryitem" v-for="(list, index) in getPoetryList" :key="index">
          <div v-for="(item, ind) in list.content.split('\n').map(v => {
              return v
            })" :key="ind">{{item}}</div>
            <div class="recomend">
              <p><span class="icon icon-day"></span>{{list.star}}</p>
              <p @click="_zan"><span class="icon icon-dianzan" :class="{'icon_animation': animationstate}"></span>{{list.recommend}}</p>
            </div>
        </li>
      </ul>
    </scroll>
    <div class="bottom">
      <p>发表你的骚话吧~~</p>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Title from '@/components/title/title'
import scroll from '@/components/scroll/scroll'
export default {
  data () {
    return {
      content: '',
      listenScroll: true,
      animationstate: false
    }
  },
  created () {
    this._getPoetryList()
  },
  computed: {
    ...mapGetters([
      'getPoetryList'
    ])
  },
  methods: {
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
    ])
  },
  components: {
    Title,
    scroll
  }
}
</script>

<style lang="stylus">
  @keyframes zanAnimation{
    from {
      transform:scale(1);
    }
    to {
      transform:scale(1.5);
    }
  }
  .home
    color:$color-general-font
    background:$color-bgcolor
    min-height:100vh
    position:fixed
    width:100%
    padding-top:60px
    .poetrylist
      position:absolute
      width:100%
      height:75%
      .poetryitem
        text-align:center
        line-height:20px
        .recomend
          display:flex
          justify-content:center
        .recomend>p:nth-child(1)
          margin-right:20px
        .recomend>p
          .icon
            font-size:25px
          .icon-day
            color:$color-meta
          .icon-dianzan
            color:$color-progress
          .icon_animation
            animation:zanAnimation 2s
    .poetrylist>ul>li:not(:last-child)
      margin-bottom:20px
    .bottom
      position:fixed
      bottom:0
      height:50px
      background:$color-meta
      width:100%
      color:#fff
      line-height:50px
      text-align:center
</style>
