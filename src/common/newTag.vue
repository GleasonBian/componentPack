<template>
  <div style="width:100%">
    <el-tag class="new-tag" :key="item" v-for="item in data" closable :disable-transitions="false"
      @close="handleClose(item)">
      {{item}}
    </el-tag>
    <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" :ref="tag.ref" size="small"
      @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm"></el-input>
    <el-button v-else class="button-new-tag" size="small" type="primary" @click="showInput">点击添加</el-button>
  </div>
</template>

<script>
  export default {
    name: 'gt-newTag',
    components: {},
    data() {
      return {
        // 标签
        inputVisible: false,
        inputValue: '',
        activeName: '',
        data: [],
      };
    },
    props: {
      tag: {}
    },
    computed: {},

    watch: {

    },

    methods: {
      /**
       * 关闭标签
       */
      handleClose(tag) {
        this.data.splice(this.data.indexOf(tag), 1);
        if(!this.tag.returnType || this.tag.returnType === String){
           this.$bus.emit('tag-change', this.data.join(','));
        }else{
          this.$bus.emit('tag-change', this.data);
        }
       
      },
      /**
       * 显示输入框
       */
      showInput() {
        let ref = this.$props.tag.ref;
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs[ref].$refs.input.focus();
        });
      },
      /**
       * 输入确认
       */
      handleInputConfirm() {
        let inputValue = this.inputValue;
        if (inputValue !== '') {
          if (this.data.indexOf(inputValue) == -1) {
            this.data.push(inputValue);
          } else
            this.$message.warning(this.inputValue + ' 已存在')
        }
        this.inputVisible = false;
        this.inputValue = '';
        if(!this.tag.returnType || this.tag.returnType === String){
           this.$bus.emit('tag-change', this.data.join(','));
        }else{
          this.$bus.emit('tag-change', this.data);
        }
      },
    },
    /**
     * 
     * 生命周期
     *
     */
    created() {
      let val = this.$props.tag.default;
      if (Object.prototype.toString.call(val) === '[object Array]') {
        this.data = val;
      } else if (Object.prototype.toString.call(val) === '[object String]') {
        let ary = val.split(",")
        this.data =ary;
      }
    },
    mounted() {

    },
  }
</script>
<style scoped>
  .button-new-tag {
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }

  .input-new-tag {
    width: 80px;
    vertical-align: bottom;
  }

  .new-tag {
    margin-right: 10px;
  }
</style>