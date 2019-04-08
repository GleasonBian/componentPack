<template>
  <el-upload class="upload-img"
    :action="data.action?data.action: process.env.API_HOST+'/material/fileUpload/uploadImage'"
    :name="data.name?data.name:'imageFile'" :show-file-list="false" accept="image/*" :on-success="singleImageSuccess"
    :before-upload="beforeImageUpload" :on-error="uploadError" :headers="data.headers?data.headers:headers">
    <img v-if="model[data.key]" :src="'http://file.sjgtw.com/'+data.default" class="avatar">
    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
  </el-upload>
</template>

<script>
  export default {
    name: 'singleImg',
    components: {},
    data() {
      return {
        headers: {
          'supplierToken': sessionStorage['suppliertoken']
        },
        model:{

        }
      };
    },
    props: {
      data: {},
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
      console.log(this.$props);
    },
    mounted() {

    },
  }
</script>
<style scoped>
  /* 单图上传 */
  .upload-img {
    width: 148px;
    height: 148px;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    background-color: #fbfdff;
  }

  .upload-img:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 148px;
    height: 148px;
    line-height: 148px;
    text-align: center;
  }

  .avatar {
    width: 148px;
    height: 148px;
    display: block;
  }
</style>