<template>
  <div>
    <ul >
      <li @click="toSong(data.id,data.album.id,data.name)"
       v-for="(data,i) in list" :key="i">
        <div class="song-num" v-if="showNum">
          <img :src="data.album.blurPicUrl+'?param=40y40'" alt="">
        </div>
        <div class="song-left">
          <p>
            {{data.name}}
          </p>
          <p>
            <span>{{data.artists | singers}}</span>
            <span>{{" - "}}</span>
            <span :class="data.album.id">{{data.album.name}}</span>
          </p>
        </div>
        <div class="song-right">
          <i class="iconfont icon-shouyebofangffffff"></i>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      list: [],
      showNum: true
    };
  },
  props:{
      songid:String
  },
  mounted() {
    // axios("/api/personalized/newsong").then(res => {
    //   this.list = res.data.result;
    // });
        axios(`/api/simi/song?id=${this.songid}`).then(res => {
      console.log("相似歌曲");
      console.log(res.data);
      this.list = res.data.songs;
      this.$emit('listenplaylist',res.data.songs)
    });
  },
  methods:{
    toSong(songid,albumid,songname){
      this.$router.push(`/song?songid=${songid}&albumid=${albumid}&songname=${songname}`)
    }
  },
};
</script>
<style lang="scss" scoped>
ul {
  padding-left: 0.2rem;
  li {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.1rem 0;
    border: 0 solid rgba(0,0,0,.1);
    .song-num {
      font-size: 0.4rem;
      margin-right: 0.2rem;
      .rednum {
        color: #d43c33;
      }
      .othernum {
        color: #666;
      }
    }
    .song-left {
      flex: 1;
      width:4rem;
      p:nth-child(1) {
        line-height: 0.5rem;
        // font-size: 0.34rem;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        color: #fff;
        span {
          color: #888;
        }
      }
      p:nth-child(2) {
        font-size: 0.28rem;
        color: #ccc;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      i {
        font-size: 0.3rem;
        color: orangered;
        margin-right: 0.1rem;
      }
    }
    .song-right {
      margin-right: 0.3rem;
      padding-left: 0.2rem;
      i {
        font-size: 0.5rem;
        color: #bbb;
      }
    }
  }
}
</style>