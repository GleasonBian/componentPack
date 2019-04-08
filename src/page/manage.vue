<template>
  <div class="manage_page fillcontain">
    <el-row style="height: 100%;">
      <el-col :span="4" style="min-height: 100%; background-color: #272B2E;">
        <el-menu :default-active="defaultActive" style="min-height: 100%;" background-color="#272B2E" text-color="#ffff"
          active-text-color="#FFD04B" :unique-opened='true' :collapse-transition="true" router>
          <el-menu-item index="manage"><i class="el-icon-menu"></i>首页</el-menu-item>
          <el-submenu index="2">
            <template slot="title"><i class="el-icon-document"></i>组件</template>
            <el-menu-item index="shearchBox">搜素框</el-menu-item>
            <el-menu-item index="table">表格</el-menu-item>
           <el-menu-item index="formList">form表单</el-menu-item>
           <el-menu-item index="pagination">分页</el-menu-item>
           <el-menu-item index="dialog">dialog</el-menu-item>
           <el-menu-item index="editor">editor</el-menu-item>
           <el-menu-item index="brand">brand</el-menu-item>
           <el-menu-item index="newTag">newTag</el-menu-item>
           <!-- <el-menu-item index="gtTabTree">gtTabTree</el-menu-item> -->
           <el-menu-item index="cascader">级联</el-menu-item>
           <el-menu-item index="autocomplete">远程输入建议</el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title"><i class="el-icon-plus"></i>订单管理</template>
            <el-menu-item index="addShop">订单管理</el-menu-item>
            <!-- <el-menu-item index="addGoods">订单详情</el-menu-item> -->
          </el-submenu>
          <el-submenu index="4">
            <template slot="title"><i class="el-icon-star-on"></i>商家管理</template>
            <el-menu-item index="visitor">商家店铺</el-menu-item>
            <el-menu-item index="newMember">卖家用户</el-menu-item>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title"><i class="el-icon-edit"></i>商品管理</template>
            <!-- <el-menu-item index="uploadImg">上传图片</el-menu-item> -->
            <el-menu-item index="vueEdit">商品管理</el-menu-item>
          </el-submenu>
          <el-submenu index="6">
            <template slot="title"><i class="el-icon-setting"></i>商家基础</template>
            <el-menu-item index="adminSet">前台分类</el-menu-item>
            <el-menu-item index="sendMessage">中台分类</el-menu-item>
          </el-submenu>
          <el-submenu index="7">
            <template slot="title"><i class="el-icon-warning"></i>物资库</template>
            <el-menu-item index="explain">物资列表</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-col>
      <el-col :span="20" style="height: 100%;overflow: auto;">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: 'HelloWorld',
    components: {
     
    },
    data() {
      return {
      }
    },
    created() {
     
    },
    computed: {
     
    },
    methods: {
     
    },
    computed: {
      defaultActive: function () {
        return this.$route.path.replace('/', '');
      }
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import '../style/mixin';

  .elmenu {
    background: #324057;
  }
</style>