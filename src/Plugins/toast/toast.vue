<template>
<transition name="fade">
  <div class="toastplugins" v-if="state">
    <div class="toastcontainer">
      <p>{{desc}}</p>
    </div>
  </div>
</transition>
</template>

<script>
  export default {
    data () {
      return {
        state: false,
        desc: '',
        duration: 1000
      }
    },
    created () {
      let timer = setTimeout(() => {
        this.state = false
        clearTimeout(timer)
      }, this.duration)
    }
  }
</script>

<style lang="stylus" scoped>
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
  .toastplugins
    position:fixed
    width:100%
    height:100%
    display:flex
    justify-content:center
    align-items:center
    z-index:9999
    transition:all .5s
    .toastcontainer
      background:rgba(0,0,0,.6)
      padding:20px
      max-width:300px
      border-radius:5px
      color:#fff
</style>

