<template>
  <div class="userinfo">
    <div class="title">
      <p>完善个人信息</p>
    </div>
    <p class="chooseyouimg">选择您的头像</p>
    <div class="chooseavater">
      <img 
        :src="require(`../../assets/avater/${list}.jpg`)" alt="" 
        :class="{'active': index === ind}"
        v-for="(list, index) in imglist" @click="chooseavater(list, index)">
    </div>
    <div class="email">
      <input type="text" placeholder="填写邮箱，便于我们联系您" v-model="email">
    </div>
    <div class="userinfodesc">
      <textarea placeholder="描述一下你的爱好......" v-model="userinfo"></textarea>
    </div>
    <div class="update" @click="updatauserinfo">
      <p>确认提交</p>
    </div>
  </div>
</template>


<script>
  import { mapActions } from 'vuex'
  export default {
    data () {
      return {
        imglist: [1, 2, 3, 4, 5, 6, 8, 9, 10, 11, 12, 14],
        userinfo: '',
        email: '',
        avatermgs: '',
        ind: null
      }
    },
    methods: {
      chooseavater (list, index) {
        this.avatermgs = list
        this.ind = index
      },
      updatauserinfo () {
        let userinfo = {
          email: this.email,
          avatar: this.avatermgs,
          user_info: this.userinfo
        }
        this._updataUserInfo({userinfo}).then(res => {
          if (res) {
            this.$router.push({path: '/usercenter'})
          }
        })
      },
      ...mapActions([
        '_updataUserInfo'
      ])
    }
  }
</script>

<style lang="stylus" scoped>
  .userinfo
    position:absolute
    min-height:100vh
    width:100%
    .title
      text-align:center
      margin-top:20px
      color:#fff
      font-size:25px
    .chooseyouimg
      margin:auto 20px
      color:#fff
      margin-top:20px
    .chooseavater
      box-sizing:border-box
      font-size:0
      margin:auto 20px
      display:flex
      justify-content:space-between
      flex-wrap:wrap 
      img
        width:50px
        height:50px
        border-radius:100%
        margin-right:30px
        margin-top:20px
        transition:all .5s
      .active
        // box-sizing:border-box
        border:2px solid #fff
    .chooseavater>img:nth-child(4n)
      margin-right:0
    .email
      padding:0 20px
      box-sizing:border-box
      input
        width:100%
        margin-top:30px
        height:45px
        border-radius:5px
        background:rgba(0,0,0,0)
        border:1px solid #ccc
        padding:10px
        color:#fff
    .userinfodesc
      padding:0 20px
      box-sizing:border-box
      textarea
        width:100%
        height:150px
        background:rgba(0,0,0,0)
        border-radius:5px
        margin-top:30px
        padding:10px
        color:#fff
        font-size:18px
        border:1px solid #ccc
    .update
      text-align:center
      color:#fff
      border:1px solid #fff
      margin:auto 20px
      margin-top:20px
      height:45px
      line-height:45px
      border-radius:5px
</style>
