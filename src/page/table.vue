<template>
<div>
  <head-top></head-top>
  <div class="table-gt">
  <gt-table :tableData="tableData" :columns="columns" style="width:98%"></gt-table>
  </div>
</div>
</template>

<script>
  import headTop from '@/components/headTop'
  import {getPagerUserInfo } from '@/api/getData'
  export default {
    name: '',
    components: {
      headTop,
    },
    data() {
      return {
        tableData:[],
        columns: [{
            id: 'userName',
            label: '登录账号',
          }, {
            id: 'name',
            label: '用户名称',
          },
          {
            id: 'position',
            label: '职位名称',
          }, {
            id: 'mail',
            label: '邮箱',
          }, {
            id: 'deptName',
            label: '部门名称',
          }, {
            id: 'state',
            label: '用户状态',
          }, {
            id: 'entryTimeStr',
            label: '入职时间',
          }
        ],
      };
    },
    computed: {},

    watch: {},

    methods: {
       async internalUser(limit, offset) {
        // 内部user
        let data = {
          name: '', // 姓名
          userName: '', // 手机号
          position: '', // 所在部门
          startTime: '',
          endTime: '',
          limit: limit == undefined ? 10 : limit,
          pageNo: offset == undefined ? 1 : offset
        };
        const res = await getPagerUserInfo(data);
        this.tableData = res.rows;
      },
    },
    /**
     * 
     * 生命周期
     *
     */
    created() {
      this.internalUser();
    },
    mounted() {

    },
  }
</script>
<style scoped>

.table-gt{
  display: flex;
  justify-content: center;
  padding: 10px;
}
</style>