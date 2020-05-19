<template>
<div class="boss-head">
<div class="box-head">
<img src="/image/download_logo_3x.png" alt="">
</div>
<div class="nav-head">
<router-link tag="span"  activeClass="tab" to="/music-list" >推荐音乐</router-link>
<router-link tag="span"  activeClass="tab" to="/music-top">热歌榜</router-link>
<router-link tag="span"  activeClass="tab" to="/music-search">搜索</router-link>
</div>
</div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.boss-head{
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  overflow: hidden;
  z-index: 100;
  background: #fff;
}
.box-head{
  background-color: #d43c33;
    height:1.68rem;
    padding: 0 .2rem;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  img{
    height: .5rem;
  }
}
.nav-head{
  display: flex;
    justify-content: space-around;
    align-items: center;
    height: .8rem;
    width: 100%;
    border-bottom: .02rem solid #ddd;
    span{
      // flex: 1;
      text-align: center;
      width: 1.68rem;
      padding:.16rem .1rem;
    }
        .tab{
          color: #d43c33;
          border-bottom: #d43c33 solid .06rem;
        }
}
</style>