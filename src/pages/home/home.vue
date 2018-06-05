<template>
  <div class="home">
    home
  </div>
</template>

<script>
import { getPoetryList } from 'api/home'
export default {
  data () {
    return {}
  },
  created () {
    this._getPoetryList()
  },
  methods: {
    _getPoetryList () {
      getPoetryList().then(res => {
        console.log(res)
      })
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
