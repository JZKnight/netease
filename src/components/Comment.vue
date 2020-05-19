<template>
  <div>
    <slot></slot>
    <div class="box">
      <ul>
        <li v-for="(data,i) in list" :key="i">
          <div class="title">
            <img :src="data.user.avatarUrl+'?param=30y30'" alt />
            <span class="nickname">{{data.user.nickname}}</span>
            <span>
              {{data.likedCount}}
              <i class="iconfont icon-dianz"></i>
            </span>
          </div>
          <div class="content">
            <span>{{data.content}}</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      list: []
    };
  },
  props: ["songid"],
  mounted() {
    axios(`/api/comment/music?id=${this.songid}&limit=30`).then(res => {
      console.log("歌曲评论");
      this.list = res.data.hotComments;
      this.$emit('listencommentlist',res.data.hotComments)
      console.log(this.list);
    });
  }
};
</script>
<style lang="scss" scoped>
.box {
  color: #fff;
  li {
    width: 100%;
    padding-top: 0.2rem;
    .title {
      padding: 0 0.2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      img {
        border-radius: 50%;
      }
      .nickname {
        margin-left: 0.2rem;
        flex: 1;
        font-size: 0.28rem;
        text-align: left;
        color: #ddd;
      }
      span:last-child {
        color: #bbb;
        font-size: 0.24rem;
        i {
          margin-left: 0.1rem;
          font-size: 0.28rem;
        }
      }
    }
    .content {
        margin-left: 1rem;
      padding: 0.2rem 0.2rem 0.2rem 0;
      font-size: 0.3rem;
      border-bottom:.02rem solid rgba(0, 0, 0, 0.1);
    }
  }
}
</style>