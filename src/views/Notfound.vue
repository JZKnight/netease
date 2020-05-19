<template>
    <div>
        <h2>404</h2>
        <h2>页面不存在</h2>
    </div>
</template>
<script>
    import {mapMutations} from 'vuex'
export default {
    methods:{
    ...mapMutations(["show","hide"]),
  },
    mounted() {
    this.hide();
  },
    destroyed() {
      this.show()
  },
}
</script>
<style lang="scss" scoped>
    div{
        margin: 30% auto;
        text-align: center;
    }
</style>