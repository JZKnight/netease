<template>
  <div>
    <ul>
      <li v-for="(data,i) in list" :key="i">
        <div class="song-num" v-if="showNum">
          <span :class="i<3?'rednum':'othernum'">{{i | numberCode}}</span>
        </div>
        <div class="song-left">
          <p>
            {{data.name}}
            <span>{{data.alia[0]?"("+data.alia[0]+")":''}}</span>
          </p>
          <p>
            <i class="iconfont icon-SQ"></i>
            <span>{{data.ar | singers}}</span>
            <span>{{" - "}}</span>
            <span>{{data.al.name}}</span>
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
  mounted() {
    axios("/api/top/list?idx=1").then(res => {
      this.list = res.data.playlist.tracks.splice(0,20);
    });
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
      font-size: 0.35rem;
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
        width: 5.7rem;
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
         width: 5.7rem;
        font-size: 0.24rem;
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