<template>
  <div>
    <div class="inp">
      <form action="/">
        <van-search
          v-model="value"
          shape="round"
          placeholder="搜索歌曲、歌手、专辑"
          @search="onSearch"
          @clear="onClear"
          @input="onInput"
        />
      </form>
    </div>
    <div class="hotsearch" v-show="!value">
      <p>热门搜索</p>
      <div class="hotWord">
        <div v-for="(data,i) in hotWords" :key="i" @click="searchSong(data.first)">
          <van-tag round plain size="large">{{data.first}}</van-tag>
        </div>
      </div>
    </div>
    <div class="searchWordList" v-show="isShowWord">
      <div @click="searchSong(value)">
        <p>搜索“{{value}}”</p>
      </div>
      <ul>
        <li @click="searchSong(data.keyword)" v-for="(data,i) in searchWords" :key="i">
          <i class="iconfont icon-sousuo"></i>
          <span>{{data.keyword}}</span>
        </li>
      </ul>
    </div>
    <search-song-list v-if="isShowList" :val="value"></search-song-list>
  </div>
</template>

<script>
import axios from "axios";
import Vue from "vue";
import { Search, Tag, Toast,Loading } from "vant";
import searchSongList from "@/components/SearchList";
import newList from "@/components/NewList";
import {mapMutations} from 'vuex'
Vue.use(Search)
  .use(Tag)
  .use(Toast)
  .use(Loading);
export default {
  components: {
    searchSongList,
    newList
  },
  data() {
    return {
      isShowWord: false,
      isShowList:false,
      value: "",
      hotWords: [],
      searchWords: []
    };
  },
  methods: {
    ...mapMutations(['show','hide']),
    searchSong(res) {
      this.value = res;
      this.onSearch();
    },
    onSearch(val) {
      Toast.loading({
        // message: '加载中...',
        forbidClick: true,
        loadingType: "spinner",
        duration: 500
      });
      this.isShowWord = false;
      this.isShowList = true;
    },
    onClear(val) {
      val = "";
    },
    onInput(val) {
      this.isShowList=false;
      if (val) {
        this.isShowWord = true;
        axios(`/api/search/suggest?keywords=${val}&type=mobile`).then(res => {
          
          this.searchWords = res.data.result.allMatch;
        });
      } else {
        this.isShowWord = false;
      }
    }
  },
  mounted() {
    this.show();
    axios("/api/search/hot").then(res => {
      this.hotWords = res.data.result.hots;
    });
  }
};
</script>

<style lang="scss" scoped>
.inp {
  border-bottom: 0.02rem solid #ddd;
}
.hotsearch {
  padding: 0.3rem 0.2rem 0;
  p {
    font-size: 0.24rem;
    color: #666;
  }
  .hotWord {
    margin: 0.2rem 0 0.14rem;
    div {
      margin: 0 0.16rem 0.16rem 0;
      float: left;
    }
  }
}
.searchWordList {
  padding-left: 0.2rem;
  & > div {
    color: #507daf;
    line-height: 0.9rem;
    border-bottom: 0.02rem solid #dfdfdf;
  }
  ul {
    li {
      line-height: 0.9rem;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      i {
        color: #999;
        padding-right: 0.2rem;
      }
      span {
        font-size: 0.3rem;
        color: #666;
        flex: 1;
        padding-right: 0.2rem;
        border-bottom: 0.02rem solid #dfdfdf;
      }
    }
  }
}
</style>