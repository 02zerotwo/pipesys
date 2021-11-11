<template>
  <div>
    <el-form ref="ruleForm"
             :model="ruleForm"
             :rules="rules"
             label-width="100px">
      <el-row>
        <el-form-item label="菜单名称:"
                      prop="ext">
          <el-input v-model="ruleForm.ext"
                    placeholder="请输入菜单名称"></el-input>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="权限名称:"
                      prop="name">
          <el-input v-model="ruleForm.name"
                    placeholder="请输入权限名称"></el-input>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="菜单路径:"
                      prop="path">
          <el-input v-model="ruleForm.path"
                    placeholder="请输入菜单路径"></el-input>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="菜单图标:">
          <el-input v-model="ruleForm.icon"
                    placeholder="请输入菜单图标"></el-input>
        </el-form-item>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import { addPerm, eidtPerm } from '@/api/api.js'
import { ElMessage } from 'element-plus'
export default {
  components: {

  },
  data () {
    return {
      ruleForm: { // 表单的属性要对应数据的字段,目前没有进行驼峰转换处理
        id: '',
        ext: '',
        name: '',
        path: '',
        phone: '',
        icon: ''
      },
      pid: '',
      addoreditFlag: {},
      // 表单验证
      rules: {
        ext: [
          {
            required: true,
            message: '菜单名称不能为空',
            trigger: 'blur'
          }
        ],
        name: [
          { required: true, message: '权限名称不能为空', trigger: 'blur' }
        ],
        path: [
          { required: true, message: '菜单路径不能为空', trigger: 'blur' }
        ]
      }
    }

  },

  computed: {},

  methods: {
    add () {
      this.edit({})
    },
    edit (record) {
      this.$refs.ruleForm.resetFields() // 对整个表单进行重置，将所有字段值重置为初始值并移除校验结果
      this.ruleForm = Object.assign({}, record)
      this.addoreditFlag = record
      this.pid = record.parentId
    },
    handleOk () {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          let params = this.ruleForm
          params.parentId = 0
          if (Object.keys(this.addoreditFlag).length == 0) {

            addPerm(params).then(res => {
              ElMessage({
                message: '用户添加成功!',
                type: 'success'
              })
              this.$emit('ok')
            })
          } else {

            params.parentId = this.pid
            eidtPerm(params).then(res => {
              ElMessage({
                message: '用户修改成功!',
                type: 'success'
              })
              this.$emit('ok')
            })
          }


        } else {
          return false
        }
      })
    },
  }
}
</script>
<style lang='less' >
</style>
