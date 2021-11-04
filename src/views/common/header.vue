<template>
  <div>
    <el-row>
      <el-col :span="1">
        <img src="@/assets/img/logo.jpg"
             alt=""
             class="logo">

      </el-col>
      <el-col :span="2">
        <label class="logo_label">管理系统</label>
      </el-col>
      <el-col :span="16">
        <!-- 占位 -->
      </el-col>
      <el-col :span="3">
        <img src=""
             alt="">
        <label class="logo_label">欢迎您,{{$store.state.user.username}}</label>

      </el-col>
      <el-col :span="2">
        <label class="logo_label">
          <el-button size="medium"
                     @click="Logout">
            <el-icon>
              <i-switch-button />
            </el-icon>
            退出登录
          </el-button>
        </label>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { ElNotification } from 'element-plus'
export default {
  components: {},

  data () {
    return {
    }
  },

  computed: {},
  created () {
    // 取用户信息测试
    this.$store.dispatch('GetPermissionList').then(userinfo => {
      console.log(userinfo.username)
    })
  },
  methods: {
    Logout () {
      this.$store.dispatch('Logout').then(res => {
        ElNotification({
          title: '系统提示',
          message: '账户已退出!',
          type: 'success'
        })
        this.$router.push({ path: '/' })
        sessionStorage.clear()
      })
    }
  }
}
</script>
<style lang='less'>
.logo {
  width: 47px;
  height: 47px;
}
.logo_label {
  line-height: 50px;
  color: var(--el-text-color-regular);
}
</style>
