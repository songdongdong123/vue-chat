<template>
  <div class="chatlist">
    <ul>
      <li v-for="list in getmsglist"></li>
    </ul>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  export default {
    data () {
      return {}
    },
    created () {
      this.getMsgList()
    },
    computed: {
      ...mapGetters([
        'getmsglist'
      ])
    },
    methods: {
      ...mapActions({
        getMsgList: 'getMsgList'
      })
    }
  }
</script>

<style lang="stylus" scoped>
  .chatlist
    position:fixed
    width:100%
    min-height:100vh
</style>

