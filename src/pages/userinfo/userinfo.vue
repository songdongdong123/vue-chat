<template>
  <div class="userinfo">
    <div class="title">
      <p>完善个人信息</p>
    </div>
    <p class="chooseyouimg">选择您的头像</p>
    <div class="chooseavater">
      <img :src="require(`../../assets/avater/${list}.jpg`)" alt="" v-for="list in imglist">
    </div>
    <div class="email">
      <input type="text" placeholder="填写邮箱，便于我们联系您">
    </div>
    <div class="userinfodesc">
      <textarea placeholder="描述一下你的爱好......"></textarea>
    </div>
    <div class="update">
      <p>确认提交</p>
    </div>
  </div>
</template>


<script>
  export default {
    data () {
      return {
        imglist: [1, 2, 3, 4, 5, 6, 8, 9, 10, 11, 12, 14]
      }
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
