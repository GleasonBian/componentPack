<template>
  <div class="manage_page fillcontain">
    <el-row style="height: 100%;">
      <el-col :span="4" style="min-height: 100%; background-color: #272B2E;">
        <el-menu :default-active="defaultActive" style="min-height: 100%;" background-color="#272B2E" text-color="#ffff"
          active-text-color="#FFD04B" :unique-opened='true' :collapse-transition="true" router>
          <el-menu-item index="manage"><i class="el-icon-menu"></i>首页</el-menu-item>
          <el-submenu index="2">
            <template slot="title"><i class="el-icon-document"></i>用户管理</template>
            <el-menu-item index="userList">内部User</el-menu-item>
            <el-menu-item index="shopList">买家用户</el-menu-item>
            <el-menu-item index="foodList">食品列表</el-menu-item>
            <el-menu-item index="orderList">订单列表</el-menu-item>
            <el-menu-item index="adminList">管理员列表</el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title"><i class="el-icon-plus"></i>订单管理</template>
            <el-menu-item index="addShop">订单管理</el-menu-item>
            <el-menu-item index="addGoods">订单详情</el-menu-item>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title"><i class="el-icon-star-on"></i>商家店铺</template>
            <el-menu-item index="visitor">卖家用户</el-menu-item>
            <!-- <el-menu-item index="newMember">用户数据</el-menu-item> -->
          </el-submenu>
          <el-submenu index="5">
            <template slot="title"><i class="el-icon-edit"></i>商品管理</template>
            <!-- <el-menu-item index="uploadImg">上传图片</el-menu-item> -->
            <el-menu-item index="vueEdit">商品管理</el-menu-item>
          </el-submenu>
          <el-submenu index="6">
            <template slot="title"><i class="el-icon-setting"></i>设置</template>
            <el-menu-item index="adminSet">管理员设置</el-menu-item>
            <!-- <el-menu-item index="sendMessage">发送通知</el-menu-item> -->
          </el-submenu>
          <el-submenu index="7">
            <template slot="title"><i class="el-icon-warning"></i>商家基础</template>
            <el-menu-item index="explain">前台分类</el-menu-item>
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
  import searchBox from '@/common/searchBox'
  export default {
    name: 'HelloWorld',
    components: {
      searchBox,
    },
    data() {
      return {
        userState: [{
          value: 10,
          label: '正常'
        }, {
          value: 20,
          label: '禁用'
        }],
        userClass: [{
          value: 10,
          label: '个人'
        }, {
          value: 20,
          label: '个体商户'
        }, {
          value: 30,
          label: '贸易商'
        }, {
          value: 40,
          label: '厂商'
        }],
        searchName: {
          box1: {
            name: "姓名",
            input: true,
            show: true,
          },
          box2: {
            name: "用户手机",
            input: true,
            show: true,
          },
          box3: {
            name: "企业名称",
            input: true,
            show: true,
          },
          box4: {
            name: "用户状态",
            input: false,
            show: true,
          },
          box5: {
            name: "用户类型",
            input: false,
            show: true,
          },
          box6: {
            name: "创建时间",
            input: false,
            show: true,
          },
        }
      }
    },
    created() {
      this.login();
      this.getData();
    },
    computed: {
      sendURL() {
        return this.$store.state.resData;
      }
    },
    methods: {
      login() {
        let data = {
          url: this.url.login,
          prm: {
            userType: 1,
            username: 18911112222,
            password: 123456
          }
        }
        this.$store.commit('commFetch', data);
      },
      getData() {
        let data = {
          url: this.url.userPager,
          prm: {
            userType: 1,
            username: 18911112222,
            password: 123456
          }
        }
        this.$store.commit('pageFetch', data);
      }
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