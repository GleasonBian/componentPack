<template>
<div>
  <head-top></head-top>
  <gt-editor :data="editor"></gt-editor>
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
        editor:{
            activeName:'PC', // 当前激活的选项卡 
            width:'40%', // 编辑器整体宽度,如果不传 默认为 父元素的 100%
            action:'/api/material/fileUpload/uploadImage', // 图片上传 的 路径
            disabled:'MB', // 禁用 的 选项卡 如果不传 将 默认连个都是用
            PC:{ // pc 端 key代表 传入后端字段 , value 默认值 如果不设置 将 默认值为空
              key:'computer',
              value:"<p>MB端<img src=\"http://file.sjgtw.com/M00/0C/D2/wKgBxFyjGqqERKSXAAAAANaQ7Dk223.jpg\"></p>"
            },
            MB:{ 
              key:'phone',
              value:"<p>PC端<img src=\"http://file.sjgtw.com/M00/0C/D2/wKgBxFyjGqqERKSXAAAAANaQ7Dk223.jpg\"></p>"
            }
          }
      };
    },
    computed: {},

    watch: {},

    methods: {
      editorChange(val){
        console.log('editor-change',val);
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
      this.$bus.on('editor-change',this.editorChange)
    },
  }
</script>
<style scoped>


</style>