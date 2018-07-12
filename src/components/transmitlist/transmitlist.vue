<template>
  <div class="transmitlist">
    <ul class="list">
      <li class="item" v-for="list in transmitlist">
        <div class="avater">
          <img :src="require(`../../assets/avater/${list.account.avatar}.jpg`)" alt="">
        </div>
        <div class="itemmsg">
          <p class="name">
            <span>{{list.account.user_name}}</span>
          </p>
          <p class="time">{{list.created_at|forMatDate}}</p>
          <div v-if="list.content">
            <p class="conent" v-for="item in list.content.split('\n').map(v =>{
              return v
            })">
              {{item}}
            </p>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    props: {
      transmitlist: {
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
  .transmitlist
    .list
      .item
        padding: 15px
        display:flex
        align-items: center;
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

