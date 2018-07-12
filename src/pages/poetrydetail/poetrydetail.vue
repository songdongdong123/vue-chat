<template>
<transition name="slide">
  <div class="poetrydetail">
    <div class="title">
      <div class="titlecontainer">
        <p class="icon iconleft" @click="backHome"><span class="icon-fanhui"></span></p>
        <p>文章详情</p>
        <p class="icon iconright"><span class="icon-more_light"></span></p>
      </div>
    </div>
    <scroll
      :listenScroll="listenScroll"
      :dataobj="userinfo"
      class="container"
    >
      <div class="scrollcontainer">
        <div class="userinfo">
          <div>
              <img 
              v-if="userinfo.avatar"
              :src="require(`../../assets/avater/${userinfo.avatar}.jpg`)" 
              alt="">
            <p class="info">
              <span>{{userinfo.user_name}}</span>
              <span>{{poetrydetail.create_temp|forMatDate}}</span>
            </p>
          </div>
        </div>
        <div class="ethancard" v-if="poetrydetail.content">
          <p v-for="list in poetrydetail.content.split('\n').map(v => {
              return v
            })">{{list}}</p>
          <div class="lite">
            <p :class="{'comment': transmitliststate}" @click="getTransmitList">转发<span>{{poetrydetail.star}}</span></p>
            <p :class="{'comment': commentliststate}" @click="showComment">评论{{getcommentlists.length}}</p>
            <p :class="{'comment': linkliststate}" @click="showlinklistcomment">赞{{poetrydetail.recommend}}</p>
          </div>
        </div>
        <commentlist
          v-if="commentliststate"
          :commentlist="getcommentlists"
        ></commentlist>
        <transmitlist
          v-if="transmitliststate"
          :transmitlist="transmitlist"
        ></transmitlist>
        <transmitlist
          v-if="linkliststate"
          :transmitlist="likeList"
        ></transmitlist>
      </div>
    </scroll>
    <div class="send">
      <div class="textareacontainer">
        <span @click="showcomment_fn">发表评论</span>
        <p class="left">
          <span class="icon-zhuanfa"></span>
          <span class="icon-dianzan"></span>
        </p>
      </div>
    </div>
    <comment
      :showstate="showcomment"
      :guestnum="getcommentlists.length"
      @hidecomment="hidecomment"
    ></comment>
  </div>
</transition>
</template>

<script>
  import scroll from '@/components/scroll/scroll'
  import comment from '@/components/comment/comment'
  import commentlist from '@/components/commentlist/commentlist'
  import transmitlist from '@/components/transmitlist/transmitlist'
  import { mapActions, mapGetters } from 'vuex'
  export default {
    data () {
      return {
        listenScroll: true,
        poetrydetail: {},
        userinfo: {},
        user_id: '',
        poetrylist_id: '',
        showcomment: false,
        commentliststate: true,
        transmitliststate: false,
        linkliststate: false,
        commentlist: [],
        transmitlist: [],
        likeList: []
      }
    },
    components: {
      scroll,
      comment,
      commentlist,
      transmitlist
    },
    computed: {
      ...mapGetters([
        'getcommentlists'
      ])
    },
    created () {
      [this.user_id, this.poetrylist_id] = [this.$route.query.user_id, this.$route.query.poetrylist_id]
      this._getppoetrydetail()
      this.getAllComments()
    },
    methods: {
      backHome () {
        this.$router.back()
      },
      showcomment_fn () {
        this.showcomment = true
      },
      hidecomment () {
        this.showcomment = false
      },
      getTransmitList () {
        // 获取转发列表
        this._getTransmitList(this.poetrylist_id).then(res => {
          [this.commentliststate, this.transmitliststate, this.linkliststate] = [false, true, false]
          this.transmitlist = res.data
        })
      },
      showlinklistcomment () {
        // 获取点赞列表
        // 切换到点赞列表
        this._getSupportList(this.poetrylist_id).then(res => {
          [this.commentliststate, this.transmitliststate, this.linkliststate] = [false, false, true]
          this.likeList = res.data
          console.log(res)
        })
      },
      showComment () {
        // 切换到评论列表
        [this.commentliststate, this.transmitliststate, this.linkliststate] = [true, false, false]
      },
      _getppoetrydetail () {
        // 获取文章详情
        let id = {
          user_id: this.user_id,
          poetrylist_id: this.poetrylist_id
        }
        this._getPoetryDetail({id}).then(res => {
          if (res.status === 200 && res.data.code === 0) {
            this.poetrydetail = res.data.data.ret
            this.userinfo = res.data.data.doc
          }
        })
      },
      getAllComments () {
        // 获取评论列表
        let id = {
          poetrylist_id: this.poetrylist_id
        }
        this._getAllComments({id}).then(res => {
          if (res.status === 200 && res.data.code === 0) {
            this.commentlist = res.data.data
          }
        })
      },
      ...mapActions([
        '_getPoetryDetail',
        '_getAllComments',
        '_getTransmitList',
        '_getSupportList'
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
    background:#331Caa
  .poetrydetail
    position:absolute
    min-height:100vh
    width:100%
    z-index:500
    .title
      height:45px
      width:100%
      position:fixed
      background:rgba(51,28,170,1)
      border-bottom:1px solid #999
      top:0
      z-index:100
      .titlecontainer
        position: relative
        p
          text-align:center
          line-height:45px
          color:#fff
        span
          color:#fff
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
          right:0
    .container
      height:500px
      // margin:auto 15px
      margin-top:65px
      color:#fff
      font-size:15px
      .scrollcontainer
        .userinfo
          padding:0 15px
          div
            display:flex
            align-items:center
            img
              width:45px
              height:45px
              border-radius:100%
            .info
              margin-left:10px
              span
                display:block
                font-size:12px
            .info>span:nth-child(1)
              font-size:15px
            .info>span:nth-child(2)
                margin-top:12px
                color:#ccc
        .ethancard
          padding:15px
          border-bottom:1px solid #999
          padding-bottom:0
          p
            margin-top:10px
          .lite
            display:flex
            p
              margin-right:30px
              color: #999
              height:40px
              line-height:40px
            .comment
              color:#fff
    .send
      position:fixed
      bottom:0
      z-index:1000
      box-sizing:border-box
      width:100%
      height:50px
      background:rgba(51,28,170,1)
      .textareacontainer
        height:50px
        border-top:1px dashed #ccc
        display:flex
        justify-content:space-between
        span
          width:300px
          text-align:left
          line-height:50px
          color:#bbb
          padding-left:10px
        .left
          width:100px
          font-size:20px
          display:flex
          justify-content:space-between
          span
            color:#fff
</style>

