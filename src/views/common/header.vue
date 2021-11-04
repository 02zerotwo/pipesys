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
          <el-button size="medium">
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
export default {
  components: {},

  data () {
    return {
    }
  },

  computed: {},
  created () {

  },
  methods: {}
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
