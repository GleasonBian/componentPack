<template>
  <el-tabs
    type="border-card"
    v-model="activeName"
    :style="data.width?'width:'+data.width:'width:100%'"
  >
    <el-tab-pane label="PC端" name="PC" :disabled="data.disabled=='PC' ? true:false">
      <el-upload
        class="avatar-uploader-PC"
        :action="data.action"
        :name="data.name?editor.name:'imageFile'"
        :show-file-list="false"
        :on-success="uploadSuccess"
        :on-error="uploadError"
        :before-upload="beforeUpload"
      ></el-upload>
      <quill-editor
        v-model="editor[data.PC.key]"
        ref="QuillEditorPC"
        :options="editorOptionPC"
        @change="onEditorChange($event)"
        style="height:500px"
        v-loading="quillUpdateImg"
      ></quill-editor>
    </el-tab-pane>
    <el-tab-pane label="MB端" name="MB" :disabled="data.disabled=='MB' ? true:false">
      <el-upload
        class="avatar-uploader-MB"
        :action="data.action"
        :name="editor.name?editor.name:'imageFile'"
        :show-file-list="false"
        :on-success="uploadSuccess"
        :on-error="uploadError"
        :before-upload="beforeUpload"
      ></el-upload>
      <quill-editor
        v-model="editor[data.MB.key]"
        ref="QuillEditorMB"
        :options="editorOptionMB"
        @change="onEditorChange($event)"
        style="height:500px"
        v-loading="quillUpdateImg"
      ></quill-editor>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
const toolbarOptions = [
  ["bold", "italic", "underline", "strike"], // toggled buttons

  ["blockquote", "code-block"],

  [
    {
      header: 1
    },
    {
      header: 2
    }
  ],

  [
    {
      list: "ordered"
    },
    {
      list: "bullet"
    }
  ],

  [
    {
      script: "sub"
    },
    {
      script: "super"
    }
  ],

  [
    {
      indent: "-1"
    },
    {
      indent: "+1"
    }
  ],

  [
    {
      direction: "rtl"
    }
  ],

  [
    {
      size: ["small", false, "large", "huge"]
    }
  ],

  [
    {
      header: [1, 2, 3, 4, 5, 6, false]
    }
  ],

  [
    {
      color: []
    },
    {
      background: []
    }
  ],

  [
    {
      font: []
    }
  ],

  [
    {
      align: []
    }
  ],
  ["image"], //'link',, 'video'图片 链接 视频
  ["clean"] // 删除格式化按钮
];
export default {
  name: "",
  components: {},
  data() {
    return {
      /**
       * 富文本 编辑器
       */
      quillUpdateImg: false, // 富文本编辑器 - 图片上传时的 loading 动画开关
      editorOptionPC: {
        placeholder: "", // 占位符
        theme: "snow", // or 'bubble'
        modules: {
          toolbar: {
            container: toolbarOptions, // 工具栏
            handlers: {
              image: function(value) {
                if (value) {
                  // 触发input框选择图片文件
                  document.querySelector(".avatar-uploader-PC input").click();
                } else {
                  this.quill.format("image", false);
                }
              }
            }
          }
        }
      },
      editorOptionMB: {
        placeholder: "", // 占位符
        theme: "snow", // or 'bubble'
        modules: {
          toolbar: {
            container: toolbarOptions, // 工具栏
            handlers: {
              image: function(value) {
                if (value) {
                  // 触发input框选择图片文件
                  document.querySelector(".avatar-uploader-MB input").click();
                } else {
                  this.quill.format("image", false);
                }
              }
            }
          }
        }
      },
      editor: {},
      activeName: "PC"
    };
  },
  props: {
    data: {}
  },
  computed: {},

  watch: {
    editor: function(val) {
      this.$bus.emit("editor-change", val);
    }
  },

  methods: {
    /**
     * 富文本
     */
    onEditorChange({ editor, html, text }) {
      //内容改变事件
      this.$bus.emit("editor-change", this.editor);
    },
    /**
     *  富文本 图片上传前
     */
    beforeUpload(file) {
      // 富文本图片上传前
      // loading动画 开
      this.quillUpdateImg = true;
      const isJPG =
        file.type === "image/jpeg" ||
        file.type === "image/png" ||
        file.type === "image/gif";
      const isLt2M = file.size / 1024 / 1024 < 1;
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG,png,gif 格式!");
      }
      if (!isLt2M) {
        this.$message.error("图片尺寸500*500, 小于 1MB!");
      }
      return isJPG && isLt2M;
    },
    /**
     * 富文本 图片 上传成功
     */
    uploadSuccess(res, file) {
      // 图片上传成功
      let quill = null;
      if (this.activeName == "PC") {
        quill = this.$refs.QuillEditorPC.quill;
      } else {
        quill = this.$refs.QuillEditorMB.quill;
      }
      this.$message.success("上传成功");
      if (res.result) {
        // 获取光标所在位置
        let length = quill.getSelection().index;
        // 插入图片  res.url为服务器返回的图片地址
        quill.insertEmbed(
          length,
          "image",
          "http://file.sjgtw.com" + res.data.filePath
        );
        // 调整光标到最后
        quill.setSelection(length + 1);
      } else {
        this.$message.error("图片插入失败");
      }
      // loading动画消失
      this.quillUpdateImg = false;
    },
    uploadError() {
      this.quillUpdateImg = false;
      this.$message.error("上传失败");
    }
  },
  /**
   *
   * 生命周期
   *
   */
  created() {
    let editorProps = this.$props.data;
    this.activeName = editorProps.activeName;
    if (editorProps.disabled === "PC") {
      this.$set(
        this.editor,
        editorProps.MB.key,
        editorProps.MB.value ? editorProps.MB.value : ""
      );
    } else if (editorProps.disabled === "MB") {
      this.$set(
        this.editor,
        editorProps.PC.key,
        editorProps.PC.value ? editorProps.PC.value : ""
      );
    } else {
      this.$set(
        this.editor,
        editorProps.MB.key,
        editorProps.MB.value ? editorProps.MB.value : ""
      );
      this.$set(
        this.editor,
        editorProps.PC.key,
        editorProps.PC.value ? editorProps.PC.value : ""
      );
    }
  },
  mounted() {}
};
</script>
<style scoped>
.avatar-uploader-PC,
.avatar-uploader-MB {
  height: 0px;
  line-height: 0px;
}
</style>