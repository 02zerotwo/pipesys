<template>
  <div class="login-container background">
    <el-form :model="ruleForm2"
             :rules="rules2"
             status-icon
             ref="ruleForm2"
             label-position="left"
             label-width="0px"
             class="demo-ruleForm login-page">
      <h3 class="title">系统登录</h3>
      <el-form-item prop="username">

        <el-input type="text"
                  v-model="ruleForm2.username"
                  auto-complete="off"
                  placeholder="用户名">

        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password"
                  v-model="ruleForm2.password"
                  auto-complete="off"
                  placeholder="密码"></el-input>
      </el-form-item>
      <el-checkbox v-model="checked"
                   class="rememberme">记住密码</el-checkbox>
      <el-form-item style="width:100%;">
        <el-button type="primary"
                   style="width:100%;"
                   @click="handleSubmit"
                   v-loading.fullscreen.lock="fullscreenLoading">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// import { postAction } from '@/api/manage'
import { ElMessage } from 'element-plus'
export default {
  data () {
    return {
      fullscreenLoading: false,
      ruleForm2: {
        username: 'admin',
        password: '123'
      },
      rules2: {
        username: [{ required: true, message: '请你输入账号!', trigger: 'blur' }],
        password: [{ required: true, message: '请你输入密码!', trigger: 'blur' }]
      },
      checked: false
    }
  },
  methods: {
    handleSubmit (event) {
      this.$refs.ruleForm2.validate((valid) => {
        if (valid) {
          this.fullscreenLoading = true
          const params = {
            username: this.ruleForm2.username,
            password: this.ruleForm2.password
          }
          this.$store.dispatch('Login', params).then((res) => {
            if (res.msg === 'success') {
              this.logining = false
              ElMessage({
                title: '系统提示',
                message: '登录成功!',
                type: 'success',
                duration: 1600
              })
              this.fullscreenLoading = false
              this.$router.push({ path: '/' })
            }
          })
        }
      })
    }
  }
}
</script>

<style scoped>
.login-container {
  width: 100%;
}
.background {
  background-color: #2d3a4b;
  width: 100%;
  height: 100%;
  margin: -8px;
  position: fixed;
  background-size: cover;
}
.login-page {
  background-color: rgba(240, 255, 255, 0.6);
  -webkit-border-radius: 5px;
  border-radius: 5px;
  margin: 180px auto;
  width: 400px;
  padding: 35px 35px 15px;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}
label.el-checkbox.rememberme {
  margin: 0px 0px 15px;
  text-align: left;
}
.title {
  text-align: center;
}
</style>
