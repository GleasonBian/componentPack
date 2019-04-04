<template>
<div>
  <el-dialog 
  :title="dialog.title" 
  :visible.sync="dialog.visible" 
  :width="dialog.width ? dialog.width : '30%'" 
  :center="dialog.center" 
  :top="dialog.top?dialog.top:'3vh'" :modal-append-to-body="true"> 
    <div class="dialog-body">
      <slot name="dialogBody"></slot>
    </div>
    <!-- <div slot="footer" class="dialog-footer">
      <el-button @click="dialogCancel">取 消</el-button>
      <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
    </div> -->
  </el-dialog>
  
</div>

</template>
<script>
  export default {
    name: 'gt-dialog',
    components: {},
    data() {
      return {

      };
    },
    props: {
      dialog:{
        type:Object,
      }
      
    },
    computed: {},

    watch: {},

    methods: {
      dialogCancel(){
        this.$bus.emit('dialog-cancel')
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

    },
  }
</script>
<style scoped>


</style>