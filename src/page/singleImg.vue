<template>
  <div>
    <head-top></head-top>
    <gt-singleImg :data='data'></gt-singleImg>
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
        data: {
          key: 'singleImg',
          action: '/api/material/fileUpload/uploadImage',
          name: 'imageFile',
          headers: {
            'supplierToken': sessionStorage['suppliertoken']
          },
          default: '/M00/0C/87/wKgBxFyQa-2ET99JAAAAALpErmE435.jpg'
        }
      };
    },
    computed: {},

    watch: {},

    methods: {
      singleImg(val){
        console.log('gt-singleImg',val)
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
      this.$bus.on('gt-singleImg',this.singleImg);
    },
  }
</script>
<style scoped>


</style>