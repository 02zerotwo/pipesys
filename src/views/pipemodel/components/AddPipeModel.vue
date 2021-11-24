<template>

  <!-- 新增管道模型 -->
  <el-dialog v-model="visible"
             :title="title"
             @close="close">
    <el-form ref="dataAddForm"
             :model="formData"
             :rules="rules"
             label-width="120px">
      <el-row>
        <el-col :span="15">
          <el-form-item label="型号编码:"
                        prop="pipeNumber">
            <el-input v-model="formData.pipeNumber"
                      placeholder="请输入型号编码"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="15">
          <el-form-item label="管道名称:"
                        prop="pipeName">
            <el-input v-model="formData.pipeName"
                      placeholder="请输入管道名称"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="15">
          <el-form-item label="管道类型:">
            <el-radio v-model="radio"
                      label="1">单波纹</el-radio>
            <el-radio v-model="radio"
                      label="2">多波纹</el-radio>
          </el-form-item>
        </el-col>
      </el-row>

      <!-- 图片上传 -->
      <el-row>
        <el-col :span="15">
          <el-form-item label="图片:">
            <el-upload action="https://jsonplaceholder.typicode.com/posts/"
                       list-type="picture-card"
                       :on-preview="handlePictureCardPreview">
              <el-icon>
                <i-plus />
              </el-icon>
            </el-upload>
            <el-dialog v-model="dialogVisible">
              <img width="100%"
                   :src="dialogImageUrl"
                   alt="" />
            </el-dialog>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 说明书上传 -->
      <el-row>
        <el-col :span="15">
          <el-form-item label="说明书:"
                        prop="pipeNumber">
            <el-upload class="upload-demo"
                       action="https://jsonplaceholder.typicode.com/posts/"
                       :on-preview="handlePreview"
                       :on-remove="handleRemove"
                       :before-remove="beforeRemove"
                       multiple
                       :limit="3"
                       :on-exceed="handleExceed"
                       :file-list="fileList">
              <el-button type="primary">
                上传说明书
                <i class="el-icon-upload el-icon--right"></i>
              </el-button>
            </el-upload>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 手册上传 -->
      <el-row>
        <el-col :span="15">
          <el-form-item label="指导手册:"
                        prop="pipeNumber">
            <el-upload class="upload-demo"
                       action="https://jsonplaceholder.typicode.com/posts/"
                       :on-preview="handlePreview"
                       :on-remove="handleRemove"
                       :before-remove="beforeRemove"
                       multiple
                       :limit="3"
                       :on-exceed="handleExceed"
                       :file-list="fileList">
              <el-button type="primary">
                上传指导手册
                <i class="el-icon-upload el-icon--right"></i>
              </el-button>
            </el-upload>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row></el-row>
      <el-row></el-row>
      <el-row></el-row>
    </el-form>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="close">取消</el-button>
        <el-button type="primary"
                   @click="handleOk">确认</el-button>
      </span>
    </template>
  </el-dialog>

</template>

<script>
// import { addPipeModel } from '@/api/api.js'
export default {
  components: {},

  data () {
    return {
      radio: '1',//单选框这边的
      visible: false,//添加表单是否可见
      title: '',
      formData: {},//表单数据
      dialogVisible: false,
      dialogImageUrl: '',
      rules: {
        pipeNumber: [
          {
            required: true,
            message: '管道编码不能为空',
            trigger: 'blur'
          }
        ],
        pipeName: [
          {
            required: true,
            message: '管道名称不能为空',
            trigger: 'blur'
          }
        ]
      }
    }
  },

  computed: {},

  methods: {
    //弹出添加窗口
    add () {
      this.edit({})
    },
    edit (record) {
      this.visible = true
      this.$nextTick(() => {
        this.$refs.dataAddForm.resetFields() // 对整个表单进行重置，将所有字段值重置为初始值并移除校验结果
        this.formData = Object.assign({}, record)
      })
    },
    //关闭添加窗口
    close () {
      this.visible = false
      this.resetForm();
    },
    //重置表单
    resetForm () {
      this.formData = {};
    },
    //添加管道模型
    handleOk () {
      // addPipeModel(params, this.formData).then(res => {
      //   this.visible = false;
      //   this.$message.success("添加成功")
      // })
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleRemove (file, fileList) {
      this.dialogVisible = false
    },


  }
}
</script>
<style lang='less'>
</style>
