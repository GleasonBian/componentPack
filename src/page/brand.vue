<template>
  <div>
  <head-top></head-top>
  <gt-brand></gt-brand>
  </div>

</template>

<script>
  import headTop from '@/components/headTop'
  export default {
    name: '',
    components: {
      headTop
    },
    data() {
      return {

      };
    },
    computed: {},

    watch: {},

    methods: {
      brandChange(val){
        console.log('brand-change',val)
      }
    },
    /**
     * 
     * 生命周期
     *
     */
    created() {

    },
    mounted() {
      this.$bus.on('brand-change',this.brandChange)
    },
  }
</script>
<style scoped>


</style>