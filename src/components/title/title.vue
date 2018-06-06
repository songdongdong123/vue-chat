<template>
  <div class="title">
    <p>骚话，满天飞~~</p>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  }
}
</script>

<style lang="stylus" scoped>
  @import'../../common/stylus/colorreset.styl'
  .title
    position:fixed
    width:100%
    height:50px
    background:$color-meta
    color:#fff
    line-height:50px
    text-align:center
    top:0
    left:0
    z-index: 1000
</style>
