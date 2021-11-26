<template>
  <div>
    <el-drawer v-model="visible"
               title="编辑机构信息"
               :direction="rtl"
               :before-close="handleClose">
      <el-form ref="ruleForm"
               :model="ruleForm"
               :rules="rules"
               label-width="100px">
        <el-row>
          <el-form-item label="机构编号:"
                        prop="id">
            <el-input v-model="ruleForm.id"
                      disabled></el-input>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="机构名:" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="机构代码:"
                        prop="orgaNumber">
            <el-input v-model="ruleForm.orgaNumber"
                      placeholder="请输入机构代码"></el-input>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="行业类型:">
            <el-select v-model="ruleForm.type.id"
                       placeholder="请选择类型">
              <el-option v-for="item in types"
                         :key="item.id"
                         :label="item.name"
                         :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="机构地址:"
                        prop="location">
            <el-input v-model="ruleForm.location"
                      placeholder="请输入机构地址"></el-input>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="备注:">
            <el-input v-model="ruleForm.ext"
                      placeholder="请添加备注信息"></el-input>
          </el-form-item>
        </el-row>
      </el-form>
      <span class="drawe-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary"
                   @click="handleOk">提交</el-button>
      </span>
    </el-drawer>
  </div>
</template>

<script>
import { getAllType, editOrg } from '@/api/api.js'
import { ElMessage } from 'element-plus'

export default {
  components: {},

  data() {
    return {
      visible: false,
      ruleForm: {
        // 表单的属性要对应数据的字段,目前没有进行驼峰转换处理
        id: '',
        name: '',
        type: {
          id: '',
        },
        location: '',
        orgaNumber: '',
        ext: '',
      },
      types: [],
      // 表单验证
      rules: {
        name: [
          { required: true, message: '机构名称不可为空', trigger: 'blur' },
        ],
        location: [
          { required: true, message: '地址不可为空', trigger: 'blur' },
        ],
        orgaNumber: [
          { required: true, message: '机构代码不可为空', trigger: 'blur' },
        ],
      },
    }
  },

  computed: {},

  methods: {
    async edit(record) {
      console.log(record)
      this.visible = true
      await getAllType().then((res) => {
        this.types = res.data.list
      })
      this.ruleForm = Object.assign({}, record)
      console.log(this.ruleForm)
    },
    handleOk() {
      const params = this.ruleForm
      editOrg(params).then((res => {
        ElMessage({
          message: '修改成功',
          type: 'success'
        })
        this.$emit('ok')
        this.handleClose()
      }))
    },
    handleClose() {
      this.visible = false
    },
  },
}
</script>
<style lang='less'>
.el-input {
  width: 226.4px;
}
.drawe-footer {
  width: 100%;

  position: absolute;

  bottom: 0;

  left: 0;

  border-top: 1px solid #e8e8e8;

  padding: 10px 16px;

  text-align: right;

  background-color: white;
}
</style>
