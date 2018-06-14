<template>
  <div class="poetrydetail">
    <div class="title">
      <div class="titlecontainer">
        <p class="icon iconleft"><span class="icon-fanhui"></span></p>
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
              <span>10:57</span>
            </p>
          </div>
        </div>
        <div class="ethancard" v-if="poetrydetail.content">
          <p v-for="list in poetrydetail.content.split('\n').map(v => {
              return v
            })">{{list}}</p>
          <div class="lite">
            <p>转发<span>100</span></p>
            <p>评论{{2000}}</p>
            <p>赞{{22.2}}</p>
          </div>
        </div>
      </div>
    </scroll>
    <div class="send">
      <div class="textarea">
        <textarea></textarea>
      </div>
    </div>
  </div>
</template>

<script>
  import scroll from '@/components/scroll/scroll'
  import { mapActions } from 'vuex'
  export default {
    data () {
      return {
        listenScroll: true,
        poetrydetail: {},
        userinfo: {},
        user_id: '',
        poetrylist_id: ''
      }
    },
    components: {
      scroll
    },
    created () {
      [this.user_id, this.poetrylist_id] = [this.$route.query.user_id, this.$route.query.poetrylist_id]
      this._getppoetrydetail()
    },
    methods: {
      _getppoetrydetail () {
        let id = {
          user_id: this.user_id,
          poetrylist_id: this.poetrylist_id
        }
        this._getPoetryDetail({id}).then(res => {
          if (res.status === 200 && res.data.code === 0) {
            this.poetrydetail = res.data.data.poetrydetail
            this.userinfo = res.data.data.userinfo
          }
        })
      },
      ...mapActions([
        '_getPoetryDetail'
      ])
    }
  }
</script>

<style lang="stylus" scoped>
  .poetrydetail
    position:absolute
    min-height:100vh
    width:100%
    .title
      height:45px
      width:100%
      position:fixed
      background:rgba(51,28,170,.6)
      border-bottom:1px dashed #999
      top:0
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
      height:10rem
      // margin:auto 15px
      margin-top:65px
      color:#fff
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
          border-bottom:1px dashed #999
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
        .send
          position:fixed
          bottom:0
</style>

