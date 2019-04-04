<template>
  <div>
    <head-top></head-top>
    <el-col align="middle">
      <searchBox1 :data="searchData" @handle='getData' size=""></searchBox1>
    </el-col>
  </div>
</template>

<script>
  import headTop from '@/components/headTop'
  import searchBox1 from '@/common/searchBox'
  export default {
    name: '',
    components: {
      headTop,
      searchBox1,
    },
    data() {
      return {
        searchData: [{
            key: 'id', // 与后端交互时的字段 必填
            label: '一二三四', // 搜索框名称 必填
            placeholder: '请搜索', // 占位符 选填
            default: '0', // 搜索框 默认值
            options: [{ // 选填 如果 存在 options 选项 搜索框将由 input 变为 select框
              value: '1', // 下拉选项 绑定 值
              label: '男' // 下拉选项 绑定 名称
            }, {
              value: '0',
              label: '女'
            }]
          },
          {
            key: 'date',
            label: '一二三四',
            placeholder: '',
            default: '',
          },
          {
            key: 'age',
            label: '一二三四',
            placeholder: '请搜索',
            default: ''
          },
        {
            key: 'ccc',
            label: '一二三四',
            placeholder: '请搜索',
            default: ''
          },
          {
            key: 'asdafs',
            label: '一二三四',
            placeholder: '请搜索',
            default: ''
          },
         {
            key: 'adgdd',
            label: '一二三四',
            placeholder: '请搜索',
            default: ''
          },
          /*  {
            key: 'sdf',
            label: '一二三四',
            placeholder: '请搜索',
            default: ''
          }   */
        ]
      }
    },
    computed: {},

    watch: {},

    methods: {
      getData(val) {
        console.log(val);
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