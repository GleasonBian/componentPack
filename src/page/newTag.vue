<template>
  <div>
    <head-top></head-top>
    <gt-newTag :tag='tag'></gt-newTag>
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
        tag:{
          ref:'newtag',
          width:'100%',
          default:'nihoa,dingding,bianliuzhu',
          returnType:String
        }
      };
    },
    computed: {},

    watch: {},

    methods: {
      tagChange(val){
        console.log('tag-chagne',val);
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
      this.$bus.on('tag-change',this.tagChange)
    },
  }
</script>
<style scoped>


</style>