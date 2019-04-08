<template>
  <head-top></head-top>

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
          key:'singleImg',
          action: '',
          name: 'imageFile',
          headers: {
            'supplierToken': sessionStorage['suppliertoken']
          },
          default:'/M00/0C/87/wKgBxFyQa-2ET99JAAAAALpErmE435.jpg'
        }
      };
    },
    computed: {},

    watch: {},

    methods: {

    },
    /**
     * 
     * 生命周期
     *
     */
    created() {

    },
    mounted() {

    },
  }
</script>
<style scoped>


</style>