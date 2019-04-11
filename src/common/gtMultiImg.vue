<template>
  <div>
    <el-upload list-type="picture-card" accept="image/*" :multiple="true" :limit='data.limit ? data.limit : 5'
      :file-list="model[data.key]"
      :action="data.action?data.action: process.env.API_HOST+'/material/fileUpload/uploadImage'"
      :name="data.name?data.name:'imageFile'" :headers="data.header?data.headers:headers"
      :before-upload="beforeImageUpload" :on-error="uploadError" :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove" :on-success="multiImageSuccess">
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible" top='0.5vh'>
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>

</template>

<script>
  export default {
    name: '',
    components: {},
    data() {
      return {
        model: {},
        dialogImageUrl: '',
        dialogVisible: false,
      };
    },
    props: {
      data: {},
    },
    computed: {},

    watch: {},

    methods: {
      /**
       * 
       */
      sendImgData(){
        let data = JSON.parse(JSON.stringify(this.model));
        data.multiImg.map(img=>{
          delete img.status;
          delete img.uid;
          delete img.url;
          delete img.name;
        })
        this.$bus.emit('gt-multiImg',data)
      },
      /**
       *  图片上传 前 处理函数
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
       *  图片 查看
       */
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },

      /**
       *  多图上传成功
       */
      multiImageSuccess(res, file, fileList) {
        let key = this.$props.data.key;
        this.model[key].push({
          name: file.name,
          filePath: file.response.data.filePath,
          url: file.url,
          imageType: 0,
        })
        this.sendImgData();
      },
      /**
       *  单图上传 错误 处理函数
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
      data.default.map(img => {
        img.url = 'http://file.sjgtw.com/' + img.filePath;
      })
      this.$set(this.model, data.key, data.default ? data.default : []);
    },
    mounted() {

    },
  }
</script>
<style scoped>


</style>