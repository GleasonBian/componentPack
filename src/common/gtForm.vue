<template>
  <el-card class="box-card">
    <el-form :model="model" :label-width="labelwidth+'px'" :size="size" :hide-required-asterisk="false"
      :show-message="true" :status-icon="true" :validate-on-rule-change="true" :ref="formName">
      <el-form-item v-for="(item,index) in data" :label="item.label" :key="index" :prop='item.key' :rules="item.rules"
        :show-message="true">

        <!-- 普通文本框 -->
        <el-input v-if="item.type === 'input'" v-model="model[item.key]"
          :placeholder="item.placeholder?item.placeholder:'请输入'+item.label"
          :disabled="item.disabled?item.disabled:false" :style="item.width?'width:'+item.width+'%':'width:'+width+'%'">
        </el-input>

        <!--  下拉选择框 / 单选 -->
        <el-select v-else-if="item.type=='options'" v-model="model[item.key]"
          :placeholder="item.placeholder?item.placeholder:'请选择'+item.label" style="width:100%;"
          :disabled="item.disabled?item.disabled:false" :style="item.width?'width:'+item.width+'%':'width:'+width+'%'">
          <el-option v-for="(opt,optIdx) in item.data" :key="optIdx" :label="opt.label" :value="opt.value">
          </el-option>
        </el-select>

        <!--  多选 -->
        <el-checkbox-group v-else-if="item.type == 'checkbox'" v-model="model[item.key]"
          :disabled="item.disabled?item.disabled:false" :min='item.min' :max='item.max'
          :style="item.width?'width:'+item.width+'%':'width:'+width+'%'">
          <el-checkbox v-for="(che,cheIdx) in item.data" :label="che.label" :checked='che.checked' :name="item.name"
            :key='cheIdx' border></el-checkbox>
        </el-checkbox-group>

        <!-- 时间选择器 -->
        <el-time-picker v-else-if="item.type == 'time'" v-model="model[item.key]" :picker-options="item.pickerOptions"
          value-format='HH:mm:ss' :placeholder="item.placeholder?item.placeholder:'请选择'+item.label"
          :style="item.width?'width:'+item.width+'%':'width:'+width+'%'">
        </el-time-picker>

        <!-- 日期选择器范围 -->
        <el-date-picker v-else-if="item.type === 'date-scope'" v-model="model[item.key]" type="daterange"
          format="yyyy年MM月dd日" value-format='yyyy-MM-dd mm:ss' range-separator="至" start-placeholder="开始日期"
          end-placeholder="结束日期" style="width:100%;" @change="dateChange(model[item.key])"
          :style="item.width?'width:'+item.width+'%':'width:'+width+'%'">
        </el-date-picker>

        <!-- 日期选择器 -->
        <el-date-picker v-else-if="item.type === 'date'" v-model="model[item.key]" type="date" format="yyyy 年 MM 月 dd 日"
          value-format='yyyy-MM-dd mm:ss' style="width:100%;" placeholder="选择日期"
          :style="item.width?'width:'+item.width+'%':'width:'+width+'%'">
        </el-date-picker>

        <!-- switch 开关 -->
        <el-switch v-else-if="item.type === 'switch'" v-model="model[item.key]"
          :active-color="item.activeColor?item.activeColor:'#13ce66'"
          :inactive-color="item.inactiveColor?item.inactiveColor:'#ff4949'"
          :active-value="item.activeValue?item.activeValue:1" :inactive-value="item.inactiveValue?item.inactiveValue:0"
          :activeText='item.activeText' :inactiveText='item.inactiveText'>
        </el-switch>

        <!-- 单图上传 -->
        <el-upload v-else-if="item.type === 'singleImg'"
          class="upload-img"
          :action="item.action?item.action: process.env.API_HOST+'/material/fileUpload/uploadImage'"
          :name="item.name?item.name:'imageFile'" :show-file-list="false" accept="image/*"
          :on-success="singleImageSuccess" :before-upload="beforeImageUpload" :on-error="uploadError"
          :headers="headers">
          <img v-if="model[item.key]" :src="'http://file.sjgtw.com/'+item.default" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>

        <!-- 多图上传 -->
        <div v-else-if="item.type === 'multiImag'" style="width:100%">
          <el-upload list-type="picture-card" accept="image/*" :multiple="true" :limit='item.limit ? item.limit : 5'
            :file-list="model[item.key]"
            :action="item.action?item.action: process.env.API_HOST+'/material/fileUpload/uploadImage'"
            :name="item.name?item.name:'imageFile'" :headers="headers" :before-upload="beforeImageUpload"
            :on-error="uploadError" :on-preview="handlePictureCardPreview" :on-remove="handleRemove"
            :on-success="multiImageSuccess">
            <i class="el-icon-plus"></i>
          </el-upload>
        </div>

        <!-- 文件上传 -->
        <div  v-else-if="item.type === 'file'"  :style="item.width?'width:'+item.width+'%':'width:'+width+'%'">
              <el-upload
          :limit='item.limit ? item.limit : 5'
          :action="item.action?item.action: process.env.API_HOST+'/wxsupplier/relatedFile/documentUpload'"
          :headers="headers" 
          :before-upload="beforeFileUpload" 
          :on-error="uploadError" 
          :on-success="FileUploadSuccess"
          :file-list="model[item.key]">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传word,excel,ppt,txt文件，且不超过2M</div>
        </el-upload>
        </div>
    

        <!-- 可编辑tag -->
        <div v-else-if="item.type === 'tag'" :style="item.width?'width:'+item.width+'%':'width:'+width+'%'">
          <el-tag class="new-tag" :key="tag" v-for="tag in model[item.key]" closable :disable-transitions="false"
            @close="handleClose(tag)">
            {{tag}}
          </el-tag>
          <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" :ref="item.ref" size="small"
            @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm"></el-input>
          <el-button v-else class="button-new-tag" size="small" type="primary" @click="showInput">点击添加</el-button>
        </div>

        <!-- 富文本编辑器 -->
        <el-tabs v-else-if="item.type === 'editor'" type="border-card" v-model="activeName"
          :style="item.width?'width:'+item.width+'%':'width:'+width+'%'">
          <el-tab-pane label="PC端" name="PC" :disabled="item.disabled=='PC' ? true:false">
            <el-upload class="avatar-uploader-PC" :action="item.action" :name="item.name?item.name:'imageFile'"
              :show-file-list="false" :on-success="uploadSuccess" :on-error="uploadError" :before-upload="beforeUpload">
            </el-upload>
            <quill-editor v-model="model[item.key].PC" ref="QuillEditorPC" :options="editorOptionPC"
              @change="onEditorChange($event)" style="height:500px" v-loading='quillUpdateImg'>
            </quill-editor>
          </el-tab-pane>
          <el-tab-pane label="MB端" name="MB" :disabled="item.disabled=='MB' ? true:false">
            <el-upload class="avatar-uploader-MB" :action="item.action" :name="item.name?item.name:'imageFile'"
              :show-file-list="false" :on-success="uploadSuccess" :on-error="uploadError" :before-upload="beforeUpload">
            </el-upload>
            <quill-editor v-model="model[item.key].MB" ref="QuillEditorMB" :options="editorOptionMB"
              @change="onEditorChange($event)" style="height:500px" v-loading='quillUpdateImg'>
            </quill-editor>
          </el-tab-pane>
        </el-tabs>

        <!-- 级联 地址 单选 -->
        <el-cascader v-else-if="item.type === 'areaRadio'" :options="areaRadio" v-model="model[item.key]"
          :change-on-select='false' filterable placeholder="搜索 或 选择" clearable
          :style="item.width?'width:'+item.width+'%':'width:'+width+'%'">
        </el-cascader>

        <!-- 级联 地址 多选 -->
        <div v-else-if="item.type === 'areaMulti'" :style="item.width?'width:'+item.width+'%':'width:'+width+'%'"
          class="area-multi">
          <el-cascader :options="areaMulti" v-model="areaData" :change-on-select='false' @change='areaChange' filterable
            placeholder="搜索 或 选择" clearable style="width:95%;margin-right:5px">
          </el-cascader>
          <el-badge :value="model[item.key].length" :max="99">
            <el-button @click="areaDialog = true">已选区域</el-button>
          </el-badge>
          <el-dialog :visible.sync="areaDialog" title='已选区域' width='25%' top='5vh' center>
            <el-table :data='model[item.key]' size='small' border :fit="true" :show-header='true' style="width: 100%">
              <el-table-column type="index" label="序号" align='center' header-align='center'></el-table-column>
              <el-table-column prop='text' label="区域" align='center' header-align='center'></el-table-column>
              <el-table-column label="操作" width="50" align='center' header-align='center'>
                <template slot-scope="scope">
                  <el-button @click.native.prevent="deleteAreaRow(scope.$index, model[item.key])" type="text"
                    size="small"> 删除 </el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-dialog>
        </div>

        <!-- 富文本框 -->
        <el-input
          v-else-if="item.type === 'textarea'"
          type="textarea"
          :autosize="item.autosize"
          :placeholder="item.placeholder?item.placeholder:'请输入'+item.label"
          v-model="model[item.key]"
          :style="item.width?'width:'+item.width+'%':'width:'+width+'%'">
        </el-input>

        <!-- 属性项与值添加 -->
        <div v-else-if="item.type === 'attribute'" :style="item.width?'width:'+item.width+'%':'width:'+width+'%'" class="tooltip-box">
          <el-tooltip :content="item.data.attrKey.content" placement="top" :value="tooltipKey" :manual='true'>
            <el-input v-model="attr.key" :placeholder="item.data.attrKey.placeholder"></el-input>
          </el-tooltip>
          -
          <el-tooltip :content="item.data.attrVal.content" placement="top" :value="tooltipVal" :manual='true'>
            <el-input  v-model="attr.val" :placeholder="item.data.attrVal.placeholder"></el-input>
          </el-tooltip>
          <el-popover
            placement="right"
            width="400"
            trigger="hover">
            <el-table :data="model[item.key]">
              <el-table-column type='index' label="序号" align='center' header-align="center"></el-table-column>
              <el-table-column prop="key" label="属性项" align='center' header-align="center"></el-table-column>
              <el-table-column prop="val" label="属性值" align='center' header-align="center"></el-table-column>
              <el-table-column label="操作" width="50" align='center' header-align='center'>
                  <template slot-scope="scope">
                    <el-button @click.native.prevent="deleteAreaRow(scope.$index, model[item.key])" type="text"
                      size="small"> 删除 </el-button>
                  </template>
              </el-table-column>
            </el-table>
            <el-button @click="attrHandle" type="success" icon="el-icon-plus" slot="reference" circle></el-button>
          </el-popover>
          
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(formName)">{{submitText}}</el-button>
        <el-button @click="resetForm(formName)">重置</el-button>
      </el-form-item>
    </el-form>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </el-card>
</template>

<script>
  const toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'], // toggled buttons
    ['blockquote', 'code-block'],

    [{
      'header': 1
    }, {
      'header': 2
    }],

    [{
      'list': 'ordered'
    }, {
      'list': 'bullet'
    }],

    [{
      'script': 'sub'
    }, {
      'script': 'super'
    }],

    [{
      'indent': '-1'
    }, {
      'indent': '+1'
    }],

    [{
      'direction': 'rtl'
    }],

    [{
      'size': ['small', false, 'large', 'huge']
    }],

    [{
      'header': [1, 2, 3, 4, 5, 6, false]
    }],

    [{
      'color': []
    }, {
      'background': []
    }],

    [{
      'font': []
    }],

    [{
      'align': []
    }],
    ['image'], //'link',, 'video'                // 图片 链接 视频
    ['clean'] // 删除格式化按钮
  ]
  import {
    regionDataPlus,
    regionData,
    TextToCode,
    CodeToText
  } from "element-china-area-data";
  export default {
    name: '',
    components: {},
    data() {
      return {
        model: {},
        attr:{
          key:'',
          val:''
        },
        tooltipKey:false,
        tooltipVal:false,
        headers: {
          'supplierToken': sessionStorage['suppliertoken']
        },
        imageUrl: '',
        dialogImageUrl: '',
        dialogVisible: false,
        // 标签
        inputVisible: false,
        inputValue: '',
        activeName: '',
        /**
         * 富文本 编辑器
         */
        quillUpdateImg: false, // 富文本编辑器 - 图片上传时的 loading 动画开关
        editorOptionPC: {
          placeholder: '', // 占位符
          theme: 'snow', // or 'bubble'
          modules: {
            toolbar: {
              container: toolbarOptions, // 工具栏
              handlers: {
                'image': function (value) {
                  if (value) {
                    // 触发input框选择图片文件
                    document.querySelector('.avatar-uploader-PC input').click()
                  } else {
                    this.quill.format('image', false);
                  }
                }
              }
            }
          }
        },
        editorOptionMB: {
          placeholder: '', // 占位符
          theme: 'snow', // or 'bubble'
          modules: {
            toolbar: {
              container: toolbarOptions, // 工具栏
              handlers: {
                'image': function (value) {
                  if (value) {
                    // 触发input框选择图片文件
                    document.querySelector('.avatar-uploader-MB input').click()
                  } else {
                    this.quill.format('image', false);
                  }
                }
              }
            }
          }
        },
        /**
         * 地址 选择
         */
        areaMulti: regionDataPlus, // 区域选择数据
        areaRadio: regionData,
        areaData: [], // 当前选择 区域
        areaTS: [],
        areaDialog: false,
      };
    },
    props: {
      data: {
        type: Array,
        default: () => {
          return []
        },
        required: true
      },
      labelwidth: {
        type: String,
        default: '80px',
      },
      size: {
        type: String,
        default: '',
      },
      width: {
        type: Number,
        default: 100
      },
      formName: {
        type: String,
        required: true,
      },
      submitText:{
        type:String,
        default:'确认'
      }
    },
    computed: {},

    watch: {
    },

    methods: {
      /**
       * 提交按钮  表单验证
       */
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$bus.emit('submit',this.model)
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      /*
       ** 填入表单 重置
       */
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.imageUrl = ''
      },
      /**
       **  日期范围 回调
       **/
      dateChange(val) {
        console.log(val);
      },
      /**
       *  单图上传 前 处理函数
       */
      beforeImageUpload(file) {
        const isJPG = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif';
        const isLt2M = file.size / 500 / 500 < 2;
        if (!isJPG) {
          this.$message.error('图片只能是 JPG,png,gif 格式!');
        }
        if (!isLt2M) {
          this.$message.error('图片尺寸500*500, 小于 2MB!');
        }
        return isJPG && isLt2M;
      },
      /**
       *  单图上传 成功 处理函数
       */
      singleImageSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
        this.$message.success(res.message);
        this.$props.data.map(item => {
          if (item.type === 'singleImg') {
            this.model[item.key] = res.data.filePath;
          }
        })
      },
      /**
       *  单图上传 错误 处理函数
       */
      uploadError() {
        this.quillUpdateImg = false
        this.$message.error("上传失败");
      },
      /**
       * 图片上传 移除
       */
      handleRemove(file,fileList) {
        console.log("file",file);
        let key = null;
        this.$props.data.map(item => {
          if (item.type === 'multiImag') {
            key = item.key;
          }
        })
        this.model[key].map((item, index) => {
          if (item.filePath === file.filePath) {
            this.model[key].splice(index, 1);
          }
        })
      },
      /**
       *  图片 查看
       */
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
        
      /**
       *  多图上传成功
       */
      multiImageSuccess(res, file, fileList) {
        let key = null;
        this.$props.data.map(item => {
          if (item.type === 'multiImag') {
            key = item.key;
          }
        })
        this.model[key].push({
          name: file.name,
          filePath: file.response.data.filePath,
          url: file.url,
          imageType: 0,
        })
      },
      /**
       * 文件 上传 前 
       */
      beforeFileUpload(file) {
        console.log(file.type);
        const isJPG = file.type === 'application/vnd.ms-excel' ||
          file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
          file.type === 'text/plain' ||
          file.type === 'application/vnd.ms-powerpoint' ||
          file.type === 'application/vnd.openxmlformats-officedocument.presentationml.presentation' ||
          file.type === 'application/msword' ||
          file.type === 'application/pdf';
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isJPG) {
          this.$message.error('文件必须是 excel,world,ppt,txt 文件!');
        }
        if (!isLt2M) {
          this.$message.error('文件 小于 2MB!');
        }
        return isJPG && isLt2M;
      },
      /**
       * 文件 上传成功
       */
      FileUploadSuccess(res,file,fileList) {
        this.fileList.push({
          name: file.name,
          filePath: file.response.data.filePath,
          url: file.url,
          imageType: 0,
        })
        let data = JSON.parse(JSON.stringify(this.fileList))
        data.map(item => {
          delete item.name;
          delete item.url;
          delete item.status;
          delete item.uid;
        })
        this.$props.data.map(item => {
          if (item.type === 'file') {
            this.$set(this.model, item.key, data);
          }
        })
      },
      /**
       * 关闭标签
       */
      handleClose(tag) {
        let key = '';
        this.$props.data.map(item => {
          if (item.type === 'tag') {
            key = item.key;
          }
        })
        this.model[key].splice(this.model[key].indexOf(tag), 1);
      },
      /**
       * 显示输入框
       */
      showInput() {
        let ref = null;
        this.$props.data.map(item => {
          if (item.type === 'tag')
            ref = item.ref;
        })
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs[ref][0].$refs.input.focus();
        });
      },
      /**
       * 输入确认
       */
      handleInputConfirm() {
        let key = '';
        this.$props.data.map(item => {
          if (item.type === 'tag') {
            key = item.key;
          }
        })
       
        let inputValue = this.inputValue;
        if (inputValue !== '') {
          if ( this.model[key].indexOf(inputValue) == -1) {
             this.model[key].push(inputValue);
          } else
            this.$message.warning(this.inputValue + ' 已存在')
        }
        this.inputVisible = false;
        this.inputValue = '';
      },
      /**
       * 富文本 
       */
      onEditorChange({
        editor,
        html,
        text
      }) { //内容改变事件
        if (this.activeName == 'PC') {
          this.contentPC = html
        } else {
          this.contentMB = html
        }
      },
      /**
       *  富文本 图片上传前
       */
      beforeUpload(file) { // 富文本图片上传前
        // loading动画 开
        this.quillUpdateImg = true
        const isJPG = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif';
        const isLt2M = file.size / 1024 / 1024 < 1;
        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG,png,gif 格式!');
        }
        if (!isLt2M) {
          this.$message.error('图片尺寸500*500, 小于 1MB!');
        }
        return isJPG && isLt2M;
      },
      /**
       * 富文本 图片 上传成功
       */
      uploadSuccess(res, file) { // 图片上传成功
        let quill = null
        if (this.activeName == 'PC') {
          quill = this.$refs.QuillEditorPC[0].quill;
        } else {
          quill = this.$refs.QuillEditorMB[0].quill
        }
        this.$message.success('上传成功')
        if (res.result) {
          // 获取光标所在位置
          let length = quill.getSelection().index;
          // 插入图片  res.url为服务器返回的图片地址
          quill.insertEmbed(length, 'image', 'http://file.sjgtw.com' + res.data.filePath)
          // 调整光标到最后
          quill.setSelection(length + 1)
        } else {
          this.$message.error('图片插入失败')
        }
        // loading动画消失
        this.quillUpdateImg = false
      },
      /**
       * area 多选处理
       */
      areaChange(value) {
        //  将 数组 进行 深度拷贝 防止影响页面显示
        let newVal = JSON.parse(JSON.stringify(value))
        if (newVal.length === 1) newVal[newVal.length - 1] = 'all'
        if (newVal.length > 1 && newVal[newVal.length - 1] === '') newVal[newVal.length - 1] = 'own'
        // 将 暂存数据 和 当前数据 转换为字符串 
        let area = newVal.toString();
        let areaTS = this.areaTS.toString();


        /**
         * 下面注释代码:
         * 在 选择全部选项 时 不允许 添加 其他 区域 时 打开注释 存在 bug
         */
        // if (newVal[newVal.length - 1] === 'all' || areaTS.indexOf('all') > -1) {
        //   this.$confirm("'全部'包含所有区域,将不能再添加其他区域,已选区域将清空,仅保留'全部'选项!", '警告', {
        //     confirmButtonText: '确定',
        //     cancelButtonText: '取消',
        //     type: 'warning'
        //   }).then(() => {
        //     this.areaTS.length = 0;
        //     this.$props.data.map(item => {
        //       if (item.type === 'areaMulti') {
        //         this.model[item.key].length = 0;
        //         this.model[item.key].push({
        //           text: '全部',
        //           code: 'all'
        //         })
        //       }
        //     })
        //   }).catch(() => {
        //     this.$message.info('已取消选择"全部"')
        //   });
        //   return;
        // }

        //  在 暂存数据 中查找 当前数据 
        if (areaTS.indexOf(area) === -1) {
          let str = ''
          for (let i in value) {
            str += CodeToText[value[i]] + "-";
          }

          this.areaTS.push(newVal);

          this.$props.data.map(item => {
            if (item.type === 'areaMulti') {
              this.model[item.key].push({
                text: str.slice(0, str.length - 1),
                code: newVal.join("-")
              });
            }
          })
          str = null;
        } else {
          this.$message.warning('该区域已存在')
        }
      },
      /**
       * area 多选删除
       */
      deleteAreaRow(index, rows) {
        rows.splice(index, 1);
        this.areaTS.splice(index, 1);
        this.areaData.length = 0;
      },
      /**
       * 普通级联选择器 
       */
      activeCascadeChange(val){
        this.$emit('active-item-change', val);
      },
      /**
       * 普通级联选择器 Change 事件
       */
      cascaderChange(val){
        this.$emit('cascaderChange',val)
      },
      /**
       * 属性项 值 处理
       */
      attrHandle(){
        let attrData = null;
        let option = null;
        this.$props.data.map(item => {
          if (item.type === 'attribute') {
            option = item.data;
            attrData = this.model[item.key]
          }
        })
        
        if(option.attrKey.RegExp.test(this.attr.key)){
           this.tooltipKey = false;
        }else{
          this.tooltipKey = true;
          return;
        }

        if(option.attrVal.RegExp.test(this.attr.val)){
          this.tooltipVal = false;
        }else{
          this.tooltipVal = true;
          return;
        }
        if (attrData.indexOf(this.attr) === -1){
          attrData.push(JSON.parse(JSON.stringify(this.attr)));
          this.attr.key = '';
          this.attr.val = '';
        }else{
          this.$message.warning('该值已存在')
        }
      }
    },
    /**
     * 
     * 生命周期
     *
     */
    created() {
      this.$props.data.map(item => {
        switch (item.type){
          case 'checkbox' :  this.$set(this.model, item.key, item.default?item.default:[]);
            break;
          case 'date-scope' :  this.$set(this.model, item.key, item.default?item.default:[]);
            break;
          case 'attribute' :   this.$set(this.model, item.key, item.default?item.default:[]);
            break;
          case 'areaMulti':  this.$set(this.model, item.key, item.default?item.default:[]);
            break;
          case 'areaRadio': this.$set(this.model, item.key, item.default?item.default:[]);
            break;
          case 'tag': if(Object.prototype.toString.call(item.default) === '[object Array]'){
                          this.$set(this.model, item.key, item.default?item.default:[]);
                        }else if(Object.prototype.toString.call(item.default) === '[object String]'){
                          let ary = item.default.split(",")
                          this.$set(this.model, item.key,ary);
                        }
            break;
          case 'file': {
                          if(item.default.length === 0 || !item.default){
                            this.$set(this.model, item.key, item.default?item.default:[]);
                            return;
                          }
                          item.default.map(img=>{
                            img.url = 'http://file.sjgtw.com/' + img.filePath;
                          })
                          this.$set(this.model, item.key, item.default?item.default:[]);
                        }
            break;
          case 'multiImag' : {
                              if(item.default.length === 0 || !item.default){
                                 this.$set(this.model, item.key, item.default?item.default:[]);
                                 return;
                              }
                              item.default.map(img=>{
                                img.url = 'http://file.sjgtw.com/' + img.filePath;
                              })
                              this.$set(this.model, item.key, item.default?item.default:[]);
                            }
            break;
          case 'editor' : {
                            this.$set(this.model, item.key,  item.default?item.default:{
                              MB:'',
                              PC:''
                            });
                            if (item.disabled)
                              item.disabled == 'PC' ? this.activeName = 'MB' : this.activeName = 'PC'
                            else
                              this.activeName = 'PC'
                          }
            break;
          default :  this.$set(this.model, item.key, item.default?item.default:'');
        }
      })
    },
    mounted() {

    }
  }
</script>
<style scoped>
  .box-card {
    width: 100%;
  }

  /* 单图上传 */
  .upload-img {
    width: 148px;
    height: 148px;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    background-color: #fbfdff;
  }

  .upload-img:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 148px;
    height: 148px;
    line-height: 148px;
    text-align: center;
  }

  .avatar {
    width: 148px;
    height: 148px;
    display: block;
  }

  /* 标签 */
  .button-new-tag {
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }

  .input-new-tag {
    width: 80px;
    vertical-align: bottom;
  }

  .new-tag {
    margin-right: 10px;
  }

  .avatar-uploader-PC,
  .avatar-uploader-MB {
    height: 0px;
    line-height: 0px;
  }

  .area-multi {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
  }

  /* 属性项值 添加 悬浮提示 */
  .tooltip-box{
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
  }
</style>