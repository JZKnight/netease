<template>
  <div>
    <div class="bg" :style="`background:url(`+bgurl+`) no-repeat center`"></div>
    <div @click.stop="playaudio()" class="content">
      <div class="logoimg"></div>
      <div class="bgcenter"></div>
      <div class="cd">
        <img
          class="outcd a-circling"
          :style="isShowKey?'animation-play-state:paused':'animation-play-state:running'"
          src="/image/disc.png"
          alt
        />
        <!-- :style="`animation-play-state:`+isShowKey? `paused`:`runing`" -->
        <img
          class="incd a-circling"
          :style="isShowKey?'animation-play-state:paused':'animation-play-state:running'"
          :src="bgurl?bgurl+`?param=360y360`:`/image/disc_default.png`"
          alt
        />
        <img v-show="isShowKey" class="playcd" src="/image/play.png" alt />
      </div>
      <div class="lrc">
        <p>{{$route.query.songname}}</p>
        <div></div>
      </div>
      <audio id="myaudio" :src="songurl" autoplay>controls</audio>
      <div class="more">
        <i class="arr"></i>
      </div>
      <div class="more-content">
        <p v-show="simiList.length" class="title">
          <span>包含这首歌的歌单</span>
        </p>
        <div class="list-box">
          <div class="list-top" v-for="data in simiList" :key="data.id">
            <img :src="data.coverImgUrl" alt />
            <span>
              <i class="iconfont icon-1"></i>
              {{data.playCount | playnum}}
            </span>
            <p>{{data.name}}</p>
            <p>{{"by "+data.creator.nickname}}</p>
          </div>
        </div>
        <p v-show="simisonglist.length" class="title">
          <span>喜欢这首歌的人也听</span>
        </p>
        <simi-list @listenplaylist="fn" :songid="$route.query.songid"></simi-list>
        <comment @listencommentlist="commentfn" :songid="$route.query.songid">
          <p v-show="commentlist.length" class="title">
            <span>精彩评论</span>
          </p>
        </comment>
      </div>
      <div class="simi-playlist"></div>
      <div class="simi-song"></div>
    </div>
  </div>
</template>
<script>
import simiList from "@/components/SimiList";
import comment from '@/components/Comment'
import { mapMutations } from "vuex";
import axios from "axios";
export default {
  components: {
    simiList,
    comment
  },
  data() {
    return {
      // album: "",
      // song: {},
      bgurl: "",
      songurl: "",
      isShowKey: false,
      simiList: [],
      simisonglist: [],
      commentlist:[]
    };
  },
  // computed:{
  //   isShowKey(){
  //      if(myaudio.ended){
  //        console.log('sadasdas...........')
  //     return true;
  //   }
  //   }
  // },
  methods: {
    ...mapMutations(["show", "hide"]),
    playaudio() {
      var myaudio = document.getElementById("myaudio");
      if (myaudio.paused) {
        myaudio.play();
        this.isShowKey = false;
      } else {
        myaudio.pause();
        this.isShowKey = true;
      }
    },
    fn(val) {
      this.simisonglist = val;
    },
    commentfn(val){
      this.commentlist = val;
    }
  },
  mounted() {
    this.hide();
    axios(`/api/song/detail?ids=${this.$route.query.songid}`).then(res => {
      console.log("歌曲详情");
      console.log(res.data.songs[0]);
      this.bgurl = res.data.songs[0].al.picUrl;
    });
    // axios(`/api/lyric?id=${this.$route.query.songid}`).then(res => {
    //   console.log("歌词");
    //   console.log(res.data);
    // });
    axios(`/api/song/url?id=${this.$route.query.songid}`).then(res => {
      console.log("歌曲url");
      console.log(res.data);
      this.songurl = res.data.data[0].url;
    });
    axios(`/api/simi/playlist?id=${this.$route.query.songid}`).then(res => {
      console.log("相似歌单");
      console.log(res.data);
      this.simiList = res.data.playlists;
    });
    var myaudio = document.getElementById("myaudio");
    myaudio.addEventListener("ended", function() {
      this.isShowKey = true;
      console.log(this.isShowKey);
    });
  },
  destroyed() {
    this.show();
  }
};
</script>
<style lang="scss" scoped>
// #myaudio{
//   margin: 20px;
//   text-align: center;
// }
.a-circling {
  animation: circling 20s linear infinite;
  @keyframes circling {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(1turn);
    }
  }
}
.content {
  width: 100%;
  z-index: 1;
  background: rgba(0, 0, 0, 0.4);
  overflow: hidden;
  .logoimg {
    position: absolute;
    top: 0.2rem;
    left: 0.2rem;
    width: 2rem;
    height: 0.5rem;
    background: url("/image/topbar.png") no-repeat -0rem -0.2rem;
    background-size: 2.9rem;
    // border: 1px solid #000;
  }
  .bgcenter {
    position: absolute;
    width: 1.96rem;
    height: 2.74rem;
    top: 0;
    left: 50%;
    transform: translateX(-0.3rem);
    background: url("/image/needle-ip6.png") no-repeat top left;
    background-size: 1.9rem;
    z-index: 10;
    // border: 1px solid #000;
  }
  .cd {
    position: relative;
    height: 100%;
    top: 0;
    bottom: 1rem;
    width: 100%;
    .outcd {
      display: block;
      width: 80%;
      margin: 0 auto;
      position: absolute;
      top: 1.36rem;
      left: 0;
      right: 0;
      z-index: 2;
    }

    .incd {
      display: block;
      width: 49%;
      margin: 0 auto;
      position: absolute;
      top: 2.5rem;
      left: 0;
      right: 0;
      border-radius: 50%;
    }
    .playcd {
      width: 1.2rem;
      margin: 0 auto;
      position: absolute;
      top: 3.8rem;
      left: 50%;
      transform: translateX(-50%);
    }
  }
  .lrc {
    position: relative;
    margin-top: 9rem;
    height: 3.5rem;
    width: 100%;
    // background: #f00;
    text-align: center;
    color: #fff;
    & > p {
      font-size: 120%;
    }
  }
  .more {
    height: 0.8rem;
    width: 100%;
    // background: #f00;
    padding-top: 0.26rem;
    .arr {
      margin: 0 auto;
      display: block;
      width: 17px;
      height: 12px;
      background-repeat: no-repeat;
      background-size: 17px auto;
      background-image: url("/image/up.png");
      background-position: 0 0;
      animation: shining 1.2s steps(1) infinite;
      @keyframes shining {
        0% {
          background-position: 0 0;
        }

        15% {
          background-position: 0 -12px;
        }
        30% {
          background-position: 0 -24px;
        }
        45% {
          background-position: 0 -36px;
        }
        60% {
          background-position: 0 -48px;
        }
        75% {
          background-position: 0 -60px;
        }
        90% {
          background-position: 0 -72px;
        }
        100% {
          background-position: 0 -84px;
        }
      }
    }
  }
}
/*背景模糊*/
.bg {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  transform: scale(1.5);
  z-index: -1;
  // filter: blur(30px);
}
.bg:after {
  content: "";
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  background: inherit;
  filter: blur(30px);
  z-index: 2;
  // background: rgba(0, 0, 0, 0.4);
}
.more-content {
  .title {
    span {
      font-size: 0.33rem;
      border-left: 3px solid #d43c33;
      padding-left: 0.2rem;
      height: 0.32rem;
      color: #fff;
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
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        color: #fff;
        &:last-child {
          color: #ccc;
        }
      }
    }
  }
}
</style>