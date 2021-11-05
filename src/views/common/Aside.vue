<template>
  <div>
    <el-menu :default-active="this.$router.path"
             active-text-color="#5094FF"
             background-color="#304156"
             text-color="#bfcbd9"
             class="el-menu-vertical-demo"
             :router="true"
             @open="handleOpen"
             @close="handleClose">
      <el-menu-item index="/index/dashboard">
        <el-icon>
          <i-wind-power />
        </el-icon>
        <span>首页</span>
      </el-menu-item>
      <el-sub-menu>
        <template #title>
          <el-icon>
            <i-location />
          </el-icon>
          <span>系统管理</span>
        </template>
        <el-menu-item-group title="">
          <el-menu-item index="/index/user">
            <el-icon>
              <i-avatar />
            </el-icon>用户管理
          </el-menu-item>
          <el-menu-item index="/index/role">
            <el-icon>
              <i-sunset />
            </el-icon>权限管理
          </el-menu-item>

        </el-menu-item-group>
      </el-sub-menu>
      <el-menu-item>
        <el-icon>
          <i-tickets />
        </el-icon>
        <span>项目管理</span>
      </el-menu-item>
      <el-menu-item>
        <el-icon>
          <i-document />
        </el-icon>
        <span>模型管理</span>
      </el-menu-item>
      <el-menu-item>
        <el-icon>
          <i-setting />
        </el-icon>
        <span>报警管理</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  components: {},

  data () {
    return {}
  },

  computed: {},

  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }

  }
}
</script>
<style lang='less'>
</style>
