<template>
  <div>
    <head-top></head-top>
    <el-cascader :options="options2" @active-item-change="handleItemChange" :props="props"></el-cascader>
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
 options2: [{
          label: '江苏',
          cities: null,
        }, {
          label: '浙江',
          cities: null
        }],
        props: {
          value: 'label',
          children: 'cities'
        }
      };
    },
    computed: {},

    watch: {},

    methods: {
       handleItemChange(val) {
        console.log('active item:', val);
        setTimeout(_ => {
          if (val.indexOf('江苏') > -1 && !this.options2[0].cities.length) {
            this.options2[0].cities = [{
              label: '南京'
            }];
          } else if (val.indexOf('浙江') > -1 && !this.options2[1].cities.length) {
            this.options2[1].cities = [{
              label: '杭州'
            }];
          }
        }, 300);
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