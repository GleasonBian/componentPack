<template>
  <div>
    <head-top></head-top>
    <!-- 三级分类 -->
    <h1>三级分类</h1>
    <gt-cascader-class></gt-cascader-class>
    <!-- 普通级联 -->
    <h1>普通级联</h1>
    <gt-cascader ref="gtCascader" :options='cascaderOpt' url='/material/baseClass/baseClassJSONData'></gt-cascader>
  </div>
</template>

<script>
   import {baseClassJSONData} from '@/api/getData'
  import headTop from '@/components/headTop'
  export default {
    name: '',
    components: {
      headTop
    },
    data() {
      return {
        cascaderOpt:[],
      };
    },
    computed: {},

    watch: {},

    methods: {
      /**
       * 三级分类
       */
      cascaderClass(val) {
        console.log('cascader-class', val)
      },

      /* ***************************************** */

      /**
       * 一级分类
       */
      async FirstClassHandle(value) {
        const response = await baseClassJSONData({
          level: 1,
          limit: 100
        });

        response.rows.map((item, index) => {
          item.children = []
        })

        this.cascaderOpt = response.rows;
      },
    },
    /**
     * 
     * 生命周期
     *
     */
    created() {
      this.FirstClassHandle();
    },
    mounted() {
      this.$bus.on('gt-cascader', this.cascaderClass)
    },
  }
</script>
<style scoped>


</style>