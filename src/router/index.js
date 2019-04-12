import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const login = r => require.ensure([], () => r(require('@/page/login')), 'login');
const manage = r => require.ensure([], () => r(require('@/page/manage')), 'manage');
const home = r => require.ensure([], () => r(require('@/page/home')), 'home');
const addShop = r => require.ensure([], () => r(require('@/page/addShop')), 'addShop');
const pagination = r => require.ensure([], () => r(require('@/page/pagination')), 'pagination');
const shearchBox = r => require.ensure([], () => r(require('@/page/searchBox')), 'searchBox');
const table = r => require.ensure([], () => r(require('@/page/table')), 'table');
const formList = r => require.ensure([], () => r(require('@/page/formList')), 'formList');
const gtTabTree = r => require.ensure([], () => r(require('@/page/gtTabTree')), 'gtTabTree');
const dialog = r => require.ensure([], () => r(require('@/page/dialog')), 'dialog');
const upload = r => require.ensure([], () => r(require('@/page/upload')), 'upload');
const newTag = r => require.ensure([], () => r(require('@/page/newTag')), 'newTag');
const autocomplete = r => require.ensure([], () => r(require('@/page/autocomplete')), 'autocomplete');
const vueEdit = r => require.ensure([], () => r(require('@/page/vueEdit')), 'vueEdit');
const editor = r => require.ensure([], () => r(require('@/page/editor')), 'editor');
const cascader = r => require.ensure([], () => r(require('@/page/cascader')), 'cascader');
const brand = r => require.ensure([], () => r(require('@/page/brand')), 'brand');
const goodsPublish = r => require.ensure([], () => r(require('@/page/goodsPublish')), 'goodsPublish');
const userList = r => require.ensure([], () => r(require('@/page/userList')), 'userList');

const routes = [{
    path: '/',
    component: login
  },
  {
    path: '/manage',
    component: manage,
    children: [{
      path: '',
      component: home,
      meta: [],
    }, {
      path: '/addShop',
      component: addShop,
      meta: ['添加数据', '添加商铺'],
    }, {
      path: '/pagination',
      component: pagination,
      meta: ['添加数据', '添加商品'],
    }, {
      path: '/shearchBox',
      component: shearchBox,
      meta: ['组件', '搜索框'],
    }, {
      path: '/table',
      component: table,
      meta: ['组件', '表格'],
    }, {
      path: '/formList',
      component: formList,
      meta: ['组件', 'form表单'],
    }, {
      path: '/gtTabTree',
      component: gtTabTree,
      meta: ['组件', '订单列表'],
    }, {
      path: '/dialog',
      component: dialog,
      meta: ['数据管理', '管理员列表'],
    }, {
      path: '/upload',
      component: upload,
      meta: ['图表', '用户分布'],
    }, {
      path: '/newTag',
      component: newTag,
      meta: ['图表', '用户数据'],
    }, {
      path: '/autocomplete',
      component: autocomplete,
      meta: ['文本编辑', 'MarkDown'],
    }, {
      path: '/vueEdit',
      component: vueEdit,
      meta: ['编辑', '文本编辑'],
    }, {
      path: '/userList',
      component: userList,
      meta: ['编辑', '文本编辑'],
    }, {
      path: '/editor',
      component: editor,
      meta: ['设置', '管理员设置'],
    }, {
      path: '/goodsPublish',
      component: goodsPublish,
      meta: ['发布', '商品'],
    }, {
      path: '/brand',
      component: brand,
      meta: ['说明', '说明'],
    }]
  }
]

export default new Router({
  routes,
  strict: process.env.NODE_ENV !== 'production',
})
