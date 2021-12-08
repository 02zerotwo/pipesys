<template>
  <!-- 个人信息 -->
  <el-dialog v-model="visible"
             :title="title"
             @close="close"
             :center="true">
    <el-form ref="ruleForm"
             :model="ruleForm"
             :rules="rules"
             label-width="120px">
      <el-row>
        <el-col :span="6"></el-col>
        <el-col :span="12">
          <el-form-item label="请输入旧密码:"
                        prop="old_pwd">
            <el-input v-model="ruleForm.old_pwd"
                      placeholder="请输入旧密码"
                      type="password"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6"></el-col>
      </el-row>
      <el-row>
        <el-col :span="6"></el-col>
        <el-col :span="12">
          <el-form-item label="请输入新密码:"
                        prop="new_pwd">
            <el-input v-model="ruleForm.new_pwd"
                      placeholder="请输入新密码"
                      type="password"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6"></el-col>
      </el-row>
      <el-row>
        <el-col :span="6"></el-col>
        <el-col :span="12">
          <el-form-item label="请确认密码:"
                        prop="confirm_pwd">
            <el-input v-model="ruleForm.confirm_pwd"
                      placeholder="再次输入新密码"
                      type="password">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6"></el-col>
      </el-row>
      <!-- 占位空白符 后续可以直接 在里面添加元素 -->
      <el-row>&nbsp; </el-row>
      <el-row>&nbsp; </el-row>
      <el-row>&nbsp; </el-row>
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
import { modifyPwd } from '@/api/api.js'
import { ElMessage } from 'element-plus'
export default {
  data () {
    return {
      visible: false,
      userInfo: { id: '', Pwd: '' },
      title: '',
      ruleForm: {
        // 表单的属性要对应数据的字段,目前没有进行驼峰转换处理
        old_pwd: '',
        new_pwd: '',
        confirm_pwd: '',
      },
      // 表单验证
      rules: {
        old_pwd: [
          {
            required: true,
            message: '旧密码不可为空',
            trigger: 'blur',
          },
          {
            validator: this.verifyOldPwd,
          },
        ],
        new_pwd: [
          {
            required: true,
            message: '新密码不可为空',
            trigger: 'blur',
          },
          {
            validator: this.verifyNewPwd,
          },
          {
            pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,18}$/,
            message: '密码须包含数字、字母两种元素，且密码位数为6-16位',
          },
        ],
        confirm_pwd: [
          {
            required: true,
            message: '确认密码不可为空',
            trigger: 'blur',
          },
          {
            validator: this.verifyConfirmPwd,
          },
        ],
      },
    }
  },
  methods: {
    // 验证旧密码
    verifyOldPwd (rule, value, callback) {
      if (this.ruleForm.old_pwd !== this.userInfo.oPwd) {
        callback(new Error('旧密码不正确'))
      } else {
        callback()
      }
    },
    // 验证新密码
    verifyNewPwd (rule, value, callback) {
      if (this.ruleForm.new_pwd === this.ruleForm.old_pwd) {
        callback(new Error('新旧密码不能重复'))
      } else {
        callback()
      }
    },
    // 验证两次密码是否一致
    verifyConfirmPwd (rule, value, callback) {
      if (this.ruleForm.confirm_pwd !== this.ruleForm.new_pwd) {
        callback(new Error('两次密码不一致'))
      } else {
        callback()
      }
    },
    async showPwd (record) {
      console.log(record)
      this.visible = true
      this.$nextTick(() => {
        this.userInfo = Object.assign({}, record)
        if (record) {
          this.userInfo.id = record.id
          this.userInfo.oPwd = record.password
        }
      })
    },

    handleOk () {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          const params = {
            id: this.userInfo.id,
            password: this.ruleForm.new_pwd,
          }
          modifyPwd(params).then(res => {
            ElMessage({
              message: '密码修改成功!请重新登录',
              type: 'success',
              duration: 2000
            })
            this.$router.push({ path: '/login' })
          })
        } else {
          return false
        }
      })
    },
    close () {
      this.visible = false
      this.ruleForm = []
    },
  },
}
</script>
