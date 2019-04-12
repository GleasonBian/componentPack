<template>
  <div>
    <head-top></head-top>
    <gt-singleImg :data='data'></gt-singleImg>
    <gt-multiImg :data='multImgData'></gt-multiImg>
    <gt-file :data='fileData'></gt-file>
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
        },
        multImgData:{
          key:'multiImg',
          action:'/api/material/fileUpload/uploadImage',
          limit:5,
          name:'imageFile',
          limit:5,
          header:{
            'supplierToken': sessionStorage['suppliertoken']
          },
          default:[{ filePath: 'M00/0C/D1/wKgBxFyi-IqEUrEUAAAAALpErmE142.jpg',}, { filePath: '/M00/0C/D1/wKgBxFyi-OiEejaWAAAAAGaPstA973.png'}]
        },
        fileData: {
            key:'fileList',
            action:'/api/wxsupplier/relatedFile/documentUpload',
            default:[
              { filePath: 'M00/0C/D1/wKgBxFyi-IqEUrEUAAAAALpErmE142.jpg',}, 
              { filePath: '/M00/0C/D1/wKgBxFyi-OiEejaWAAAAAGaPstA973.png'}
            ],
            limit:5,
          },
        
      };
    },
    computed: {},

    watch: {},

    methods: {
      singleImg(val){
        console.log('gt-singleImg',val)
      },
      multiImg(val){
        console.log('gt-multiImg',val);
      },
      gtFileUpload(val){
        console.log('gt-file',val)
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
      this.$bus.on('gt-multiImg',this.multiImg);
      this.$bus.on('gt-file',this.gtFileUpload);
    },
  }
</script>
<style scoped>


</style>