<template>
  <div class="attentionlist">
    <ul class="attention_list">
      <li class="attention_item" v-for="list in attentionlist" @click="toChat(list)">
        <div class="left">
          <img :src="require(`../../assets/avater/${list.account.avatar||1}.jpg`)" alt="">
          <div class="usermsgs">
            <p>{{list.account.user_name}}</p>
            <p class="info">{{list.account.user_info}}</p>
          </div>
        </div>
        <div class="right"></div>
      </li>
    </ul>
  </div>
</template>


<script>
  export default {
    props: {
      attentionlist: {
        type: Array,
        default: null
      },
      userid: {
        type: String,
        default: ''
      }
    },
    data () {
      return {}
    },
    methods: {
      toChat (list) {
        // console.log(this.userid)
        this.$router.push({path: 'chat', query: {form: this.userid, to: list.account.user_id, username: list.account.user_name}})
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .attentionlist
    margin-top:20px
    .attention_list
      .attention_item
        display:flex
        padding:10px 15px
        border-top:1px solid #999
        .left
          display:flex
          align-items:center
          color:#fff
          img
            width:50px
            height:50px
            border-radius:100%
          .usermsgs
            font-size:13px
            margin-left:15px
            .info
              width:200px
              margin-top:10px
              font-size:12px
              line-height:15px
              display: -webkit-box
              -webkit-box-orient: vertical
              -webkit-line-clamp: 2
              overflow: hidden;
    .attention_list>li:last-child
      border-bottom:1px solid #999

</style>
