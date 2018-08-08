<template>
  <div id="app">
    <particle></particle>
    <router-view/>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import particle from '@/components/particle/particle'
  export default {
    name: 'App',
    created () {
      this.recvMsg()
    },
    methods: {
      ...mapActions({
        recvMsg: 'recvMsg'
      })
    },
    components: {
      particle
    }
  }
</script>

<style>

</style>
