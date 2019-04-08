<template>
  <div>
    <head-top></head-top>
    <gt-autocomplete :autocomplete='autocomplete'></gt-autocomplete>
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
        autocomplete: {
          placeholder: '请输入关键字搜索',
          disabled: false, // 禁用
          valueKey: '', //输入建议对象中用于显示的键名,
          placement: '', // 菜单弹出位置
          valueKey: 'valKey', // 输入建议对象中用于显示的键名
          triggerOnFocus: false, // 是否在输入框 focus 时显示建议列表
          popperAppendToBody: true, // 是否将下拉列表插入至 body 元素。在下拉列表的定位出现问题时，可将该属性设置为 false
          url: '/api/selectQuery/keyWord'
        }
      };
    },
    computed: {},

    watch: {},

    methods: {
      gtAutocomplete(val) {
        console.log('gt-autocomplete', val);
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
      this.$bus.on('gt-autocomplete', this.gtAutocomplete);
    },
  }
</script>
<style scoped>


</style>