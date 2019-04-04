<template>
  <div class="gt-pagination">
    <el-pagination :layout='layout' :small='small' :background="background" :page-size='pageSize'
      :page-sizes="[10, 20, 30, 40]" :current-page="currentPage" :pager-count='pagerCount' :total="total"
      :disabled='disabled' @size-change="handleSizeChange" @current-change="handleCurrentChange"> </el-pagination>
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
        limit: 10,
        offset: 1
      };
    },
    props: {
      layout: {
        type: String,
        default: 'total, sizes, prev, pager, next, jumper',
      },
      small: { //是否使用小型分页样式
        type: Boolean,
        default: false,
      },
      background: { //是否为分页按钮添加背景色
        type: Boolean,
        default: false
      },
      pageSize: { //每页显示条目数
        type: Number,
        default: 10
      },
      currentPage: { // 第几页 / 当前页
        type: Number,
        default: 1
      },
      total: { // 总条目数 必填
        type: Number,
        default: 0,
      },
      pagerCount: { // 设置最大页码按钮数
        type: Number,
        default: 11
      },
      disabled: {
        type: Boolean,
        default: false
      },
    },
    computed: {},

    watch: {},

    methods: {
      /**
       *  每页 多少条
       */
      handleSizeChange(val) {
        console.log(`每页${val}条`, 'page-size-change');
        this.limit = val;
        this.$bus.emit('page-size-change', {
          limit: val,
          offset: this.offset
        });
      },
      /**
       * 第几页 === 当前页
       */
      handleCurrentChange(val) {
        this.offset = val;
        console.log(`第${val}页`, 'page-current-change');
        this.$bus.emit('page-current-change', {
          limit: this.limit,
          offset: val
        });
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
  .gt-pagination {
    display: flex;
    justify-content: center;
    padding: 15px;
    width: 100%;
  }
</style>