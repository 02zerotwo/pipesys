<template>

  <!-- 新增用户 -->
  <el-dialog v-model="visible"
             :title="title"
             @close="close">
      <el-form ref="ruleForm"
               :model="ruleForm"
               :rules="rules"
               label-width="120px">
        <el-row>
          <el-col :span="11">
            <el-form-item label="用户名:"
                          prop="username">
              <el-input v-model="ruleForm.username"
                        placeholder="请输入用户名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="角色名:">
              <el-select v-model="roles"
                         multiple
                         placeholder="请选择角色名">
                <el-option v-for="item in options"
                           :key="item.id"
                           :label="item.ext"
                           :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="手机号:"
                          prop="phone">
              <el-input v-model="ruleForm.phone"
                        placeholder="请输入手机号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="部门:">
              <el-select v-model="o"
                         placeholder="请选择部门">
                <el-option v-for="item in org"
                           :key="item.id"
                           :label="item.name"
                           :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
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
import { addUser, getAllRole, getAllOrgs, getAllUserByName } from '@/api/api.js'
import { ElMessage } from 'element-plus'
export default {
  components: {},

  data () {
    return {
      visible: false,
      disabled: false,
      title: '',
      ruleForm: {
        // 表单的属性要对应数据的字段,目前没有进行驼峰转换处理
        id: '',
        username: '',
        roles: [],
        password: '',
        phone: '',
      },
      roles: [],
      o: '',
      org: [],
      options: [],
      // 表单验证
      rules: {
        username: [
          {
            required: true,
            message: '用户名不能为空',
            trigger: 'blur',
          },
          {
            validator: this.validateUsername,
          },
        ],
        phone: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          { min: 11, max: 11, message: '请输入11位手机号码', trigger: 'blur' },
          {
            pattern:
              /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/,
            message: '请输入正确的手机号码',
          },
        ],
      },
    }
  },

  computed: {},

  methods: {
    async add (record) {
      this.visible = true
      await getAllRole({ roleName: '', pageNo: 1, pageSize: 100 }).then(
        (res) => {
          this.options = res.data.list
        }
      )
      await getAllOrgs({ orgName: '', pageNo: 1, pageSize: 100 }).then(
        (res) => {
          this.org = res.data.list
        }
      )
      this.$nextTick(() => {
        // 待dom生成以后再来获取dom对象
        // 用来编辑给输入框赋予初始值
        this.$refs.ruleForm.resetFields() // 对整个表单进行重置，将所有字段值重置为初始值并移除校验结果
      })
    },
    handleOk () {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          let params = this.ruleForm
          params.roleIdArrays = this.roles
          params.orgaId = this.o
          console.log(params)
          addUser(params).then((res) => {
            ElMessage({
              message: '用户添加成功!',
              type: 'success',
            })
            this.$emit('ok')
            this.close()
          })
        } else {
          return false
        }
      })
    },
    validateUsername (rule, value, callback) {
      let params = {
        name: value,
      }
      getAllUserByName(params).then((res) => {
        if (res.data) {
          callback()
        } else {
          callback('用户已存在')
        }
      })
    },
    close () {
      this.visible = false
      this.roles = []
      this.o = ''
    },
  },
}
</script>
<style lang='less'>
</style>
