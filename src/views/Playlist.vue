<template>
  <div>
    <div class="title">
      <div class="title-up">
        <img :src="playlistdetail.coverImgUrl+'?param=126y126'" alt />
        <div>
          <p>{{playlistdetail.name}}</p>
          <div>
            <img :src="playlistdetail.creator.avatarUrl + '?param=30y30'" alt />
            <span>{{playlistdetail.creator.nickname}}</span>
          </div>
        </div>
      </div>
      <div class="title-content">
        <p>
          标签：
          <span v-for="(data,i) in playlistdetail.tags" :key="i">
            {{data}}
          </span>
        </p>
        <p>{{playlistdetail.description}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import axios from "axios";
export default {
  data() {
    return {
      playlistdetail: {},
      songlist: [],
      titleimgurl: ""
    };
  },
  methods: {
    ...mapMutations(["show", "hide"])
  },
  mounted() {
    this.hide();
    axios(`/api/playlist/detail?id=${this.$route.query.playlistid}`).then(
      res => {
        this.playlistdetail = res.data.playlist;
        console.log(res);
        this.songlist = res.data.playlist.tracks;
      }
    );
  },
  destroyed() {
    this.show();
  }
};
</script>

<style lang="scss" scoped>
</style>