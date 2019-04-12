<template>
  <el-upload :limit='data.limit ? data.limit : 5'
    :action="data.action?data.action: process.env.API_HOST+'/wxsupplier/relatedFile/documentUpload'"
    :before-upload="beforeFileUpload" 
    :on-error="uploadError" 
    :on-success="FileUploadSuccess"
    :headers="data.header?data.headers:headers"
    :file-list="model[data.key]"
    :on-remove="handleRemove">
    <el-button size="small" type="primary">点击上传</el-button>
    <div slot="tip" class="el-upload__tip">只能上传word,excel,ppt,txt文件，且不超过2M</div>
  </el-upload>
</template>

<script>
  export default {
    name: '',
    components: {},
    data() {
      return {
        headers: {
          'supplierToken': sessionStorage['suppliertoken']
        },
        model:{}
      };
    },
    props:{
      data:{},
    },
    computed: {},

    watch: {},

    methods: {
      sendImgData(){
        let data = JSON.parse(JSON.stringify(this.model));
        let key = this.$props.data.key;
        data[key].map(img=>{
          delete img.status;
          delete img.uid;
          delete img.url;
          delete img.name;
        })
        this.$bus.emit('gt-file',data)
      },
       /**
       * 图片上传 移除
       */
      handleRemove(file, fileList) {
        let key = this.$props.data.key;
        this.model[key].map((item, index) => {
          if (item.filePath === file.filePath) {
            this.model[key].splice(index, 1);
          }
        })
        this.sendImgData();
      },
      /**
       * 文件 上传 前 
       */
      beforeFileUpload(file) {
        const isJPG = file.type === 'application/vnd.ms-excel' ||
          file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
          file.type === 'text/plain' ||
          file.type === 'application/vnd.ms-powerpoint' ||
          file.type === 'application/vnd.openxmlformats-officedocument.presentationml.presentation' ||
          file.type === 'application/msword' ||
          file.type === 'application/pdf';
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isJPG) {
          this.$message.error('文件必须是 excel,world,ppt,txt 文件!');
        }
        if (!isLt2M) {
          this.$message.error('文件 小于 2MB!');
        }
        return isJPG && isLt2M;
      },
      /**
       * 文件 上传成功
       */
      FileUploadSuccess(res, file, fileList) {
        let key = this.$props.data.key;
        this.model[key].push({
          name: file.name,
          filePath: file.response.data.filePath,
          url: file.url,
        })
        this.sendImgData();
      },
      /**
       *  上传 错误 处理函数
       */
      uploadError() {
        this.quillUpdateImg = false
        this.$message.error("上传失败");
      },
    },
    /**
     * 
     * 生命周期
     *
     */
    created() {
      let data = this.$props.data
      if (data.default.length === 0 || !data.default) {
        this.$set(this.model, data.key, data.default ? data.default : []);
        return;
      }
      data.default.map(file => {
        file.url = 'http://file.sjgtw.com/' + file.filePath;
      })
      this.$set(this.model, data.key, data.default ? data.default : []);
    },
    mounted() {

    },
  }
</script>
<style scoped>


</style>