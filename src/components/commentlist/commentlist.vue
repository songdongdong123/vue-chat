<template>
  <div class="commentlist">
    <ul class="list">
      <li class="item" v-for="list in commentlist">
        <div class="avater">
          <img :src="require(`../../assets/avater/1.jpg`)" alt="">
        </div>
        <div class="itemmsg">
          <p class="name">
            <span>吃番茄会死的咸鱼</span>
            <!-- <span class="icon-dianzan"></span> -->
          </p>
          <p class="time">46分钟前</p>
          <p class="conent" v-for="item in list.guest_count.split('\n').map(v =>{
             return v
          })">
            {{item}}
          </p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    props: {
      commentlist: {
        type: Array,
        default: null
      }
    },
    data () {
      return {}
    }
  }
</script>

<style lang="stylus" scoped>
  .commentlist
    .list
      .item
        padding: 15px
        display:flex
        border-bottom:1px solid #666
        .avater
          width:40px
          img
            border-radius:100%
            width:40px
            height:40px
        .itemmsg
          margin-left:15px
          font-size:14px
          .name
            display:flex
            justify-content:space-between
            align-items:center
            font-size:13px
            .icon-dianzan
              font-size:20px
          .conent
            color:#ccc
            font-size:15px
            line-height:20px
          .time
            color:#999
        .itemmsg>p:not(:last-child)
          margin-bottom:5px
</style>

