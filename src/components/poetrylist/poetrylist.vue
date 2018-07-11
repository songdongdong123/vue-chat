<template>
  <div class="container">
    <ul class="list" >
      <li class="item" v-for="(list, index) in datalist" @click="toPoetryDetail(list)">
        <div class="avater">
          <div class="logo">
            <img :src="require(`../../assets/avater/${list.account.avatar}.jpg`)" alt="">
          </div>
          <div class="userinfo">
            <p class="username">{{list.account.user_name}}</p>
            <p class="creattime">{{list.create_temp|forMatDate(list.create_temp)}}</p>
          </div>
          <div class="keep_attention">
            <span>+ 关注</span>
          </div>
        </div>
        <div class="poetrycontainer">
          <div>
            <p v-for="(item, ind) in list.content.split('\n').map(v => {
            return v
            })" :key="ind">{{item}}</p>
          </div>
          <div class="transmit" v-if="list.transmit_content">
            <span class="aite">@{{list.transmit_user_name}}</span>
            <p v-for="(item, ind) in list.transmit_content.split('\n').map(v => {
            return v
            })" :key="ind">{{item}}</p>
          </div>
          <div class="recomend">
            <p @click.stop="transmit(list)">
              <span class="icon icon-zhuanfa">
              </span>{{list.star}}
            </p>
            <p>
              <span class="icon icon-feedback"></span>
              <span>{{list.guest_num}}</span>
            </p>
            <p @click.stop="_linkPoetry(list, index)">
              <span class="icon icon-dianzan" :class="{'icon_active': list.isAttention}"></span>
            {{list.recommend}}</p>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  import { linkThisPoetry } from 'api/home'
  import { getCookie } from 'common/js/common'
  export default {
    props: {
      datalist: {
        type: Array,
        default: null
      }
    },
    created () {
      this.cookie = getCookie('user_id')
    },
    methods: {
      transmit (list) {
        // 转发
        this.$router.push({path: '/publish', query: {poetrylist_id: list.poetrylist_id}})
      },
      toPoetryDetail (list) {
        // 文章详情
        this.$router.push({path: '/poetrydetail', query: {poetrylist_id: list.poetrylist_id, user_id: list.user_id}})
      },
      _linkPoetry (list, index) {
        // 点赞
        if (this.cookie) {
          if (!list.isAttention) {
            linkThisPoetry({
              poetrylist_id: list.poetrylist_id,
              recommend: list.recommend + 1
            }).then(res => {
              list.isAttention = true
              list.recommend += 1
              if (res.data.code === 1) {
                this.$toast({
                  state: true,
                  desc: res.data.msg,
                  duration: 2000
                })
              }
            })
          } else {
            linkThisPoetry({
              poetrylist_id: list.poetrylist_id,
              recommend: list.recommend - 1
            }).then(res => {
              if (res.data.code === 1) {
                this.$toast({
                  state: true,
                  desc: res.data.msg,
                  duration: 2000
                })
              }
            })
          }
        } else {
          this.$toast({
            state: true,
            desc: '登录之后才能点赞哦~~',
            duration: 1000
          })
          this.$router.push({path: '/login'})
        }
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .container
    .list
      color:#fff
      margin-top:15px
      .item
        line-height:30px
        padding:0 20px
        box-sizing:border-box
        padding-bottom:10px
        .avater
          margin-right:15px
          display:flex
          align-items:center
          height:45px
          position: relative
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
          .keep_attention
            position:absolute
            right:0
            font-size:13px
            color:#ccc
            border:1px solid #999
            width:70px
            text-align:center
            border-radius:3px
            // height:30px
        .poetrycontainer
          box-sizing:border-box
          font-size:15px
          margin-top:10px
          p
           line-height:18px
           font-size:13px
           color:#fff
          .transmit
            p
              font-size:12px
              color:#ccc
            .aite
              color:rgba(27,154,244,0.8)
        .recomend
          display:flex
          margin-top:10px
        .recomend>p:not(:last-child)
          margin-right:30px
        .recomend>p
          display:flex
          color:#fff
          align-items: center
          height:25px
          .icon
            font-size:25px
            margin-right:10px
          .icon_active
            color:yellow
    .list>li:not(:last-child)
      border-bottom:1px solid #999
      margin-bottom:15px
</style>

