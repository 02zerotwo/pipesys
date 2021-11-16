<template>
  <!-- 个人信息 -->
  <el-dialog v-model="visible"
             :title="title"
             @close="close" :center="true">
    <el-card class="box-card">
      <el-form ref="ruleForm"
               :model="ruleForm"
               :rules="rules"
               label-width="120px">
        <el-row>
          <el-col :span="6"></el-col>
          <el-col :span="12">
            <el-form-item label="请输入旧密码:"
                          prop="old_pwd" >
              <el-input v-model="ruleForm.old_pwd"
                        placeholder="请输入旧密码" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6"></el-col>
        </el-row>
        <el-row>
          <el-col :span="6"></el-col>
          <el-col :span="12">
          <el-form-item label="请输入新密码:"
                          prop="new_pwd" >
              <el-input v-model="ruleForm.new_pwd"
                        placeholder="请输入新密码"></el-input>
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
                        placeholder="再次输入新密码">
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

    </el-card>
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
export default {
  data () {
    // 新旧密码验证
    const verifyNewPwd = (rule, value, callback) => {
      if (this.ruleForm.new_pwd === this.ruleForm.old_pwd) {
        callback(new Error('新旧密码不可相同，请重新输入'))
      } else {
        callback()
      }
    }
    // 重复密码验证
    const verifyConfirmPwd = (rule, value, callback) => {
      if (this.ruleForm.confirm_pwd !== this.ruleForm.new_pwd) {
        callback(new Error('两次密码不一致，请输入正确的密码！'))
      } else {
        callback()
      }
    }
    return {
      visible: false,
      title: '',
      ruleForm: { // 表单的属性要对应数据的字段,目前没有进行驼峰转换处理
        old_pwd: '',
        new_pwd: '',
        confirm_pwd: ''
      },
      // 表单验证
      rules: {
        old_pwd: [
          {
            required: true,
            message: '密码不能为空',
            trigger: 'blur'
          },
          { pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,18}$/, message: '密码须包含数字、字母两种元素，且密码位数为6-16位' }
        ],
        new_pwd: [
          {
            required: true,
            validator: verifyNewPwd,
            trigger: 'blur'
          },
          { pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,18}$/, message: '密码须包含数字、字母两种元素，且密码位数为6-16位' }
        ],
        confirm_pwd: [
          {
            required: true,
            validator: verifyConfirmPwd,
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    showPwd () {
      this.visible = true
    },
    handleOk () {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          // 发送请求修改密码
          // this.visible = false
        } else {
          return false
        }
      })
    },
    close () {
      this.visible = false
      this.roles = []
    }
  }
}
</script>
