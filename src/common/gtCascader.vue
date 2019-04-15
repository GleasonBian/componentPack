<template>
  <div>
    <el-cascader
      :style="'width:'+width"
      v-model="cascader"
      :clearable="true"
      :show-all-levels="true"
      :props="props"
      :options="options"
      @active-item-change="getLevelHandle"
      @change="getThirdHandle"
    ></el-cascader>
  </div>
</template>

<script>
import { baseClassJSONData } from "@/api/getData";
export default {
  name: "",
  components: {},
  data() {
    return {
      cascader: [],
      props: {
        value: "id",
        children: "children",
        label: "baseClassName"
      },
      thirdList: [],
      className: ""
    };
  },
  props: {
    width: {
      type: String,
      default: "30%"
    },
    url: {
      type: String,
      default: "/material/baseClass/baseClassJSONData"
    },
    options: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  computed: {},

  watch: {},

  methods: {
    /**
     * 一级分类
     */
    // FirstLevelHandle(value) {
    //   console.log(value);
    //   this.options = value;
    // },
    /**
     * 获取二/三级分类
     */
    getLevelHandle(val, fun) {
      if (val) {
        let data = {
          parentId: val[val.length - 1],
          limit: 1000
        };
        this.axios
          .post(this.url, data)
          .then(res => {
            let response = res.data;
            if (response.rows[response.rows.length - 1].level === 2) {
              this.options.map(item => {
                if (item.id === val[val.length - 1]) {
                  item.children = response.rows;
                  response.rows.map(item => {
                    if (item.hasChildren) item.children = [];
                  });
                }
              });
            } else if (response.rows[response.rows.length - 1].level === 3) {
              this.options.map(first => {
                if (first.id === val[0]) {
                  first.children.map(second => {
                    if (second.id === val[1]) {
                      second.children = response.rows;
                      this.thirdList = second.children;
                    }
                  });
                }
              });
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    getThirdHandle(val) {
      this.$bus.emit("gt-cascader", val);
      this.thirdList.map(item => {
        if (item.id === val[val.length - 1]) {
          this.className = item.baseClassName;
        }
      });
    }
  },
  /**
   *
   * 生命周期
   *
   */
  created() {},
  mounted() {}
};
</script>
<style scoped>
</style>