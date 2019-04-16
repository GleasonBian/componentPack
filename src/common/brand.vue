<template>
  <!-- 品牌选择 -->
  <div>
    <el-button type="primary" @click="clickChooseBrand">点击选择</el-button>
    <el-tag v-show="brandName !== ''">{{ brandName }}</el-tag>
    <el-dialog
      title="选择品牌"
      :visible.sync="isShowbrandBox"
      top="5vh"
      :center="true"
      custom-class="el-dialog"
      width="480px"
    >
      <el-form label-width="100px">
        <el-form-item label="搜索品牌">
          <el-input
            placeholder="请输入品牌名称"
            v-model="brandKeyword"
            clearable
          >
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-form-item>
        <el-form-item label="已选品牌">
          <el-tag type="success">{{ brandName || "请选择品牌" }}</el-tag>
        </el-form-item>
      </el-form>
      <el-table
        :data="brandData"
        :border="true"
        fit
        :show-header="true"
        :highlight-current-row="true"
        size="small"
        @current-change="handleCurrentChange"
        v-loading="loading"
      >
        <el-table-column
          type="index"
          label="序号"
          align="center"
          header-align="center"
          width="50"
        ></el-table-column>
        <el-table-column
          prop="chineseName"
          label="中文名称"
          align="center"
          header-align="center"
        ></el-table-column>
        <!-- <el-table-column prop="englishName"  label="英文名称" align="center" header-align="center"> </el-table-column> -->
        <el-table-column label="图片" align="center" header-align="center">
          <template slot-scope="scope">
            <img :src="scope.row.fileVO" alt="图片" style="height:30px" />
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        @current-change="offsetChange"
        :current-page.sync="offset"
        :page-size="limit"
      ></el-pagination>
    </el-dialog>
  </div>
</template>

<script>
import { brand } from "@/api/getData";
export default {
  name: "gt-brand",
  components: {},
  data() {
    return {
      brandName: "",
      isShowbrandBox: false, // 是否显示品牌 dialog
      brandKeyword: "", // 搜索品牌关键字
      total: 0, // 品牌 总条数
      brandData: [], // 品牌数据
      loading: true, //  品牌列表loading
      brand: {},
      limit: 10,
      offset: 1
    };
  },
  props: {},
  computed: {},

  watch: {},

  methods: {
    offsetChange(val) {
      this.offset = val;
      this.clickChooseBrand();
    },
    /*
     ** 选择品牌  请求数据
     */
    async clickChooseBrand() {
      this.isShowbrandBox = true;
      let data = {
        limit: 10,
        pageNo: this.offset,
        keyword: this.brandKeyword
      };
      const res = await brand(data);
      this.total = res.total;
      res.rows.map(item => {
        if (item.fileVO) {
          item.fileVO = "http://file.sjgtw.com/" + item.fileVO.filePath;
        } else {
          item.fileVO =
            "http://file.sjgtw.com/M00/04/38/wKgBxFp5d22EHfuBAAAAAHo6-30319.jpg";
        }
      });
      this.brandData = res.rows;
      this.loading = false;
    },
    /*
     ** 选择品牌
     */
    handleCurrentChange(row) {
      if (!row) return;
      this.$set(
        this.brand,
        "brandName",
        row.chineseName ? row.chineseName : ""
      );
      this.$set(this.brand, "brandId", row.id);
      this.brandName = row.chineseName ? row.chineseName : "";
      this.isShowbrandBox = false;
      this.$bus.emit("brand-change", this.brand);
    },
    /*
     ** 2019 02 15  【己亥猪年】 丙寅月 癸未日
     */
    handleClick() {
      console.info("2019 bug not found!");
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
.areaMulti {
  display: flex;
  justify-content: space-between;
  flex-wrap: nowrap;
  align-items: center;
  width: 300px;
}

.input-width {
  width: 20%;
}

.brandInput {
  width: 60%;
}

img {
  vertical-align: middle;
  margin: 0px;
  padding: 0px;
}
</style>