<template>
  <div class="title">
    <div class="titlecontainer">
      <p>e-bo</p>
      <p class="icon" @click="toUserCenter"><span class="icon-gerenzhongxin"></span></p>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  methods: {
    toUserCenter () {
      this.$router.push({path: '/usercenter'})
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import'../../common/stylus/colorreset.styl'
  .title
    position:fixed
    width:100%
    height:50px
    background:#331Caa
    color:#fff
    line-height:50px
    text-align:center
    top:0
    left:0
    z-index: 1000
    border-bottom:1px solid #ccc
    .titlecontainer
      position: relative
      .icon
        position:absolute
        top:0
        right:0
        width:50px
        font-size 24px
        color:#fff
</style>
