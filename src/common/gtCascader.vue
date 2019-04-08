<template>
  <div>
    <el-cascader :style="'width:'+width" v-model="cascader" :clearable='true' :show-all-levels="true" :props="props"
      :options="options" @active-item-change="getClassHandle" @change="getThirdHandle">
    </el-cascader>
  </div>
</template>

<script>
  import {baseClassJSONData} from '@/api/getData'
  export default {
    name: '',
    components: {},
    data() {
      return {
        cascader: [],
        props: {
          value: 'id',
          children: 'children',
          label: 'baseClassName'
        },
        options: [],
      };
    },
    props: {
      width: {
        type: String,
        default: '30%',
      }
    },
    computed: {},

    watch: {},

    methods: {
      /**
       * 一级分类
       */
      async FirstClassHandle(value) {
        const response = await baseClassJSONData({
          level: 1,
          limit: 100
        });

        response.rows.map((item, index) => {
          item.children = []
        })

        this.options = response.rows;
      },
      /**
       * 获取二/三级分类
       */
      async getClassHandle(val) {
        if (val) {
          let data = {
            parentId: val[val.length - 1],
            limit: 1000
          }
          const response = await baseClassJSONData(data);
          if (response.rows[response.rows.length - 1].level === 2) {
            this.options.map(item => {
              if (item.id === val[val.length - 1]) {
                item.children = response.rows;
                response.rows.map(item => {
                  if (item.hasChildren)
                    item.children = [];
                })
              }
            })
          } else if (response.rows[response.rows.length - 1].level === 3) {
            this.options.map(first => {
              if (first.id === val[0]) {
                first.children.map(second => {
                  if (second.id === val[1]) {
                    second.children = response.rows;
                    this.thirdList = second.children;
                  }
                })
              }
            })
          }
        }
      },
      getThirdHandle(val) {
        this.thirdList.map(item => {
          if (item.id === val[val.length - 1]) {
            this.keyword2 = item.baseClassName
          }
        })
      },
    },
    /**
     * 
     * 生命周期
     *
     */
    created() {
      this.FirstClassHandle();
    },
    mounted() {

    },
  }
</script>
<style scoped>


</style>