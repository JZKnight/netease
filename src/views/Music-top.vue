<template>
  <div>
    <div class="top-img">
      <div class="little-img"></div>
      <!-- <p>更新日期：</p> -->
    </div>
    <hot-list></hot-list>
  </div>
</template>

<script>
import bus from "@/utils/bus";
import hotList from "@/components/HotList";
import {mapMutations} from 'vuex'
export default {
  components: {
    hotList
  },
  mounted() {
    this.show();
  },
  methods:{
    ...mapMutations(['show','hide'])
  }
};
</script>

<style lang="scss" scoped>
.top-img {
  height: 2.92rem;
  width: 100%;
  overflow: hidden;
  background: url("/image/hot_music_bg_3x.jpg") no-repeat;
  background-size: contain;
  position: relative;
  .little-img {
    position: absolute;
    top: .6rem;
    left: .5rem;
    width: 2.84rem;
    height: 1.34rem;
    background: url("/image/index_icon_2x.png") no-repeat -0.48rem -0.6rem;
    background-size: 3.32rem 1.94rem;
    // border: 1px solid #000;
  }
}
</style>