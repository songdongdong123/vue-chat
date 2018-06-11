<template>
  <div id="app">
    <particle></particle>
    <router-view/>
  </div>
</template>

<script>
import particle from '@/components/particle/particle'
export default {
  name: 'App',
  components: {
    particle
  }
}
</script>

<style>

</style>
