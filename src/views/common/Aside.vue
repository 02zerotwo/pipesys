<template>
  <div>
    <el-menu :default-active="this.$router.path"
             class="el-menu-vertical-demo"
             :router="true"
             @open="handleOpen"
             @close="handleClose">
      <el-sub-menu>
        <template #title>
          <el-icon>
            <location />
          </el-icon>
          <span>系统管理</span>
        </template>
        <el-menu-item-group title="">
          <el-menu-item index="/user">用户管理</el-menu-item>
          <el-menu-item>权限管理</el-menu-item>

        </el-menu-item-group>
      </el-sub-menu>
      <el-menu-item>
        <el-icon>
          <icon-menu />
        </el-icon>
        <span>项目管理</span>
      </el-menu-item>
      <el-menu-item>
        <el-icon>
          <document />
        </el-icon>
        <span>模型管理</span>
      </el-menu-item>
      <el-menu-item>
        <el-icon>
          <setting />
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
