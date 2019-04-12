<template>
<div>
  <head-top></head-top>
  <el-button type='primary' size='mini' style='margin-left:10px;margin-top:10px'  @click="newUser">新增</el-button>
  <el-button type='primary' size='mini' style='margin-left:10px;margin-top:10px'  @click="BatchDeleteUser">删除</el-button>
  <div class="table-gt">
  
  <gt-table 
      :tableData='tableData' 
      style="width: 98%"  
      :optionWidth="optionWidth"
      :columns="columns" 
      :selection="true"
      v-on:editorUser='editorUser' 
      v-on:selection-change="handleSelectionChange" 
      :handle="handle"></gt-table>
  </div>
</div>
</template>

<script>
  import headTop from '@/components/headTop'
  import {getPagerUserInfo,deleteUserByIds } from '@/api/getData'
  export default {
    name: '',
    components: {
      headTop,
    },
    data() {
      return {
        handle: [
          {
            function: "editorUser",
            text: '编辑',
            type: 'text',
             show:true
          }
        ],
        optionWidth:100,
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
        multipleSelection:[],
      };
    },
    computed: {},

    watch: {},

    methods: {
      /**
       * 新增用户
       */
      newUser(){
        this.$router.push("/goodsPublish");
      },

      /**
       * 获取用户
       */
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
      /* 
       ** 用户批量删除   预处理
       */
      handleSelectionChange(val) {
        console.log('删除用户数据',val);
        let arr = []
        for (var item of val) arr.push(item.id)
        this.multipleSelection = arr;
      },
      /**
       * 删除用户
       */
      async BatchDeleteUser() {
        console.log('删除用户')
        if (this.multipleSelection.length === 0) {
          this.$message.warning('请选择删除数据!')
          return;
        }
        let data = {
          ids: JSON.stringify(this.multipleSelection)
        }
        let res = await deleteUserByIds(data);
        if (res.result)
          this.$message.success(res.message);
        else
          this.$message.warning(res.message);
        this.internalUser();
      },
      /**
       * 编辑用户
       */
      editorUser(index,val){
        console.log('编辑用户',val);
       
        this.$router.push("/userEditor");
      }
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