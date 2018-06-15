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
      <ul>
        <li class="poetryitem" v-for="(list, index) in getPoetryList" :key="index" @click="toPoetryDetail(list)">
          <div class="poetrycontainer">
            <div v-for="(item, ind) in list.content.split('\n').map(v => {
              return v
            })" :key="ind">{{item}}</div>
          </div>
            <div class="recomend">
              <p>
                <span class="icon icon-day">
                </span>{{list.star}}
              </p>
              <p @click.stop="_linkPoetry(list, index)">
                <span class="icon icon-dianzan" :class="{'icon_animation': animationstate}"></span>
                {{list.recommend}}</p>
            </div>
        </li>
      </ul>
    </scroll>
    <div class="bottom" @click="showpoetrycontainer">
      <p>发表此时此刻~~</p>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import Title from '@/components/title/title'
import scroll from '@/components/scroll/scroll'
import poetry from '@/components/poetry/poetry'
import particle from '@/components/particle/particle'
import { linkPoetry } from 'api/home'
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
      // 显示发表输入框
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
    toPoetryDetail (list) {
      // 文章详情
      this.$router.push({path: '/poetrydetail', query: {poetrylist_id: list.poetrylist_id, user_id: list.user_id}})
    },
    _linkPoetry (list, index) {
      // 点赞
      if (this.cookie) {
        linkPoetry({
          num: Number(Number(list.recommend) + 1),
          id: Number(list.id)
        }).then(res => {
          let getPoetryList = JSON.parse(JSON.stringify(this.getPoetryList))
          getPoetryList[index].recommend = res.data.data
          this.updatapoetrylist(getPoetryList)
        })
      } else {
        this.$toast({
          state: true,
          desc: '登录之后才能点赞哦~~',
          duration: 1000
        })
        this.$router.push({path: '/login'})
      }
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
    particle
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
    color:#fff
    // background:$color-bgcolor
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
        line-height:30px
        .poetrycontainer
          border:1px dashed #fff
          padding:10px
          margin:auto 20px
          border-radius:10px
        .recomend
          display:flex
          justify-content:center
          margin-top:10px
        .recomend>p:nth-child(1)
          margin-right:50px
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
      background:#331Caa
      width:100%
      color:#fff
      line-height:50px
      text-align:center
      border-top:1px dashed #999
</style>
