<template>
  <div>
    <ul >
      <li @click="toSong(data.id,data.song.album.id,data.song.name)"
       v-for="(data,i) in list" :key="i">
        <div class="song-num" v-if="showNum">
          <span :class="i<3?'rednum':'othernum'">{{i | numberCode}}</span>
        </div>
        <div class="song-left">
          <p>
            {{data.song.name}}
            <span>{{data.song.alias[0]?"("+data.song.alias[0]+")":''}}</span>
          </p>
          <p>
            <i class="iconfont icon-SQ"></i>
            <span>{{data.song.artists | singers}}</span>
            <span>{{" - "}}</span>
            <span :class="data.song.album.id">{{data.song.album.name}}</span>
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
      showNum: false
    };
  },
  mounted() {
    axios("/api/personalized/newsong").then(res => {
      this.list = res.data.result;
    });
  },
  methods:{
    toSong(songid,albumid,songname){
      this.$router.push(`/song?songid=${songid}&albumid=${albumid}&songname=${songname}`)
    }
  }
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
    border-bottom: 1px solid #ddd;
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
      width:100%;
      p:nth-child(1) {
        width: 6.3rem;
        line-height: 0.5rem;
        font-size: 0.34rem;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        span {
          color: #888;
        }
      }
      p:nth-child(2) {
         width: 6.3rem;
        font-size: 0.26rem;
        color: #888;
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
      margin-right: 0.2rem;
      padding-left: 0.2rem;
      i {
        font-size: 0.5rem;
        color: #bbb;
      }
    }
  }
}
</style>