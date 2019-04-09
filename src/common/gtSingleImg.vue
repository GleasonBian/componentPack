<template>
  <el-upload class="upload-img"
    :action="data.action?data.action: process.env.API_HOST+'/material/fileUpload/uploadImage'"
    :name="data.name?data.name:'imageFile'" :show-file-list="false" accept="image/*" :on-success="singleImageSuccess"
    :before-upload="beforeImageUpload" :on-error="uploadError" :headers="data.headers?data.headers:headers">
    <img v-if="model[data.key]" :src="'http://file.sjgtw.com/'+ model[data.key]" class="avatar">
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
       /**
       *  单图上传 前 处理函数
       */
      beforeImageUpload(file) {
        const isJPG = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif';
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isJPG) {
          this.$message.error('图片只能是 JPG,png,gif 格式!');
        }
        if (!isLt2M) {
          this.$message.error('图片尺寸500*500, 小于 2MB!');
        }
        return isJPG && isLt2M;
      },
      /**
       *  单图上传 成功 处理函数
       */
      singleImageSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
        this.$message.success(res.message);
        this.model[this.$props.data.key] = res.data.filePath;
        this.$bus.emit('gt-singleImg',this.model);
      },
      /**
       *  单图上传 错误 处理函数
       */
      uploadError() {
        this.$message.error("上传失败");
      },
    },
    /**
     * 
     * 生命周期
     *
     */
    created() {
      this.$set(this.model,this.$props.data.key,this.$props.data.default)
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