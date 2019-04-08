<template>
  <el-autocomplete 
    v-model="state" 
    :fetch-suggestions="querySearchAsync" 
    :placeholder="autocomplete.placeholder" 
    :disabled='autocomplete.disabled' 
    :value-key = 'autocomplete.valueKey'
    :placement = 'autocomplete.placement'
    :trigger-on-focus	= 'autocomplete.triggerOnFocus'
    :popper-append-to-body = 'autocomplete.popperAppendToBody'
    @select="handleSelect">
  </el-autocomplete>
</template>

<script>
import autocompleteVue from '../page/autocomplete.vue';
  export default {
    name: '',
    components: {},
    data() {
      return {
        restaurants: [],
        state: '',
        timeout: null
      };
    },
    props:{
      autocomplete:{ }
    },
    computed: {},

    watch: {},

    methods: {
      loadAll() {
        return [
          { "valKey": "三全鲜食（北新泾店）", "address": "长宁区新渔路144号" },
          { "valKey": "Hot honey 首尔炸鸡（仙霞路）", "address": "上海市长宁区淞虹路661号" },
          { "valKey": "新旺角茶餐厅", "address": "上海市普陀区真北路988号创邑金沙谷6号楼113" },
          { "valKey": "泷千家(天山西路店)", "address": "天山西路438号" },
          { "valKey": "胖仙女纸杯蛋糕（上海凌空店）", "address": "上海市长宁区金钟路968号1幢18号楼一层商铺18-101" },
          { "valKey": "贡茶", "address": "上海市长宁区金钟路633号" },
          { "valKey": "豪大大香鸡排超级奶爸", "address": "上海市嘉定区曹安公路曹安路1685号" },
          { "valKey": "茶芝兰（奶茶，手抓饼）", "address": "上海市普陀区同普路1435号" },
          { "valKey": "十二泷町", "address": "上海市北翟路1444弄81号B幢-107" },
          { "valKey": "星移浓缩咖啡", "address": "上海市嘉定区新郁路817号" },
          { "valKey": "阿姨奶茶/豪大大", "address": "嘉定区曹安路1611号" },
          { "valKey": "新麦甜四季甜品炸鸡", "address": "嘉定区曹安公路2383弄55号" },
          { "valKey": "Monica摩托主题咖啡店", "address": "嘉定区江桥镇曹安公路2409号1F，2383弄62号1F" },
          { "valKey": "浮生若茶（凌空soho店）", "address": "上海长宁区金钟路968号9号楼地下一层" },
          { "valKey": "NONO JUICE  鲜榨果汁", "address": "上海市长宁区天山西路119号" },
          { "valKey": "CoCo都可(北新泾店）", "address": "上海市长宁区仙霞西路" },
          { "valKey": "快乐柠檬（神州智慧店）", "address": "上海市长宁区天山西路567号1层R117号店铺" },
          { "valKey": "Merci Paul cafe", "address": "上海市普陀区光复西路丹巴路28弄6号楼819" },
          { "valKey": "猫山王（西郊百联店）", "address": "上海市长宁区仙霞西路88号第一层G05-F01-1-306" },
          { "valKey": "枪会山", "address": "上海市普陀区棕榈路" },
          { "valKey": "纵食", "address": "元丰天山花园(东门) 双流路267号" },
          { "valKey": "钱记", "address": "上海市长宁区天山西路" },
          { "valKey": "壹杯加", "address": "上海市长宁区通协路" },
          { "valKey": "唦哇嘀咖", "address": "上海市长宁区新泾镇金钟路999号2幢（B幢）第01层第1-02A单元" },
          { "valKey": "爱茜茜里(西郊百联)", "address": "长宁区仙霞西路88号1305室" },
          { "valKey": "爱茜茜里(近铁广场)", "address": "上海市普陀区真北路818号近铁城市广场北区地下二楼N-B2-O2-C商铺" },
          { "valKey": "鲜果榨汁（金沙江路和美广店）", "address": "普陀区金沙江路2239号金沙和美广场B1-10-6" },
          { "valKey": "开心丽果（缤谷店）", "address": "上海市长宁区威宁路天山路341号" },
          { "valKey": "超级鸡车（丰庄路店）", "address": "上海市嘉定区丰庄路240号" },
          { "valKey": "妙生活果园（北新泾店）", "address": "长宁区新渔路144号" },
          { "valKey": "香宜度麻辣香锅", "address": "长宁区淞虹路148号" },
          { "valKey": "凡仔汉堡（老真北路店）", "address": "上海市普陀区老真北路160号" },
          { "valKey": "港式小铺", "address": "上海市长宁区金钟路968号15楼15-105室" },
          { "valKey": "蜀香源麻辣香锅（剑河路店）", "address": "剑河路443-1" },
          { "valKey": "北京饺子馆", "address": "长宁区北新泾街道天山西路490-1号" },
          { "valKey": "饭典*新简餐（凌空SOHO店）", "address": "上海市长宁区金钟路968号9号楼地下一层9-83室" },
          { "valKey": "焦耳·川式快餐（金钟路店）", "address": "上海市金钟路633号地下一层甲部" },
          { "valKey": "动力鸡车", "address": "长宁区仙霞西路299弄3号101B" },
          { "valKey": "浏阳蒸菜", "address": "天山西路430号" },
          { "valKey": "四海游龙（天山西路店）", "address": "上海市长宁区天山西路" },
          { "valKey": "樱花食堂（凌空店）", "address": "上海市长宁区金钟路968号15楼15-105室" },
          { "valKey": "壹分米客家传统调制米粉(天山店)", "address": "天山西路428号" },
          { "valKey": "福荣祥烧腊（平溪路店）", "address": "上海市长宁区协和路福泉路255弄57-73号" },
          { "valKey": "速记黄焖鸡米饭", "address": "上海市长宁区北新泾街道金钟路180号1层01号摊位" },
          { "valKey": "红辣椒麻辣烫", "address": "上海市长宁区天山西路492号" },
          { "valKey": "(小杨生煎)西郊百联餐厅", "address": "长宁区仙霞西路88号百联2楼" },
          { "valKey": "阳阳麻辣烫", "address": "天山西路389号" },
          { "valKey": "南拳妈妈龙虾盖浇饭", "address": "普陀区金沙江路1699号鑫乐惠美食广场A13" }
        ];
        // this.axios.post(autocomplete.url,state).then(res=>{
        //   console.log(res);
        // }).catch(err=>{
        //   console.log(err)
        // })
      },
      querySearchAsync(queryString, cb) {
        var restaurants = this.restaurants;
        var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;

        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          cb(results);
        }, 3000 * Math.random());
      },
      createStateFilter(queryString) {
        return (state) => {
          return (state.valKey.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      handleSelect(item) {
        this.$bus.emit('gt-autocomplete',item);
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
      this.restaurants = this.loadAll();
    },
  }
</script>
<style scoped>


</style>