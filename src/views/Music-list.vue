<template>
  <div>
    <p class="title">
      <span>推荐歌单</span>
    </p>
    <div class="list-box">
      <div @click="routerplaylist(data.id)" class="list-top" v-for="data in songList" :key="data.id">
        <img :src="data.picUrl" alt />
        <span>
          <i class="iconfont icon-1"></i>
          {{data.playCount | playnum}}
        </span>
        <p>{{data.name}}</p>
      </div>
    </div>
    <p class="title">
      <span>最新音乐</span>
    </p>
    <new-list></new-list>
    <div class="bottom">
      <img class="bottom-img" src="\image\recommand_bg_3x.png" alt />
      <div>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-wangyimusic" />
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
// import http from "@/utils/http";
import axios from "axios";
import newList from "@/components/NewList";
import {mapMutations} from 'vuex'
export default {
  components: {
    newList
  },
  data() {
    return {
      songList: []
    };
  },
  methods:{
    ...mapMutations(["show","hide"]),
    routerplaylist(id){
      this.$router.push(`/playlist?playlistid=${id}`)
    }
  },
  mounted() {
    // this.show();
    axios("api/personalized", { xhrFields: { withCredentials: true } }).then(
      res => {
        this.songList = res.data.result.splice(0, 9);
      }
    );
  }
};
</script>

<style lang="scss" scoped>
.title {
  span {
    font-size: 0.34rem;
    border-left: 3px solid #d43c33;
    padding-left: 0.2rem;
    height: 0.32rem;
  }
  line-height: 1rem;
}
.list-box {
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  .list-top {
    position: relative;
    width: 32%;
    height: 3.3rem;
    margin-bottom: 0.05rem;
    span {
      position: absolute;
      top: 0.04rem;
      right: 0.04rem;
      font-size: 0.26rem;
      color: #fff;
      i {
        font-size: 0.25rem;
      }
    }
    img {
      // max-height: 2rem;
      width: 100%;
    }
    p {
      font-size: 0.26rem;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
    }
  }
}
.bottom {
  position: relative;
  .bottom-img {
    width: 100%;
  }
  div {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    svg {
      font-size: 4.5rem;
    }
  }
}
</style>