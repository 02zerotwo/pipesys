<template>
  <div>
    <el-row>
      <el-col :span="21">
        <Breadcrumb />
        <!-- 占位 -->
      </el-col>
      <el-col :span="3">
        <div class="right-menu">
          <el-dropdown>
            <span class="el-dropdown-link">
              <img src="@/assets/img/k-no.jpg"
                   class="user-avatar">
              <el-icon class="user-info-arrow">
                <i-caret-bottom />
              </el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="handleInfo">个人信息</el-dropdown-item>
                <el-dropdown-item @click="handlePwd">修改密码</el-dropdown-item>
                <el-dropdown-item @click="Logout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </el-col>
    </el-row>
    <personal ref="modifyInfo" />
    <password ref="modifyPwd" />
  </div>
</template>

<script>
import Breadcrumb from './Breadcrumb.vue'
import { ElNotification } from 'element-plus'
import Personal from '../Personal.vue'
import Password from '../Password.vue'
export default {
  components: {
    Breadcrumb,
    Personal,
    Password
  },

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
          message: res.msg,
          type: 'success',
          duration: 1600
        })
        this.$router.push({ path: '/' })
      })
    },
    handleInfo () {
      this.$refs.modifyInfo.showInfo()
      this.$refs.modifyInfo.title = '个人信息界面'
    },
    handlePwd () {
      this.$refs.modifyPwd.showPwd()
      this.$refs.modifyPwd.title = '修改密码界面'
    }
  }
}
</script>
<style lang='less'>
.right-menu {
  float: right;
  height: 100%;
}
.user-avatar {
  cursor: pointer;
  width: 46px;
  height: 46px;
  border-radius: 22px;
  margin-top: 3px;
  vertical-align: middle;
}
.user-info-arrow {
  cursor: pointer;
  position: absolute;
  right: -10px;
  top: 33px;
  font-size: 14px;
  font-weight: bold;
}
</style>
