<template>
  <div class="login">
    <div class="login_container">
      <div class="logo">
        <img src="./logo.jpg" alt="">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  methods: {}
}
</script>

<style lang="stylus" scoped>
  .login
    position:fixed
    width:100%
    height:100%
    display:flex
    justify-content:center
    align-items:center
    .login_container
      .logo
        width:100px
        height:100px
        overflow:hidden
        img
          width:100%
          height:100%
</style>
