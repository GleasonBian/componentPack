<template>
  <div>
    <head-top></head-top>
    <quill-editor v-model="detailContent" ref="myQuillEditorPC" :options="editorOption" @change="onEditorChange($event)"></quill-editor>
  </div>
</template>

<script>
  const toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'], // toggled buttons
    ['blockquote', 'code-block'],

    [{
      'header': 1
    }, {
      'header': 2
    }], // custom button values
    [{
      'list': 'ordered'
    }, {
      'list': 'bullet'
    }],
    [{
      'script': 'sub'
    }, {
      'script': 'super'
    }], // superscript/subscript
    [{
      'indent': '-1'
    }, {
      'indent': '+1'
    }], // outdent/indent
    [{
      'direction': 'rtl'
    }], // text direction

    [{
      'size': ['small', false, 'large', 'huge']
    }], // custom dropdown
    [{
      'header': [1, 2, 3, 4, 5, 6, false]
    }],

    [{
      'color': []
    }, {
      'background': []
    }], // dropdown with defaults from theme
    [{
      'font': []
    }], // 字体
    [{
      'align': []
    }],
    ['image'], //'link',, 'video'                // 图片 链接 视频
    ['clean'] // 删除格式化按钮
  ]
  import headTop from '@/components/headTop'
  export default {
    name: '',
    components: {
      headTop,
    },
    data() {
      return {
        serverUrl: process.env.API_HOST + '/material/fileUpload/uploadImage', // 图片上传 接口
        quillUpdateImg: false, // 富文本编辑器 - 图片上传时的 loading 动画开关
        detailContent: null, // 富文本 编辑器 内容
        editorOption: {
          placeholder: '', // 占位符
          theme: 'snow', // or 'bubble'
          modules: {
            toolbar: {
              container: toolbarOptions, // 工具栏
              handlers: {
                'image': function (value) {
                  if (value) {
                    // 触发input框选择图片文件
                    document.querySelector('.avatar-uploader-PC input').click()
                  } else {
                    this.quill.format('image', false);
                  }
                }
              }
            }
          }
        },
      }
    },
    computed: {},

    watch: {},

    methods: {
      /**
       * 富文本 
       */
      onEditorChange({
        editor,
        html,
        text
      }) { //内容改变事件
        this.detailContent = html
      },
      /**
       *  富文本 图片上传前
       */
      beforeUpload(file) { // 富文本图片上传前
        // loading动画 开
        this.quillUpdateImg = true
        const isJPG = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif';
        const isLt2M = file.size / 300 / 300 < 1;
        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG,png,gif 格式!');
        }
        if (!isLt2M) {
          this.$message.error('图片尺寸300*300, 小于 1MB!');
        }
        return isJPG && isLt2M;
      },
      /**
       * 富文本 图片 上传成功
       */
      uploadSuccess(res, file) { // 图片上传成功
        let quill = this.$refs.myQuillEditorPC.quill
        // 如果上传成功
        if (res.result) {
          // 获取光标所在位置
          let length = quill.getSelection().index;
          // 插入图片  res.url为服务器返回的图片地址
          quill.insertEmbed(length, 'image', 'http://file.sjgtw.com' + res.data.filePath)
          // 调整光标到最后
          quill.setSelection(length + 1)
        } else {
          this.$message.error('图片插入失败')
        }
        // loading动画消失
        this.quillUpdateImg = false
      },
      /**
       * 富文本 图片 上传失败
       */
      uploadError() { // 富文本图片上传失败
        // loading动画 关
        this.quillUpdateImg = false
        this.$message.warning('图片插入失败')
      },
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