<template>
  <div>
    <head-top></head-top>
    <gt-form :data='fromData' :width="width" formName='form' labelwidth='100' @active-item-change='cascaderHandle' @change="cascaderChange"></gt-form>
  </div>
</template>

<script>
  import headTop from '@/components/headTop'
  export default {
    name: 'fromList',
    components: {
      headTop,
    },
    data() {
      return {
        fromData: [
          {
            type:'input',
            label:'活动名称',
            key:'name',
            placeholder:'', //选填
            default:'输入文字',
            rules:[
              { required: true, message: '请输入活动名称', trigger: 'change' },
              { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'change' }
            ]
          },
          {
            type:'options', // 选填
            label:'活动区域', // 必填
            key:'scope', // 必填
            rules:[  // 选填 
                { required: true, message: '请选择活动区域', trigger: 'change' }
            ],
            default:'one',
            data:[
              {label:'区域一',value:'one'},
              {label:'区域二',value:'two'},
            ]
          },
          {
            type:'checkbox', // 选填
            label:'喜欢的英雄', // 必填
            key:'super', // 必填
            name:'super',
            min:1,
            max:4,
            rules:[  // 选填 
                { required: true, message: '最少1个,最多4个', trigger: 'change' }
            ],
            data:[
              {label:'鲁班七号',checked:false},
              {label:'亚瑟',checked:true},
              {label:'程咬金',checked:false},
              {label:'凯',checked:true},
              {label:'孙悟空',checked:false},
            ]
          },
          {
            type:'time',
            label:'时间',
            key:'time',
            pickerOptions:{
              selectableRange: '03:00:00 - 23:30:00'
            },
            default:new Date(2019, 3, 28, 18, 1),
            placeholder:"任意时间点",
            rules:[  // 选填 
                { required: true, message: '请选择时间', trigger: 'change' }
            ],
          },{
            type:'date-scope',
            label:'日期范围',
            key:'dateScope',
            default:["2019-04-11 00:00","2019-04-12 00:00"],
             rules:[  // 选填 
                { required: true, message: '请选择日期范围', trigger: 'change' }
            ],
          },{
            type:'date',
            label:'日期选择',
            key:'date',
            default:"2019-04-11 00:00",
            rules:[  // 选填 
                { required: true, message: '请选择日期', trigger: 'change' }
            ],
          },{
            type:'switch',
            label:'switch开关',
            key:'switch',
            activeColor:'#13ce66',
            inactiveColor:'#ff4949',
            activeText:'是',
            inactiveText:"否",
            activeValue:1,
            inactiveValue:0,
            default:1,
          },
          {
            type:'singleImg',
            label:'单图上传',
            key:'singleImg',
            action:'/api/material/fileUpload/uploadImage',
            default:'/M00/0C/87/wKgBxFyQa-2ET99JAAAAALpErmE435.jpg',
            rules:[  // 选填 
                { required: true, message: '请上传图片', trigger: 'change' }
            ],
          },
          {
            type:'multiImag',
            label:'多图上传',
            key:'multiImg',
            action:'/api/material/fileUpload/uploadImage',
            limit:5,
            default:[{ filePath: 'M00/0C/D1/wKgBxFyi-IqEUrEUAAAAALpErmE142.jpg',}, { filePath: '/M00/0C/D1/wKgBxFyi-OiEejaWAAAAAGaPstA973.png'}]
          },
          {
            type:'file',
            label:'文件上传',
            key:'fileList',
            default:[{ filePath: 'M00/0C/D1/wKgBxFyi-IqEUrEUAAAAALpErmE142.jpg',}, { filePath: '/M00/0C/D1/wKgBxFyi-OiEejaWAAAAAGaPstA973.png'}],
            action:'/api/wxsupplier/relatedFile/documentUpload',
            limit:5,
            
          },
          {
            type:'tag',
            label:'标签',
            key:'newTag',
            ref:'saveInputValue',
            width:100,
            default:'卞刘著,你好,都什么鬼'
            //  ['卞刘著','你好','顶顶']
          },
          {
            type:'editor',
            label:'富文本',
            key:'editor',
            width:100,
            action:'/api/material/fileUpload/uploadImage',
            // disabled:'MB',
            default:{
              MB:"<p>MB端<img src=\"http://file.sjgtw.com/M00/0C/D2/wKgBxFyjGqqERKSXAAAAANaQ7Dk223.jpg\"></p>",
              PC:"<p>PC端<img src=\"http://file.sjgtw.com/M00/0C/D2/wKgBxFyjGqqERKSXAAAAANaQ7Dk223.jpg\"></p>"
            }
          },
          { // 地址 单选
            type:'areaRadio',
            label:'区域单选',
            key:'areaRadio',
            default:["110000","110100","110101"],
          },
          { // 地址 多选
            type:'areaMulti',
            label:'区域多选',
            key:'areaMulti',
            default:[
              {"text":"北京市-市辖区-东城区","code":"110000-110100-110101"},
              {"text":"北京市-市辖区-朝阳区","code":"110000-110100-110105"}
            ]
          },
          {
            type:'textarea',
            label:'富文本框',
            key:'textarea',
            autosize:{ minRows: 4, maxRows: 8},
            default:'富文本编辑器'
          },
          {
            type:'attribute',
            label:'属性添加',
            key:'attribute',
            data:{
              attrKey:{
                RegExp: /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/,
                content:'中文汉字,2-20个字符',
                placeholder:'请输入姓名'
              },
              attrVal:{
                RegExp:/^1[3|4|5|7|8][0-9]{9}$/,
                content:'手机号码有误',
                placeholder:'请输入手机号'
              }
            }
          }
        ],
        width:50,
      };
    },
    computed: {},

    watch: {},

    methods: {
      cascaderHandle(val){
        console.log(val);
      },
      cascaderChange(val){
        console.log(val);
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