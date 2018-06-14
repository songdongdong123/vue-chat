<template>
  <div ref="wrapper" class="wrapper">
    <slot></slot>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  export default {
    props: {
      probeType: {
        type: Number,
        default: 1
      },
      listenScrollEnd: {
        type: Boolean,
        default: true
      },
      click: {
        type: Boolean,
        default: true
      },
      listenScroll: {
        type: Boolean,
        default: true
      },
      data: {
        type: Array,
        default: null
      },
      dataobj: {
        type: Object,
        default: null
      },
      list: {
        type: Array,
        default: null
      },
      pullDown: {
        type: Boolean,
        default: true
      },
      pullUp: {
        type: Boolean,
        default: true
      }
    },
    mounted () {
      setTimeout(() => {
        this._initScroll()
      }, 20)
    },
    methods: {
      _initScroll () {
        if (!this.$refs.wrapper) {
          return
        }
        this.scroll = new BScroll(this.$refs.wrapper, {
          probeType: 3,
          click: true
        })

        if (this.listenScroll) {
          let me = this
          this.scroll.on('scroll', (pos) => {
            me.$emit('scroll', pos)
          })
        }
        if (this.pullDown) {
          this.scroll.on('scrollEnd', (pos) => {
            if (this.scroll.y <= (this.scroll.maxScrollY + 50)) {
              this.$emit('scrollDown')
            }
          })
        }
        if (this.listenScrollEnd) {
          this.scroll.on('scrollEnd', (pos) => {
            this.$emit('scrollEnd', this.scroll.y)
          })
        }
        if (this.pullUp) {
          this.scroll.on('touchEnd', (pos) => {
            if (pos.y > 50) {
              this.$emit('pullDown')
            }
          })
        }
      },
      disable () {
        this.scroll && this.scroll.disable()
      },
      finishPullUp () {
        // d
      },
      enable () {
        this.scroll && this.scroll.enable()
      },
      refresh () {
        // console.log(this.scroll)
        this.scroll && this.scroll.refresh()
      },
      scrollTo () {
        this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
      },
      scrollToElement () {
        this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
      }
    },
    watch: {
      data () {
        setTimeout(() => {
          this.refresh()
        }, this.refreshDelay)
      },
      listenScroll () {
        setTimeout(() => {
          this.refresh()
        }, this.refreshDelay)
      },
      dataobj () {
        setTimeout(() => {
          this.refresh()
        }, this.refreshDelay)
      },
      list () {
        setTimeout(() => {
          this.refresh()
        }, this.refreshDelay)
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
</style>
