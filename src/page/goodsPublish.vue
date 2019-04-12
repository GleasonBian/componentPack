<template>
<div>
  <gt-form :data='fromData' formName="goodsPublish" :width="30" labelwidth='100' submitText='提交' ref='DDDDDD'></gt-form>
</div>
</template>

<script>
  import { saveAdminUser } from '@/api/getData'
  export default {
    name: 'goodsPublish',
    components: {},
    data() {
      return {
        fromData: [
          {
            type:'input',
            label:'登录账号',
            key:'userName',
            placeholder:'', //选填
            default:'13022222233',
            rules:[
              { required: true, message: '请输入用户账号', trigger: 'change' },
              { min: 10, max: 11, message: '长度在11个字符', trigger: 'change' }
            ]
          },
          {
            type:'input',
            label:'用户用邮箱',
            key:'mail',
            placeholder:'', //选填
            default:'1@q.com',
            rules:[
              { required: true, message: '用户邮箱', trigger: 'change' },
              { min: 3, max: 20, message: '长度在 3 到 5 个字符', trigger: 'change' }
            ]
          },
          {
            type:'password',
            label:'登录密码',
            key:'password',
            default:'gleason',
            rules:[
              { required: true, message: '请输入用户账号', trigger: 'change' },
              { min: 3, max: 20, message: '长度在 3 到 5 个字符', trigger: 'change' }
            ]
          },
          {
            type:'checkPwd',
            label:'确认密码',
            key:'checkPwd',
            placeholder:'', //选填
            default:'gleason',
            rules: {
              validator: (rule, value, callback) => { // 验证 确认密码
                          if (value === '') {
                            callback(new Error('请再次输入密码'));
                          } else if (value !== this.$refs.DDDDDD.model.password) {
                            callback(new Error('两次输入密码不一致!'));
                          } else {
                            callback();
                          }
                        },
              trigger: ['blur', 'change']
            },
          },
          {
            type:'input',
            label:'用户姓名',
            key:'name',
            placeholder:'', //选填
            default:'卞刘著',
            rules:[
              { required: true, message: '用户姓名', trigger: 'change' },
              { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'change' }
            ]
          },
          {
            type:'options', // 选填
            label:'用户性别', // 必填
            key:'sex', // 必填
            rules:[  // 选填 
                { required: true, message: '用户性别', trigger: 'change' }
            ],
            default:'0',
            data:[
              {label:'男',value:'1'},
              {label:'女',value:'0'},
            ]
          },
          {
            type:'dept', // 选填
            label:'部门名称', // 必填
            key:'deptIds', // 必填
            rules:[  // 选填 
                { required: true, message: '用户性别', trigger: 'change' }
            ],
            default:[1,105269335249000],
          },
          {
            type:'options', // 选填
            label:'用户状态', // 必填
            key:'state', // 必填
            rules:[  // 选填 
                { required: true, message: '用户性别', trigger: 'change' }
            ],
            default:'0',
            data:[
              {label:'正常',value:'0'},
              {label:'禁用',value:'1'},
            ]
          },
          {
            type:'options', // 选填
            label:'用户职位', // 必填
            key:'position', // 必填
            rules:[  // 选填 
                { required: true, message: '用户性别', trigger: 'change' }
            ],
            default:'CEO',
            data:[
              {label:'总经理',value:'CEO'},
              {label:'副总',value:'CEO'},
              {label:'总监',value:'sco'},
              {label:'经理',value:'ceo'},
              {label:'员工',value:'ooo'},
            ]
          },
          {
            type:'date',
            label:'入职时间',
            key:'entryTime',
            default:"",
            rules:[  // 选填 
                { required: true, message: '请选择日期', trigger: 'change' }
            ],
          }
        ],
      };
    },
    computed: {},

    watch: {},

    methods: {
      async userHandle(val){
        delete val.checkPwd;
        val.deptId = val.deptIds[val.deptIds.length-1]
        const res = await saveAdminUser(val);
        if(res.result){
          this.$message.success(res.message);
          this.$router.push('/userList')
        }else{
          this.$message.warning(res.message);
        }
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
      this.$bus.on('submit',this.userHandle)
    },
  }
</script>
<style scoped>


</style>