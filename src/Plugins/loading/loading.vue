<template>
  <div class="loadingPlugins" v-if="state">
    <div class="loadingcontainer">
      <img width="30" height="30" src="../img/loading.gif" alt="">
      <p class="desc">loading</p>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        state: false
      }
    }
  }
</script>

<style lang="stylus">
  .loadingPlugins
    position:fixed
    z-index:2002
    height:100%
    width:100%
    background:rgba(255,255,255,.6)
    display:flex
    justify-content:center
    align-items:center
    top:0
    .loadingcontainer
      text-align:center
      p
        text-align:center
        font-size:0.3rem
        color:#333
</style>

