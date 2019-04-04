<template>
  <div >
    <head-top></head-top>
    <gt-pagination :total='total' :pageSize='limit' :currentPage='offset'></gt-pagination>
  </div>

</template>

<script>
  import headTop from '@/components/headTop'
  import {
    getPagerUserInfo
  } from '@/api/getData'
  export default {
    name: '',
    components: {
      headTop,
    },
    data() {
      return {
        total: 0,
        limit: 10,
        offset: 1
      };
    },
    computed: {},

    watch: {},
    props: {},
    methods: {
      getUserInfo(val) {
        this.total = 2000;
        console.log(val);
        
      },
    },
    /**
     * 
     * 生命周期
     *
     */
    created() {
      this.getUserInfo();
    },
    mounted() {
      //  第几页
      this.$bus.on('page-current-change',this.getUserInfo);
      //  多少条
       this.$bus.on('page-size-change',this.getUserInfo);
    },
    beforeDestroy() { // 监听页面 关闭 事件
      this.$bus.off('page-size-change', this.getUserInfo);
      this.$bus.off('page-current-change', this.getUserInfo);
    },
  }
</script>
<style scoped>

</style>