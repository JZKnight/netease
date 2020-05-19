<template>
  <div id="app">
    <homehead v-show="isHeadShow"></homehead>
    <router-view :class="isHeadShow?'appcontent':''"></router-view>
  </div>
</template>
<script>
import homehead from '@/components/Homehead'
import {mapState} from 'vuex'
export default {
  components:{
    homehead
  },
  data(){
    return{
    }
  },
  computed:{
    ...mapState(['isHeadShow'])
  }
}
</script>
<style lang="scss">
// #app{
//   overflow: hidden;
// }
.appcontent{
  margin-top: 2.48rem;
}
</style>
